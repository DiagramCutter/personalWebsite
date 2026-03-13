<template>
  <section class="scene cta-scene" data-scene="cta">
    <div class="scene-inner">
      <p class="scene-kicker">SCENE 06 / FINAL CTA</p>
      <h2 class="scene-title">If you're building experiences that feel alive, let's talk.</h2>
      <p class="scene-copy">如果你也希望产品有情绪、有节奏、有记忆点，我们可以一起把它做出来。</p>
      <div class="cta-actions">
        <button class="cta-btn cta-btn--solid">Email</button>
        <button class="cta-btn cta-btn--ghost">GitHub</button>
        <button class="cta-btn cta-btn--ghost">Resume</button>
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
  max-width: 15ch;
  font-size: clamp(2.2rem, 6vw, 5rem);
  color: #f1f8ff;
  line-height: 1.02;
}

.scene-copy {
  margin-top: 1rem;
  max-width: 48ch;
  color: rgba(228, 241, 255, 0.82);
  line-height: 1.8;
}

.cta-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.cta-btn {
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  border: 1px solid rgba(120, 224, 255, 0.28);
  background: rgba(8, 14, 24, 0.35);
  color: #edf7ff;
}

.cta-btn--solid {
  background: linear-gradient(120deg, rgba(119, 241, 255, 0.92), rgba(91, 164, 255, 0.92));
  color: #071118;
  border-color: transparent;
}

@media (max-width: 768px) {
  .scene {
    padding: 0 1.2rem;
  }
}
</style>
