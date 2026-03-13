import * as THREE from 'three'

import type { RuntimePresetConfig } from '@/interface/preset'

export interface LiquidShaderController {
  update: (elapsedTime: number) => void
  syncFromPreset: (preset: RuntimePresetConfig) => void
}

export const createLiquidMetalShader = (
  material: THREE.MeshPhysicalMaterial,
  runtimePreset: RuntimePresetConfig,
): LiquidShaderController => {
  const uniforms = {
    uTime: { value: 0 },
    uDistortStrength: { value: runtimePreset.core.distortStrength },
    uDistortFrequency: { value: runtimePreset.core.distortFrequency },
    uDistortSpeed: { value: runtimePreset.core.distortSpeed },
    uFresnelStrength: { value: runtimePreset.material.fresnelStrength },
    uIridescenceStrength: { value: runtimePreset.material.iridescenceStrength },
    uIridescenceScale: { value: runtimePreset.material.iridescenceScale },
    uEmissiveIntensity: { value: runtimePreset.lighting.emissiveIntensity },
  }

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime
    shader.uniforms.uDistortStrength = uniforms.uDistortStrength
    shader.uniforms.uDistortFrequency = uniforms.uDistortFrequency
    shader.uniforms.uDistortSpeed = uniforms.uDistortSpeed
    shader.uniforms.uFresnelStrength = uniforms.uFresnelStrength
    shader.uniforms.uIridescenceStrength = uniforms.uIridescenceStrength
    shader.uniforms.uIridescenceScale = uniforms.uIridescenceScale
    shader.uniforms.uEmissiveIntensity = uniforms.uEmissiveIntensity

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
uniform float uTime;
uniform float uDistortStrength;
uniform float uDistortFrequency;
uniform float uDistortSpeed;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;

float hash(vec3 p) {
	p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
	p *= 17.0;
	return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
	vec3 i = floor(x);
	vec3 f = fract(x);
	f = f * f * (3.0 - 2.0 * f);

	float n000 = hash(i + vec3(0.0, 0.0, 0.0));
	float n100 = hash(i + vec3(1.0, 0.0, 0.0));
	float n010 = hash(i + vec3(0.0, 1.0, 0.0));
	float n110 = hash(i + vec3(1.0, 1.0, 0.0));
	float n001 = hash(i + vec3(0.0, 0.0, 1.0));
	float n101 = hash(i + vec3(1.0, 0.0, 1.0));
	float n011 = hash(i + vec3(0.0, 1.0, 1.0));
	float n111 = hash(i + vec3(1.0, 1.0, 1.0));

	float n00 = mix(n000, n100, f.x);
	float n10 = mix(n010, n110, f.x);
	float n01 = mix(n001, n101, f.x);
	float n11 = mix(n011, n111, f.x);
	float n0 = mix(n00, n10, f.y);
	float n1 = mix(n01, n11, f.y);
	return mix(n0, n1, f.z);
}
`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
float noiseA = noise(normalize(position) * uDistortFrequency + vec3(uTime * uDistortSpeed));
float noiseB = noise(position * (uDistortFrequency * 1.7) - vec3(uTime * uDistortSpeed * 0.65));
float distortion = ((noiseA - 0.5) + (noiseB - 0.5) * 0.45) * uDistortStrength;
transformed += normal * distortion;
`,
      )
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
vWorldPosition = worldPosition.xyz;
vWorldNormal = normalize(mat3(modelMatrix) * normal);
`,
      )

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
uniform float uTime;
uniform float uFresnelStrength;
uniform float uIridescenceStrength;
uniform float uIridescenceScale;
uniform float uEmissiveIntensity;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
float fresnel = pow(1.0 - max(dot(normalize(vWorldNormal), viewDirection), 0.0), 2.5);
float shimmer = 0.5 + 0.5 * sin((fresnel * uIridescenceScale + uTime * 0.12) * 6.2831853);
vec3 iridescenceColor = mix(vec3(0.22, 0.78, 1.0), vec3(1.0, 0.42, 0.78), shimmer);
totalEmissiveRadiance += iridescenceColor * fresnel * uFresnelStrength * uIridescenceStrength;
totalEmissiveRadiance += vec3(0.18, 0.48, 0.72) * fresnel * uEmissiveIntensity;
`,
      )
  }

  material.needsUpdate = true

  return {
    update: (elapsedTime: number) => {
      uniforms.uTime.value = elapsedTime
    },
    syncFromPreset: (preset: RuntimePresetConfig) => {
      uniforms.uDistortStrength.value = preset.core.distortStrength
      uniforms.uDistortFrequency.value = preset.core.distortFrequency
      uniforms.uDistortSpeed.value = preset.core.distortSpeed
      uniforms.uFresnelStrength.value = preset.material.fresnelStrength
      uniforms.uIridescenceStrength.value = preset.material.iridescenceStrength
      uniforms.uIridescenceScale.value = preset.material.iridescenceScale
      uniforms.uEmissiveIntensity.value = preset.lighting.emissiveIntensity
    },
  }
}
