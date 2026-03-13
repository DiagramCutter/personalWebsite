import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import type { RuntimePresetConfig } from '@/interface/preset'

export interface PostProcessController {
  composer: EffectComposer
  update: (preset: RuntimePresetConfig, elapsedTime: number) => void
  resize: (width: number, height: number) => void
}

const cinemaPassShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uGrainStrength: { value: 0.12 },
    uVignetteStrength: { value: 0.42 },
  },
  vertexShader: `
varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  fragmentShader: `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uGrainStrength;
uniform float uVignetteStrength;
varying vec2 vUv;

float random(vec2 co) {
	return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
	vec4 color = texture2D(tDiffuse, vUv);
	float grain = (random(vUv + uTime * 0.05) - 0.5) * uGrainStrength;
	float distanceToCenter = distance(vUv, vec2(0.5));
	float vignette = smoothstep(0.25, 0.9, distanceToCenter);
	color.rgb += grain;
	color.rgb *= 1.0 - vignette * uVignetteStrength;
	gl_FragColor = color;
}
`,
}

export const createPostProcessing = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  preset: RuntimePresetConfig,
): PostProcessController => {
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    preset.post.bloomStrength,
    preset.post.bloomRadius,
    0.2,
  )
  const cinemaPass = new ShaderPass(cinemaPassShader)

  cinemaPass.uniforms.uGrainStrength.value = preset.post.grainStrength
  cinemaPass.uniforms.uVignetteStrength.value = preset.post.vignetteStrength

  composer.addPass(renderPass)
  composer.addPass(bloomPass)
  composer.addPass(cinemaPass)

  return {
    composer,
    update: (runtimePreset, elapsedTime) => {
      bloomPass.strength = runtimePreset.post.bloomStrength
      bloomPass.radius = runtimePreset.post.bloomRadius
      cinemaPass.uniforms.uTime.value = elapsedTime
      cinemaPass.uniforms.uGrainStrength.value = runtimePreset.post.grainStrength
      cinemaPass.uniforms.uVignetteStrength.value = runtimePreset.post.vignetteStrength
    },
    resize: (width, height) => {
      composer.setSize(width, height)
      bloomPass.setSize(width, height)
    },
  }
}
