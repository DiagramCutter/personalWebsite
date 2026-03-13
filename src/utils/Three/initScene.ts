import * as THREE from 'three'
import gsap from 'gsap'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import type {
  ApplyPresetOptions,
  BackgroundSceneController,
  GlobalSceneInitOptions,
  PresetGroupKey,
  RuntimePresetConfig,
  ScenePresetName,
} from '@/interface/preset'
import { createPostProcessing } from '@/utils/pass'
import { resolvePreset, transitionConfig } from '@/utils/preset'
import { createLiquidMetalShader } from '@/utils/shader'

const DEFAULT_HDR_PATH = '/hdr/studio-dark.hdr'

const clonePreset = (preset: RuntimePresetConfig): RuntimePresetConfig => ({
  core: { ...preset.core },
  material: { ...preset.material },
  lighting: { ...preset.lighting },
  post: { ...preset.post },
  camera: { ...preset.camera },
})

const applyMaterialValues = (material: THREE.MeshPhysicalMaterial, preset: RuntimePresetConfig) => {
  material.metalness = preset.material.metalness
  material.roughness = preset.material.roughness
  material.envMapIntensity = preset.material.envIntensity
  material.clearcoat = preset.material.clearcoat
  material.clearcoatRoughness = preset.material.clearcoatRoughness
}

const getViewportSize = (canvas: HTMLCanvasElement) => {
  const width = canvas.clientWidth || window.innerWidth
  const height = canvas.clientHeight || window.innerHeight

  return {
    width,
    height,
  }
}

export const createSceneController = async (
  canvas: HTMLCanvasElement,
  options: GlobalSceneInitOptions = {},
): Promise<BackgroundSceneController> => {
  const initialPresetName = options.initialPreset ?? 'hero'
  const hdrPath = options.hdrPath ?? DEFAULT_HDR_PATH
  const initialPreset = resolvePreset(initialPresetName)
  const runtimePreset = clonePreset(initialPreset)
  const { width, height } = getViewportSize(canvas)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    runtimePreset.camera.cameraFov,
    width / height,
    0.1,
    100,
  )
  camera.position.set(0, 0, runtimePreset.camera.cameraZ)

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(width, height, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const geometryDetail = width <= 768 ? 5 : 7
  const geometry = new THREE.IcosahedronGeometry(1.15, geometryDetail)
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#b8c2d1'),
    metalness: runtimePreset.material.metalness,
    roughness: runtimePreset.material.roughness,
    envMapIntensity: runtimePreset.material.envIntensity,
    clearcoat: runtimePreset.material.clearcoat,
    clearcoatRoughness: runtimePreset.material.clearcoatRoughness,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const ambientLight = new THREE.AmbientLight('#6fcaf5', 0.35)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight('#ffffff', 0.8)
  keyLight.position.set(3, 2, 4)
  scene.add(keyLight)

  const rimLight = new THREE.PointLight('#8a7dff', 0.8, 12)
  rimLight.position.set(-2.8, -1.5, 2.4)
  scene.add(rimLight)

  let environmentMap: THREE.DataTexture | null = null

  try {
    environmentMap = await new RGBELoader().loadAsync(hdrPath)
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.environment = environmentMap
  } catch (error) {
    console.warn('Failed to load HDR environment:', error)
  }

  const shaderController = createLiquidMetalShader(material, runtimePreset)
  const postController = createPostProcessing(renderer, scene, camera, runtimePreset)

  const clock = new THREE.Clock()
  let animationFrameId = 0
  let disposed = false

  const render = () => {
    if (disposed) {
      return
    }

    const elapsedTime = clock.getElapsedTime()
    const pulse = 1 + Math.sin(elapsedTime * 1.4) * runtimePreset.core.pulseStrength

    mesh.rotation.y = elapsedTime * runtimePreset.core.rotationSpeed
    mesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.08
    mesh.scale.setScalar(runtimePreset.core.scale * pulse)

    applyMaterialValues(material, runtimePreset)
    shaderController.syncFromPreset(runtimePreset)
    shaderController.update(elapsedTime)

    camera.position.z = runtimePreset.camera.cameraZ
    camera.fov = runtimePreset.camera.cameraFov
    camera.lookAt(runtimePreset.camera.lookAtX, runtimePreset.camera.lookAtY, 0)
    camera.updateProjectionMatrix()

    postController.update(runtimePreset, elapsedTime)
    postController.composer.render()

    animationFrameId = window.requestAnimationFrame(render)
  }

  const resize = (nextWidth?: number, nextHeight?: number) => {
    const targetWidth = nextWidth ?? canvas.clientWidth ?? window.innerWidth
    const targetHeight = nextHeight ?? canvas.clientHeight ?? window.innerHeight

    camera.aspect = targetWidth / targetHeight
    camera.updateProjectionMatrix()

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(targetWidth, targetHeight, false)
    postController.resize(targetWidth, targetHeight)
  }

  const animateGroup = (
    groupKey: PresetGroupKey,
    targetPreset: RuntimePresetConfig,
    options?: ApplyPresetOptions,
  ) => {
    const groupDuration = options?.duration ?? transitionConfig.groupedDurations[groupKey]
    const ease = options?.ease ?? transitionConfig.ease

    gsap.to(runtimePreset[groupKey], {
      ...targetPreset[groupKey],
      duration: options?.immediate ? 0 : groupDuration,
      ease,
      overwrite: 'auto',
    })
  }

  const setPreset = (name: ScenePresetName, options?: ApplyPresetOptions) => {
    const targetPreset = resolvePreset(name)
    animateGroup('core', targetPreset, options)
    animateGroup('material', targetPreset, options)
    animateGroup('lighting', targetPreset, options)
    animateGroup('post', targetPreset, options)
    animateGroup('camera', targetPreset, options)
  }

  resize(width, height)
  render()

  return {
    setPreset,
    resize,
    dispose: () => {
      disposed = true
      window.cancelAnimationFrame(animationFrameId)
      gsap.killTweensOf(runtimePreset.core)
      gsap.killTweensOf(runtimePreset.material)
      gsap.killTweensOf(runtimePreset.lighting)
      gsap.killTweensOf(runtimePreset.post)
      gsap.killTweensOf(runtimePreset.camera)

      geometry.dispose()
      material.dispose()
      renderer.dispose()
      postController.composer.dispose()
      environmentMap?.dispose()
    },
  }
}
