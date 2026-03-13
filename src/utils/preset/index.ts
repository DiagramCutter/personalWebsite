import type {
  PresetTransitionConfig,
  RuntimePresetConfig,
  ScenePresetConfig,
  ScenePresetMap,
  ScenePresetName,
} from '@/interface/preset'

export const SCENE_PRESET_NAMES: ScenePresetName[] = [
  'hero',
  'identity',
  'skillEngine',
  'projects',
  'essays',
  'cta',
]

export const basePreset: RuntimePresetConfig = {
  core: {
    distortStrength: 0.2,
    distortFrequency: 1.4,
    distortSpeed: 0.24,
    pulseStrength: 0.04,
    rotationSpeed: 0.12,
    scale: 1,
  },
  material: {
    metalness: 1,
    roughness: 0.34,
    envIntensity: 1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.24,
    fresnelStrength: 0.22,
    iridescenceStrength: 0.2,
    iridescenceScale: 0.9,
  },
  lighting: {
    emissiveIntensity: 0.08,
    glowStrength: 0.12,
    rimLightMix: 0.4,
  },
  post: {
    bloomStrength: 0.6,
    bloomRadius: 0.35,
    grainStrength: 0.12,
    vignetteStrength: 0.42,
  },
  camera: {
    cameraZ: 4.8,
    cameraFov: 34,
    lookAtX: 0,
    lookAtY: 0,
  },
}

export const scenePresets: ScenePresetMap = {
  hero: {
    core: {
      distortStrength: 0.18,
      distortSpeed: 0.22,
      pulseStrength: 0.02,
      rotationSpeed: 0.1,
      scale: 0.96,
    },
    material: {
      roughness: 0.42,
      envIntensity: 0.85,
      iridescenceStrength: 0.16,
    },
    lighting: {
      emissiveIntensity: 0.06,
    },
    post: {
      bloomStrength: 0.55,
      vignetteStrength: 0.5,
      grainStrength: 0.16,
    },
    camera: {
      cameraZ: 4.6,
      cameraFov: 32,
    },
  },
  identity: {
    core: {
      distortStrength: 0.24,
      distortSpeed: 0.28,
      rotationSpeed: 0.14,
      scale: 1.02,
    },
    material: {
      roughness: 0.32,
      envIntensity: 1.06,
      fresnelStrength: 0.26,
      iridescenceStrength: 0.22,
    },
    lighting: {
      emissiveIntensity: 0.1,
    },
    post: {
      bloomStrength: 0.66,
    },
    camera: {
      cameraZ: 5.2,
      cameraFov: 36,
    },
  },
  skillEngine: {
    core: {
      distortStrength: 0.42,
      distortFrequency: 1.65,
      distortSpeed: 0.46,
      pulseStrength: 0.16,
      rotationSpeed: 0.22,
      scale: 1.08,
    },
    material: {
      roughness: 0.24,
      envIntensity: 1.35,
      fresnelStrength: 0.3,
      iridescenceStrength: 0.34,
    },
    lighting: {
      emissiveIntensity: 0.22,
      glowStrength: 0.26,
    },
    post: {
      bloomStrength: 0.92,
      bloomRadius: 0.42,
    },
    camera: {
      cameraZ: 4.3,
      cameraFov: 33,
    },
  },
  projects: {
    core: {
      distortStrength: 0.52,
      distortFrequency: 1.8,
      distortSpeed: 0.58,
      pulseStrength: 0.1,
      rotationSpeed: 0.18,
      scale: 1.1,
    },
    material: {
      roughness: 0.2,
      envIntensity: 1.5,
      iridescenceStrength: 0.42,
      iridescenceScale: 1.1,
    },
    lighting: {
      emissiveIntensity: 0.18,
    },
    post: {
      bloomStrength: 0.8,
      grainStrength: 0.1,
    },
    camera: {
      cameraZ: 4.1,
      cameraFov: 31,
    },
  },
  essays: {
    core: {
      distortStrength: 0.16,
      distortSpeed: 0.18,
      pulseStrength: 0.01,
      rotationSpeed: 0.06,
      scale: 0.94,
    },
    material: {
      roughness: 0.46,
      envIntensity: 0.9,
      fresnelStrength: 0.18,
      iridescenceStrength: 0.12,
    },
    lighting: {
      emissiveIntensity: 0.04,
      glowStrength: 0.06,
    },
    post: {
      bloomStrength: 0.38,
      grainStrength: 0.14,
      vignetteStrength: 0.48,
    },
    camera: {
      cameraZ: 5.8,
      cameraFov: 38,
    },
  },
  cta: {
    core: {
      distortStrength: 0.1,
      distortSpeed: 0.1,
      pulseStrength: 0.08,
      rotationSpeed: 0.04,
      scale: 1,
    },
    material: {
      roughness: 0.18,
      envIntensity: 1.24,
      fresnelStrength: 0.28,
      iridescenceStrength: 0.3,
    },
    lighting: {
      emissiveIntensity: 0.16,
      glowStrength: 0.18,
    },
    post: {
      bloomStrength: 0.72,
      bloomRadius: 0.38,
      vignetteStrength: 0.44,
    },
    camera: {
      cameraZ: 4.5,
      cameraFov: 34,
    },
  },
}

export const transitionConfig: PresetTransitionConfig = {
  defaultDuration: 1.1,
  introDuration: 1.6,
  fastDuration: 0.55,
  ease: 'power3.inOut',
  instantKeys: [],
  groupedDurations: {
    core: 1.2,
    material: 1,
    lighting: 0.9,
    post: 0.8,
    camera: 1.15,
  },
}

const mergePresetSection = <T extends object>(baseSection: T, overrideSection?: Partial<T>): T => ({
  ...baseSection,
  ...(overrideSection ?? {}),
})

export const resolvePreset = (name: ScenePresetName): RuntimePresetConfig => {
  const preset = scenePresets[name]

  return {
    core: mergePresetSection(basePreset.core, preset.core),
    material: mergePresetSection(basePreset.material, preset.material),
    lighting: mergePresetSection(basePreset.lighting, preset.lighting),
    post: mergePresetSection(basePreset.post, preset.post),
    camera: mergePresetSection(basePreset.camera, preset.camera),
  }
}

export const getScenePreset = (name: ScenePresetName): ScenePresetConfig => scenePresets[name]

export const isScenePresetName = (value: string): value is ScenePresetName =>
  SCENE_PRESET_NAMES.includes(value as ScenePresetName)
