<template>
  <section class="scene skill-scene" data-scene="skillEngine">
    <div class="scene-inner">
      <p class="scene-kicker">SCENE 03 / SKILL ENGINE</p>
      <h2 class="scene-title">能力不是列表，是被点亮的系统</h2>
      <div class="engine-grid">
        <article class="engine-card">
          <span>Frontend Systems</span>
          <strong>Vue 3 / TypeScript / Pinia</strong>
        </article>
        <article class="engine-card">
          <span>Motion</span>
          <strong>GSAP / ScrollTrigger</strong>
        </article>
        <article class="engine-card">
          <span>3D</span>
          <strong>Three.js / Shader</strong>
        </article>
        <article class="engine-card">
          <span>Delivery</span>
          <strong>Maintainable / Scalable</strong>
        </article>
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
  margin-top: 0.9rem;
  max-width: 11ch;
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  color: #eff7ff;
}

.engine-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.engine-card {
  padding: 1.1rem;
  border-radius: 18px;
  border: 1px solid rgba(115, 229, 255, 0.24);
  background: rgba(8, 15, 26, 0.38);
}

.engine-card span {
  color: rgba(148, 226, 255, 0.78);
  font-size: 0.84rem;
}

.engine-card strong {
  display: block;
  margin-top: 0.65rem;
  color: #edf7ff;
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .scene {
    padding: 0 1.2rem;
  }

  .engine-grid {
    grid-template-columns: 1fr;
  }
}
</style>
