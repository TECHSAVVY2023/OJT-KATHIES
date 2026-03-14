<template>
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
</template>

<style scoped>
/* ═════════════════════════════════════════════════════════
   RIGHT SIDE: PHONE MOCKUP
════════════════════════════════════════════════════════ */
.sub-right {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  min-height: 500px;
}

/* ── Phone background elements ── */
.phone-bg-circle {
  position: absolute;
  right: 10%;
  top: 20%;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(125,184,236,0.15) 0%, transparent 70%);
  filter: blur(80px);
}

.phone-glow {
  position: absolute;
  right: 12%;
  top: 25%;
  width: 200px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(125,184,236,0.08) 0%, transparent 70%);
  filter: blur(60px);
  transform: rotate(-12deg);
}

/* ── Notification cards ── */
.notif {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  animation: float-in 0.6s ease-out both;
}
.notif-1 {
  right: 18%;
  top: 12%;
  animation-delay: 0.1s;
}
.notif-2 {
  right: 8%;
  top: 35%;
  animation-delay: 0.3s;
}
.notif-3 {
  right: 25%;
  top: 58%;
  animation-delay: 0.5s;
}

.notif-icon {
  font-size: 20px;
  line-height: 1;
}

.notif-text {
  flex: 1;
}
.notif-title {
  font-size: 12px;
  font-weight: 600;
  color: #E6EAED;
  margin: 0 0 2px;
}
.notif-sub {
  font-size: 11px;
  color: rgba(230,234,237,0.55);
  margin: 0;
}

@keyframes float-in {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── Phone mockup ── */
.phone-wrap {
  position: relative;
  width: 240px;
  height: 480px;
  transform: rotate(-6deg);
}

.phone-body {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 40px;
  border: 2px solid #333;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
  overflow: hidden;
}

/* Side buttons */
.phone-btn {
  position: absolute;
  right: -4px;
  width: 4px;
  height: 40px;
  background: #222;
  border-radius: 2px;
}
.btn-vol-up { top: 100px; }
.btn-vol-dn { top: 150px; }
.btn-power { bottom: 80px; height: 60px; }

/* Screen */
.phone-screen {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  background: #000;
  border-radius: 32px;
  overflow: hidden;
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 24px;
  background: #1a1a1a;
  border-radius: 0 0 20px 20px;
}

.phone-screen-inner {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, #083D6D 0%, #0F4C81 100%);
  overflow: hidden;
}

/* App UI */
.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 8px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
}
.app-status-dots {
  display: flex; gap: 4px;
}
.app-status-dots span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
}
.app-status-dots span:nth-child(2) { background: rgba(255,255,255,0.8); }
.app-status-dots span:nth-child(3) { background: #fff; }
.app-bar-icon {
  font-size: 16px;
  filter: brightness(1.2);
}

.app-content {
  padding: 20px 16px;
  text-align: center;
}
.app-logo-ring {
  width: 60px; height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.app-logo {
  width: 32px; height: 32px;
  object-fit: contain;
}
.app-greeting {
  font-size: 14px;
  font-weight: 600;
  color: #E6EAED;
  margin: 0 0 4px;
}
.app-msg {
  font-size: 12px;
  color: rgba(230,234,237,0.7);
  margin: 0 0 20px;
}
.app-notif-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(125,184,236,0.2);
  border: 1px solid rgba(125,184,236,0.3);
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 10px;
  font-weight: 500;
  color: #7DB8EC;
}
.pill-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px rgba(125,184,236,0.6);
  animation: pulse-dot 2s ease-in-out infinite;
}

.app-nav {
  display: flex;
  justify-content: space-around;
  padding: 12px 16px;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(8px);
  font-size: 18px;
}
.app-nav-active {
  color: #7DB8EC;
  filter: brightness(1.3);
}

/* Decorative circles */
.phone-circle-wrap {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
}
.phone-circle {
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
}
.circle-outer {
  width: 12px; height: 12px;
  background: rgba(125,184,236,0.2);
}
.circle-mid {
  width: 8px; height: 8px;
  background: rgba(125,184,236,0.4);
}
.circle-inner {
  width: 4px; height: 4px;
  background: #7DB8EC;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 8px rgba(125,184,236,0.6); }
  50% { box-shadow: 0 0 12px rgba(125,184,236,0.9); }
}
</style>
