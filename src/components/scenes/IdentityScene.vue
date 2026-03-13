<template>
  <section class="scene identity-scene" data-scene="identity">
    <div class="scene-inner">
      <p class="scene-kicker">SCENE 02 / IDENTITY</p>
      <div class="headline-stack">
        <h2>我做的不只是页面</h2>
        <h2>而是可被记住的体验</h2>
      </div>
      <div class="keywords">
        <span>Systems</span>
        <span>Motion Storytelling</span>
        <span>Engineering Craft</span>
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

.headline-stack {
  margin-top: 1rem;
}

.headline-stack h2 {
  font-size: clamp(2.6rem, 8vw, 6rem);
  line-height: 0.98;
  color: #eef6ff;
}

.headline-stack h2 + h2 {
  color: rgba(144, 228, 255, 0.84);
}

.keywords {
  display: flex;
  gap: 0.8rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.keywords span {
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  color: rgba(231, 246, 255, 0.9);
  border: 1px solid rgba(116, 225, 255, 0.28);
  background: rgba(7, 15, 28, 0.36);
}

@media (max-width: 768px) {
  .scene {
    padding: 0 1.2rem;
  }
}
</style>
