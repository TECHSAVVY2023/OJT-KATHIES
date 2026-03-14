<template>
  <NuxtLink
    :to="href"
    class="hero-cta-btn relative inline-flex w-fit items-center overflow-hidden rounded-[14px] px-10 py-4 text-sm font-semibold tracking-[0.1em] uppercase text-white shadow-[0_0_0_1px_rgba(15,118,211,0.6),0_4px_24px_rgba(8,61,109,0.5)]"
  >
    <span class="btn-ring"></span>
    <span class="btn-bg"></span>
    <span class="btn-shine"></span>
    <span class="btn-sparkle btn-sparkle-1"></span>
    <span class="btn-sparkle btn-sparkle-2"></span>
    <span class="btn-sparkle btn-sparkle-3"></span>
    <span class="btn-sparkle btn-sparkle-4"></span>
    <span class="btn-sparkle btn-sparkle-5"></span>
    <span class="btn-sparkle btn-sparkle-6"></span>
    <span class="btn-label relative z-[10] flex items-center gap-2 text-[14px]">
      <svg class="btn-icon h-[18px] w-[18px]" viewBox="0 0 20 20" fill="none">
        <path d="M3 10h14M11 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {{ label }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  label: string
}>()
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   SHINY SHOP NOW BUTTON
══════════════════════════════════════════════════════════ */
.hero-cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 16px 40px;
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
  box-shadow:
    0 0 0 1px rgba(15,118,211,0.6),
    0 4px 24px rgba(8,61,109,0.5),
    0 1px 0 rgba(255,255,255,0.12) inset;
  animation: btn-outer-pulse 4s ease-in-out infinite;
  transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
}

.btn-bg {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, #0a2a50 0%, #083D6D 35%, #0b5499 65%, #083D6D 100%);
  background-size: 200% 200%;
  animation: btn-bg-shift 6s ease-in-out infinite;
  z-index: 0;
}
.btn-ring {
  position: absolute; inset: -2px;
  border-radius: calc(14px + 2px);
  background: conic-gradient(from var(--ring-angle,0deg), #0F76D3,#4db8ff,#fff,#4db8ff,#0F76D3,#083D6D,#0F76D3);
  z-index: -1;
  animation: btn-ring-spin 3s linear infinite;
}
.btn-ring::after {
  content: ''; position: absolute; inset: 2px;
  border-radius: 14px; background: #083D6D;
}
.btn-shine {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(110deg,transparent 0%,transparent 28%,rgba(255,255,255,0.06) 38%,rgba(150,210,255,0.55) 48%,rgba(255,255,255,0.9) 52%,rgba(150,210,255,0.55) 57%,rgba(255,255,255,0.06) 65%,transparent 75%,transparent 100%);
  transform: translateX(-200%) skewX(-15deg);
  z-index: 2; pointer-events: none;
  animation: btn-shine-interval 3.5s cubic-bezier(0.4,0,0.2,1) infinite;
}
.btn-sparkle {
  position: absolute; width: 4px; height: 4px;
  border-radius: 50%; background: #fff;
  box-shadow: 0 0 6px 2px rgba(150,210,255,0.8);
  z-index: 3; pointer-events: none; opacity: 0;
}
.btn-sparkle-1 { top:20%;left:12%;animation:btn-sparkle-pop 4s .2s ease-in-out infinite; }
.btn-sparkle-2 { top:60%;left:70%;animation:btn-sparkle-pop 4s .6s ease-in-out infinite; }
.btn-sparkle-3 { top:25%;left:85%;animation:btn-sparkle-pop 4s 1s ease-in-out infinite; }
.btn-sparkle-4 { top:70%;left:25%;animation:btn-sparkle-pop 4s 1.4s ease-in-out infinite; }
.btn-sparkle-5 { top:40%;left:50%;animation:btn-sparkle-pop 4s 1.8s ease-in-out infinite; }
.btn-sparkle-6 { top:75%;left:88%;animation:btn-sparkle-pop 4s .9s ease-in-out infinite; }

.btn-label {
  position: relative; z-index: 10;
  display: flex; align-items: center; gap: 10px;
  color: #fff; font-family: 'Poppins',sans-serif;
  font-size: 14px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
}
.btn-icon { width: 18px; height: 18px; transition: transform 0.3s ease; }

.hero-cta-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 0 0 2px rgba(77,184,255,0.8),0 8px 40px rgba(8,61,109,0.65),0 0 60px rgba(15,118,211,0.4);
}
.hero-cta-btn:hover .btn-icon { transform: translateX(4px); }
.hero-cta-btn:hover .btn-shine { animation: btn-shine-fast 1.2s ease-out forwards; }
.hero-cta-btn:active { transform: translateY(0) scale(0.98); }

@keyframes btn-bg-shift {
  0%   { background-position:0% 50%; }
  50%  { background-position:100% 50%; }
  100% { background-position:0% 50%; }
}
@keyframes btn-ring-spin {
  from { --ring-angle:0deg; }
  to   { --ring-angle:360deg; }
}
@keyframes btn-shine-interval {
  0%    { transform:translateX(-200%) skewX(-15deg); opacity:1; }
  40%   { transform:translateX(200%)  skewX(-15deg); opacity:1; }
  40.1% { transform:translateX(200%)  skewX(-15deg); opacity:0; }
  100%  { transform:translateX(-200%) skewX(-15deg); opacity:0; }
}
@keyframes btn-shine-fast {
  0%   { transform:translateX(-200%) skewX(-15deg); opacity:1; }
  100% { transform:translateX(200%)  skewX(-15deg); opacity:1; }
}
@keyframes btn-sparkle-pop {
  0%   { opacity:0; transform:scale(0); }
  30%  { opacity:0; transform:scale(0); }
  38%  { opacity:1; transform:scale(1.5); }
  46%  { opacity:.7; transform:scale(1); }
  55%  { opacity:0; transform:scale(0); }
  100% { opacity:0; transform:scale(0); }
}
@keyframes btn-outer-pulse {
  0%,100% { box-shadow:0 0 0 1px rgba(15,118,211,.6),0 4px 24px rgba(8,61,109,.5); }
  50%      { box-shadow:0 0 0 3px rgba(77,184,255,.5),0 6px 32px rgba(8,61,109,.7),0 0 30px rgba(15,118,211,.25); }
}
@property --ring-angle {
  syntax: '<angle>'; initial-value: 0deg; inherits: false;
}
</style>
