export type ScenePresetName = 'hero' | 'identity' | 'skillEngine' | 'projects' | 'essays' | 'cta'

export interface PresetCoreConfig {
  distortStrength: number
  distortFrequency: number
  distortSpeed: number
  pulseStrength: number
  rotationSpeed: number
  scale: number
}

export interface PresetMaterialConfig {
  metalness: number
  roughness: number
  envIntensity: number
  clearcoat: number
  clearcoatRoughness: number
  fresnelStrength: number
  iridescenceStrength: number
  iridescenceScale: number
}

export interface PresetLightingConfig {
  emissiveIntensity: number
  glowStrength: number
  rimLightMix: number
}

export interface PresetPostConfig {
  bloomStrength: number
  bloomRadius: number
  grainStrength: number
  vignetteStrength: number
}

export interface PresetCameraConfig {
  cameraZ: number
  cameraFov: number
  lookAtX: number
  lookAtY: number
}

export interface RuntimePresetConfig {
  core: PresetCoreConfig
  material: PresetMaterialConfig
  lighting: PresetLightingConfig
  post: PresetPostConfig
  camera: PresetCameraConfig
}

export interface ScenePresetConfig
  extends Partial<Omit<RuntimePresetConfig, 'core' | 'material' | 'lighting' | 'post' | 'camera'>> {
  core?: Partial<PresetCoreConfig>
  material?: Partial<PresetMaterialConfig>
  lighting?: Partial<PresetLightingConfig>
  post?: Partial<PresetPostConfig>
  camera?: Partial<PresetCameraConfig>
}

export interface TransitionGroupDurations {
  core: number
  material: number
  lighting: number
  post: number
  camera: number
}

export interface PresetTransitionConfig {
  defaultDuration: number
  introDuration: number
  fastDuration: number
  ease: string
  instantKeys: string[]
  groupedDurations: TransitionGroupDurations
}

export type ScenePresetMap = Record<ScenePresetName, ScenePresetConfig>

export type PresetGroupKey = keyof RuntimePresetConfig

export interface ApplyPresetOptions {
  duration?: number
  ease?: string
  immediate?: boolean
}

export interface GlobalSceneInitOptions {
  hdrPath?: string
  initialPreset?: ScenePresetName
}

export interface BackgroundSceneController {
  setPreset: (name: ScenePresetName, options?: ApplyPresetOptions) => void
  resize: (width?: number, height?: number) => void
  dispose: () => void
}
