<template>
  <section class="scene essays-scene" data-scene="essays">
    <div class="scene-inner">
      <p class="scene-kicker">SCENE 05 / ESSAYS</p>
      <h2 class="scene-title">成长会留下痕迹，思考也是作品的一部分</h2>
      <div class="tag-row">
        <span>All</span>
        <span>Motion</span>
        <span>3D</span>
        <span>Engineering</span>
        <span>Notes</span>
      </div>
      <div class="essay-wall">
        <article class="essay-card">
          <h3>关于“质感”：动效不是炫技</h3>
          <p>我如何判断一个动效是否真的服务于叙事，而不是分散注意力。</p>
        </article>
        <article class="essay-card">
          <h3>Three.js 的镜头语言</h3>
          <p>当空间开始说话，页面就不再只是页面。</p>
        </article>
        <article class="essay-card">
          <h3>一次重构后的平静</h3>
          <p>写给未来自己的工程笔记，也是我做网站时的思考样本。</p>
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
  width: min(1180px, 100%);
  margin: 0 auto;
}

.scene-kicker {
  color: rgba(164, 235, 255, 0.82);
  letter-spacing: 0.18em;
  font-size: 0.78rem;
}

.scene-title {
  margin-top: 0.9rem;
  max-width: 16ch;
  font-size: clamp(2.1rem, 5vw, 4rem);
  color: #eef6ff;
}

.tag-row {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 1.6rem;
}

.tag-row span {
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  color: rgba(230, 244, 255, 0.86);
  border: 1px solid rgba(110, 218, 255, 0.22);
  background: rgba(7, 14, 22, 0.34);
}

.essay-wall {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.8rem;
}

.essay-card {
  padding: 1.15rem;
  border-radius: 18px;
  border: 1px solid rgba(114, 224, 255, 0.16);
  background: rgba(8, 14, 24, 0.3);
}

.essay-card h3 {
  color: #eff6ff;
  font-size: 1.2rem;
}

.essay-card p {
  margin-top: 0.75rem;
  color: rgba(221, 237, 255, 0.78);
  line-height: 1.75;
}

@media (max-width: 768px) {
  .scene {
    padding: 0 1.2rem;
  }

  .essay-wall {
    grid-template-columns: 1fr;
  }
}
</style>
