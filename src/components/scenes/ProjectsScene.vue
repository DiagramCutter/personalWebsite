<template>
  <section class="scene projects-scene" data-scene="projects">
    <div class="scene-inner">
      <p class="scene-kicker">SCENE 04 / SELECTED PROJECTS</p>
      <h2 class="scene-title">四个项目，四段不同的现场</h2>
      <div class="project-list">
        <article class="project-card">
          <span>01</span>
          <h3>电力系统大屏</h3>
          <p>实时数据的秩序与告警叙事</p>
        </article>
        <article class="project-card">
          <span>02</span>
          <h3>实验室管理系统</h3>
          <p>流程、权限与协作的精密加工</p>
        </article>
        <article class="project-card">
          <span>03</span>
          <h3>Web3 官网</h3>
          <p>品牌动效与转化路径的抛光</p>
        </article>
        <article class="project-card">
          <span>04</span>
          <h3>成都公交集团官网</h3>
          <p>可靠、规范与可达性的耐久合金</p>
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
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  color: #eff7ff;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.project-card {
  min-height: 240px;
  padding: 1.3rem;
  border-radius: 20px;
  border: 1px solid rgba(115, 229, 255, 0.2);
  background: linear-gradient(150deg, rgba(7, 13, 24, 0.52), rgba(9, 17, 29, 0.28));
}

.project-card span {
  color: rgba(148, 226, 255, 0.72);
}

.project-card h3 {
  margin-top: 1.1rem;
  color: #f1f7ff;
  font-size: 1.8rem;
}

.project-card p {
  margin-top: 0.8rem;
  color: rgba(228, 242, 255, 0.8);
  line-height: 1.75;
}

@media (max-width: 768px) {
  .scene {
    padding: 0 1.2rem;
  }

  .project-list {
    grid-template-columns: 1fr;
  }
}
</style>
