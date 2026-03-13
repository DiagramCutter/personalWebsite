<template>
  <section class="scene hero-scene" data-scene="hero">
    <div class="scene-inner">
      <p class="scene-kicker">SCENE 01 / HERO</p>
      <h1 class="scene-title">把复杂系统做成直觉体验</h1>
      <p class="scene-copy">
        前端开发工程师，专注 Vue、TypeScript、GSAP 与 Three.js 的叙事式体验构建。
      </p>
      <div class="scene-actions">
        <button class="scene-btn scene-btn--solid">查看作品</button>
        <button class="scene-btn scene-btn--ghost">阅读随笔</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.scene {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 6vw;
}

.scene-inner {
  width: min(1100px, 100%);
  margin: 0 auto;
}

.scene-kicker {
  color: rgba(164, 235, 255, 0.82);
  letter-spacing: 0.18em;
  font-size: 0.78rem;
}

.scene-title {
  margin-top: 0.8rem;
  max-width: 10ch;
  color: #f2f8ff;
  font-size: clamp(3rem, 9vw, 7rem);
  line-height: 0.95;
}

.scene-copy {
  margin-top: 1.2rem;
  max-width: 54ch;
  color: rgba(228, 241, 255, 0.82);
  line-height: 1.8;
}

.scene-actions {
  display: flex;
  gap: 0.85rem;
  margin-top: 2rem;
}

.scene-btn {
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  border: 1px solid rgba(120, 224, 255, 0.35);
  background: transparent;
  color: #e9f7ff;
}

.scene-btn--solid {
  background: linear-gradient(120deg, rgba(116, 240, 255, 0.92), rgba(78, 172, 255, 0.92));
  color: #041017;
  border-color: transparent;
}

@media (max-width: 768px) {
  .scene {
    padding: 0 1.2rem;
  }

  .scene-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
