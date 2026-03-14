<template>
  <div class="hero-bg" aria-hidden="true">
    <div class="bg-orb orb-a"></div>
    <div class="bg-orb orb-b"></div>
    <div class="bg-orb orb-c"></div>
    <div class="bg-grid"></div>
  </div>
</template>

<style scoped>
.hero-bg { position: absolute; inset: 0; pointer-events: none; }

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.orb-a {
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(15,118,211,0.25) 0%, transparent 70%);
  top: -200px; right: -200px;
}
.orb-b {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(8,61,109,0.6) 0%, transparent 70%);
  bottom: -150px; left: -100px;
}
.orb-c {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(200,50,58,0.12) 0%, transparent 70%);
  top: 40%; right: 18%;
}
.bg-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>