<template>
  <section class="sub-section">
    <!-- Ambient bg -->
    <div class="sub-bg" aria-hidden="true">
      <div class="sub-orb orb-1"></div>
      <div class="sub-orb orb-2"></div>
      <div class="sub-orb orb-3"></div>
      <div class="sub-grid"></div>
    </div>

    <div class="sub-container">

      <!-- ── Left: Copy + Form ── -->
      <div class="sub-left">

        <!-- Headline -->
        <h2 class="sub-headline">
          Don't Miss<br>
          <span class="headline-accent">a Bite!</span>
        </h2>

        <p class="sub-body">
          Be the first to know when new Filipino favorites hit our shelves — exclusive deals, new arrivals, and seasonal promos, straight to your inbox.
        </p>

        <!-- Form -->
        <form class="sub-form" @submit.prevent="onSubmit">
          <div class="input-wrap" :class="{ 'input-focused': focused, 'input-filled': email.length > 0 }">
            <svg class="input-icon" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4"/>
              <path d="M2 6l8 5 8-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <input
              v-model="email"
              type="email"
              class="sub-input"
              placeholder="Enter your email address"
              required
              @focus="focused = true"
              @blur="focused = false"
            >
          </div>

          <button type="submit" class="sub-btn" :class="{ 'is-success': submitted }">
            <span class="sub-btn-ring"></span>
            <span class="sub-btn-bg"></span>
            <span class="sub-btn-shine"></span>
            <span class="sub-btn-label">
              <template v-if="!submitted">
                <svg class="sub-btn-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10h14M11 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Subscribe Now
              </template>
              <template v-else>
                <svg class="sub-btn-icon" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l5 5 7-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                You're in!
              </template>
            </span>
          </button>
        </form>

      </div>

      <!-- ── Right: Phone mockup ── -->
      <div class="sub-right" aria-hidden="true">

        <!-- Light blue circle behind phone -->
        <div class="phone-bg-circle"></div>

        <!-- Glow behind phone -->
        <div class="phone-glow"></div>

        <!-- Floating notification cards -->
        <div class="notif notif-1">
          <span class="notif-icon">🆕</span>
          <div class="notif-text">
            <p class="notif-title">New Arrival!</p>
            <p class="notif-sub">Mama Sita's Kare-Kare Mix</p>
          </div>
        </div>

        <div class="notif notif-2">
          <span class="notif-icon">🔥</span>
          <div class="notif-text">
            <p class="notif-title">Flash Sale</p>
            <p class="notif-sub">Up to 30% off today</p>
          </div>
        </div>

        <div class="notif notif-3">
          <span class="notif-icon">🎉</span>
          <div class="notif-text">
            <p class="notif-title">You're subscribed!</p>
            <p class="notif-sub">Welcome to Kathie's Kitchen</p>
          </div>
        </div>

        <!-- Phone -->
        <div class="phone-wrap">
          <div class="phone-body">
            <!-- Side buttons -->
            <div class="phone-btn btn-vol-up"></div>
            <div class="phone-btn btn-vol-dn"></div>
            <div class="phone-btn btn-power"></div>
            <!-- Screen -->
            <div class="phone-screen">
              <div class="phone-notch"></div>
              <div class="phone-screen-inner">
                <!-- App UI inside screen -->
                <div class="app-bar">
                  <div class="app-status-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="app-bar-icon">📬</div>
                </div>
                <div class="app-content">
                  <div class="app-logo-ring">
                    <img src="/images/logo.png" alt="Kathie's Kitchen" class="app-logo">
                  </div>
                  <p class="app-greeting">Kumain ka na?</p>
                  <p class="app-msg">Your Filipino favorites are waiting.</p>
                  <div class="app-notif-pill">
                    <span class="pill-dot"></span>
                    3 new items dropped
                  </div>
                </div>
                <!-- Bottom nav -->
                <div class="app-nav">
                  <span>🏠</span>
                  <span>🔍</span>
                  <span class="app-nav-active">🛒</span>
                  <span>👤</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative circle below phone -->
        <div class="phone-circle-wrap">
          <div class="phone-circle circle-outer"></div>
          <div class="phone-circle circle-mid"></div>
          <div class="phone-circle circle-inner"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { add: addSubscriber } = useSubscribers()
const email = ref('')
const focused = ref(false)
const submitted = ref(false)

function onSubmit() {
  if (email.value.trim()) {
    addSubscriber(email.value)
    submitted.value = true
    email.value = ''
    setTimeout(() => { submitted.value = false }, 4000)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

/* ═══════════════════════════════════════════════════════
   SECTION
════════════════════════════════════════════════════════ */
.sub-section {
  position: relative;
  padding: 96px 0 88px;
  background: linear-gradient(140deg, #061E35 0%, #083D6D 50%, #0F4C81 100%);
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

/* Ambient BG */
.sub-bg { position: absolute; inset: 0; pointer-events: none; }

.sub-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(15,118,211,0.22) 0%, transparent 70%);
  top: -200px; left: -150px;
}
.orb-2 {
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(8,61,109,0.5) 0%, transparent 70%);
  bottom: -180px; right: -80px;
}
.orb-3 {
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(200,50,58,0.09) 0%, transparent 70%);
  top: 30%; right: 15%;
}
.sub-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ═══════════════════════════════════════════════════════
   LAYOUT
════════════════════════════════════════════════════════ */
.sub-container {
  position: relative;
  z-index: 1;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 80px;
}

/* ═══════════════════════════════════════════════════════
   LEFT — COPY + FORM
════════════════════════════════════════════════════════ */
.sub-left {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* Eyebrow */
.sub-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(230,234,237,0.55);
  animation: fadeUp 0.6s 0.1s ease both;
}

.eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #C8323A;
  box-shadow: 0 0 8px rgba(200,50,58,0.8);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,100% { box-shadow: 0 0 6px rgba(200,50,58,0.8); }
  50% { box-shadow: 0 0 16px rgba(200,50,58,1); }
}

/* Headline */
.sub-headline {
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  color: #E6EAED;
  margin: 0;
  letter-spacing: -0.03em;
  animation: fadeUp 0.6s 0.18s ease both;
}

.headline-accent {
  background: linear-gradient(90deg, #4db8ff, #E6EAED, #7DB8EC, #fff);
  background-size: 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: text-shimmer 5s 1s linear infinite;
}

@keyframes text-shimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 300% center; }
}

/* Body copy */
.sub-body {
  font-size: 14.5px;
  color: rgba(230,234,237,0.6);
  line-height: 1.78;
  max-width: 420px;
  margin: 0;
  animation: fadeUp 0.6s 0.26s ease both;
}

/* Form */
.sub-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fadeUp 0.6s 0.42s ease both;
}

/* Input wrapper */
.input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 0 18px;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.input-wrap.input-focused {
  border-color: rgba(15,118,211,0.7);
  background: rgba(255,255,255,0.1);
  box-shadow: 0 0 0 4px rgba(15,118,211,0.12), 0 4px 20px rgba(0,0,0,0.2);
}

.input-icon {
  width: 18px; height: 18px;
  color: rgba(230,234,237,0.4);
  flex-shrink: 0;
  transition: color 0.25s ease;
}

.input-wrap.input-focused .input-icon { color: #7DB8EC; }

.sub-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #E6EAED;
  padding: 16px 0;
}

.sub-input::placeholder { color: rgba(230,234,237,0.35); }

/* ── Subscribe Button — SHINY ── */
.sub-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  width: 100%;
  box-shadow:
    0 0 0 1px rgba(15,118,211,0.6),
    0 4px 24px rgba(8,61,109,0.5),
    inset 0 1px 0 rgba(255,255,255,0.12);
  animation: btn-outer-pulse 4s ease-in-out infinite;
  transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
}

.sub-btn-bg {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, #0a2a50 0%, #083D6D 35%, #0b5499 65%, #083D6D 100%);
  background-size: 200% 200%;
  animation: btn-bg-shift 6s ease-in-out infinite;
  z-index: 0;
}

.sub-btn-ring {
  position: absolute; inset: -2px;
  border-radius: calc(12px + 2px);
  background: conic-gradient(from var(--ring-angle,0deg), #0F76D3,#4db8ff,#fff,#4db8ff,#0F76D3,#083D6D,#0F76D3);
  z-index: -1;
  animation: btn-ring-spin 3s linear infinite;
}
.sub-btn-ring::after {
  content: ''; position: absolute; inset: 2px;
  border-radius: 12px; background: #083D6D;
}

.sub-btn-shine {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(110deg,transparent 0%,transparent 28%,rgba(255,255,255,0.06) 38%,rgba(150,210,255,0.55) 48%,rgba(255,255,255,0.9) 52%,rgba(150,210,255,0.55) 57%,rgba(255,255,255,0.06) 65%,transparent 75%,transparent 100%);
  transform: translateX(-200%) skewX(-15deg);
  z-index: 2; pointer-events: none;
  animation: btn-shine-interval 3.5s cubic-bezier(0.4,0,0.2,1) infinite;
}

.sub-btn-label {
  position: relative; z-index: 10;
  display: flex; align-items: center; gap: 10px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: #ffffff;
}
.sub-btn-icon { width: 18px; height: 18px; transition: transform 0.3s ease; }

.sub-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 0 2px rgba(77,184,255,0.7), 0 8px 40px rgba(8,61,109,0.65), 0 0 50px rgba(15,118,211,0.35);
}
.sub-btn:hover .sub-btn-icon { transform: translateX(4px); }
.sub-btn:active { transform: translateY(0) scale(0.99); }

/* Success state */
.sub-btn.is-success .sub-btn-bg {
  background: linear-gradient(135deg, #0a3a1a 0%, #0d5c2a 50%, #0a3a1a 100%);
}
.sub-btn.is-success {
  animation: none;
  box-shadow: 0 0 0 2px rgba(34,197,94,0.6), 0 4px 24px rgba(0,80,30,0.4);
}

/* Fine print */
.sub-fine {
  font-size: 11.5px;
  color: rgba(230,234,237,0.3);
  margin: 0;
  animation: fadeUp 0.6s 0.5s ease both;
}

/* ═══════════════════════════════════════════════════════
   RIGHT — PHONE MOCKUP
════════════════════════════════════════════════════════ */
.sub-right {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 480px;
}

/* Light blue circle behind phone */
.phone-bg-circle {
  position: absolute;
  width: 320px; height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(125,184,236,0.18) 0%, rgba(77,184,255,0.08) 50%, transparent 75%);
  border: 1.5px solid rgba(125,184,236,0.2);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
  animation: bg-circle-breathe 5s ease-in-out infinite;
}

@keyframes bg-circle-breathe {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
}

.phone-glow {
  position: absolute;
  width: 280px; height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15,118,211,0.25) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
}

/* ── Floating notification cards ── */
.notif {
  position: absolute;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(8,30,60,0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  padding: 10px 14px;
  min-width: 180px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  animation: notif-float 4s ease-in-out infinite;
}

.notif-1 {
  top: 24px; left: -20px;
  animation-delay: 0s;
}
.notif-2 {
  bottom: 60px; left: -30px;
  animation-delay: 1.3s;
}
.notif-3 {
  top: 50%; right: -24px;
  transform: translateY(-50%);
  animation-delay: 0.7s;
}

@keyframes notif-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.notif-3 {
  animation: notif-float-mid 4s 0.7s ease-in-out infinite;
}
@keyframes notif-float-mid {
  0%, 100% { transform: translateY(-50%); }
  50% { transform: translateY(calc(-50% - 8px)); }
}

.notif-icon { font-size: 20px; flex-shrink: 0; }

.notif-title {
  font-size: 11px; font-weight: 700;
  color: #E6EAED; margin: 0;
  letter-spacing: 0.02em;
}
.notif-sub {
  font-size: 10px; font-weight: 400;
  color: rgba(230,234,237,0.5); margin: 0;
}

/* ── Phone body ── */
.phone-wrap {
  position: relative;
  z-index: 10;
  animation: phone-float 6s ease-in-out infinite;
}

@keyframes phone-float {
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-12px) rotate(-4deg); }
}

.phone-body {
  position: relative;
  width: 200px;
  background: #0d1117;
  border-radius: 42px;
  padding: 6px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.08),
    0 30px 80px rgba(0,0,0,0.5),
    0 0 40px rgba(15,118,211,0.15),
    inset 0 1px 0 rgba(255,255,255,0.06);
}

/* Side buttons */
.phone-btn {
  position: absolute;
  background: #1a2030;
  border-radius: 2px;
}
.btn-vol-up  { left: -3px; top: 90px;  width: 3px; height: 28px; }
.btn-vol-dn  { left: -3px; top: 128px; width: 3px; height: 36px; }
.btn-power   { right: -3px; top: 110px; width: 3px; height: 44px; }

/* Screen */
.phone-screen {
  position: relative;
  background: #000;
  border-radius: 36px;
  overflow: hidden;
  aspect-ratio: 9 / 19.5;
}

.phone-notch {
  position: absolute;
  top: 10px; left: 50%;
  transform: translateX(-50%);
  width: 80px; height: 22px;
  background: #000;
  border-radius: 12px;
  z-index: 20;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
}

.phone-screen-inner {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #0a1628 0%, #0d1f3c 60%, #071525 100%);
  display: flex;
  flex-direction: column;
}

/* App bar */
.app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36px 14px 8px;
}
.app-status-dots {
  display: flex; gap: 3px;
}
.app-status-dots span {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
}
.app-bar-icon { font-size: 14px; }

/* App content */
.app-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  gap: 8px;
}

.app-logo-ring {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid rgba(15,118,211,0.4);
  box-shadow: 0 0 20px rgba(15,118,211,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6px;
}

.app-logo {
  width: 100%; height: 100%;
  object-fit: contain;
}

.app-greeting {
  font-size: 11px; font-weight: 700;
  color: rgba(230,234,237,0.9);
  margin: 0; letter-spacing: 0.04em;
}

.app-msg {
  font-size: 9px;
  color: rgba(230,234,237,0.45);
  margin: 0; text-align: center;
  line-height: 1.5;
}

.app-notif-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(15,118,211,0.25);
  border: 1px solid rgba(15,118,211,0.4);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 8.5px;
  font-weight: 600;
  color: #7DB8EC;
  letter-spacing: 0.04em;
}

.pill-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #C8323A;
  box-shadow: 0 0 4px rgba(200,50,58,0.8);
  animation: pulse-dot 2s ease-in-out infinite;
}

/* App bottom nav */
.app-nav {
  display: flex;
  justify-content: space-around;
  padding: 8px 10px 14px;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 14px;
}
.app-nav-active {
  filter: drop-shadow(0 0 4px rgba(15,118,211,0.8));
}

/* ── Decorative circle below phone ── */
.phone-circle-wrap {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 5;
}

.phone-circle {
  position: absolute;
  border-radius: 50%;
}

.circle-outer {
  width: 240px; height: 240px;
  border: 1px solid rgba(15,118,211,0.15);
  background: transparent;
  animation: circle-pulse 4s ease-in-out infinite;
}

.circle-mid {
  width: 170px; height: 170px;
  border: 1.5px solid rgba(15,118,211,0.22);
  background: radial-gradient(circle, rgba(15,118,211,0.06) 0%, transparent 70%);
  animation: circle-pulse 4s 0.6s ease-in-out infinite;
}

.circle-inner {
  width: 100px; height: 100px;
  border: 1.5px solid rgba(15,118,211,0.3);
  background: radial-gradient(circle, rgba(15,118,211,0.12) 0%, transparent 70%);
  animation: circle-pulse 4s 1.2s ease-in-out infinite;
}

@keyframes circle-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
}

/* ═══════════════════════════════════════════════════════
   KEYFRAMES
════════════════════════════════════════════════════════ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes btn-bg-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes btn-ring-spin {
  from { --ring-angle: 0deg; }
  to   { --ring-angle: 360deg; }
}
@keyframes btn-shine-interval {
  0%    { transform: translateX(-200%) skewX(-15deg); opacity: 1; }
  40%   { transform: translateX(200%)  skewX(-15deg); opacity: 1; }
  40.1% { transform: translateX(200%)  skewX(-15deg); opacity: 0; }
  100%  { transform: translateX(-200%) skewX(-15deg); opacity: 0; }
}
@keyframes btn-outer-pulse {
  0%, 100% { box-shadow: 0 0 0 1px rgba(15,118,211,0.6), 0 4px 24px rgba(8,61,109,0.5); }
  50%       { box-shadow: 0 0 0 3px rgba(77,184,255,0.5), 0 6px 32px rgba(8,61,109,0.7), 0 0 30px rgba(15,118,211,0.25); }
}

@property --ring-angle {
  syntax: '<angle>'; initial-value: 0deg; inherits: false;
}

/* ═══════════════════════════════════════════════════════
   RESPONSIVE
════════════════════════════════════════════════════════ */
@media (max-width: 900px) {
  .sub-container {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  .sub-eyebrow { justify-content: center; }
  .sub-body { margin: 0 auto; }
  .sub-right { min-height: 420px; }
}

@media (max-width: 640px) {
  .sub-section { padding: 64px 0 56px; }
  .sub-container { padding: 0 20px; }
  .notif-1 { left: -10px; top: 10px; }
  .notif-2 { left: -10px; bottom: 30px; }
  .notif-3 { right: -10px; }
}
</style>