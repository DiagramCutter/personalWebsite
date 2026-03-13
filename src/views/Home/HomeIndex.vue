<template>
  <main class="home-cinema">
    <HeroScene />
    <IdentityScene />
    <SkillEngineScene />
    <ProjectsScene />
    <EssaysScene />
    <CtaScene />
  </main>
</template>

<script setup lang="ts">
import CtaScene from '@/components/scenes/CtaScene.vue'
import EssaysScene from '@/components/scenes/EssaysScene.vue'
import HeroScene from '@/components/scenes/HeroScene.vue'
import IdentityScene from '@/components/scenes/IdentityScene.vue'
import ProjectsScene from '@/components/scenes/ProjectsScene.vue'
import SkillEngineScene from '@/components/scenes/SkillEngineScene.vue'
</script>

<style lang="scss" scoped>
.home-cinema {
  position: relative;
  z-index: 1;
}
</style>
