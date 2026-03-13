<template>
  <div class="global-bg">
    <canvas ref="canvasRef" class="global-bg__canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { BackgroundSceneController } from '@/interface/preset'
import { createSceneController } from '@/utils/Three/initScene'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let controller: BackgroundSceneController | null = null

const handleResize = () => {
  controller?.resize()
}

onMounted(async () => {
  if (!canvasRef.value) {
    return
  }

  controller = await createSceneController(canvasRef.value, {
    hdrPath: '/hdr/studio-dark.hdr',
    initialPreset: 'hero',
  })

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  controller?.dispose()
  controller = null
})
</script>

<style lang="scss" scoped>
.global-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.global-bg__canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
