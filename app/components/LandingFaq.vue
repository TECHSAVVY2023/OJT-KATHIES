<template>
  <div class="faq-section">

    <!-- ── Section header ── -->
    <div class="faq-header">
      <p class="faq-header__eyebrow">Got Questions?</p>
      <h2 class="faq-header__title">
        <span class="faq-header__title--navy">Frequently Asked </span>
        <span class="faq-header__title--red">Questions</span>
      </h2>
      <p class="faq-header__sub">Everything you need to know about Kathie's Kitchen.</p>
    </div>

    <div class="faq-grid">

      <!-- ══ LEFT — Blob image ══ -->
      <div class="faq-image-col">
        <div class="faq-blob-wrap">

          <!-- Decorative blob ring -->
          <div class="faq-blob-ring" />

          <!-- Yellow accent blob behind -->
          <div class="faq-blob-accent" />

          <!-- Main blob image -->
          <div class="faq-blob">
            <img
              :src="faqSection?.infoBackgroundImage || '/images/ask.png'"
              alt="Kathie's Kitchen – Filipino sari-sari store in South Africa"
              class="faq-blob__img"
            >
          </div>

          <!-- Decorative dot grid -->
          <div class="faq-dot-grid">
            <span v-for="i in 25" :key="i" class="faq-dot" />
          </div>

        </div>
      </div>

      <!-- ══ RIGHT — FAQ accordion ══ -->
      <div class="faq-accordion-col">
        <div class="faq-list">
          <div
            v-for="faq in faqSection?.faqs"
            :key="faq.id"
            class="faq-item"
            :class="{ 'faq-item--open': openId === faq.id }"
          >
            <button
              type="button"
              class="faq-item__btn"
              @click="toggleFaq(faq.id)"
            >
              <span class="faq-item__question">{{ faq.question }}</span>
              <span class="faq-item__icon" :class="{ 'faq-item__icon--open': openId === faq.id }">
                <svg viewBox="0 0 20 20" fill="none" class="w-4 h-4">
                  <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
            <Transition
              enter-active-class="faq-ans-enter-active"
              enter-from-class="faq-ans-enter-from"
              enter-to-class="faq-ans-enter-to"
              leave-active-class="faq-ans-leave-active"
              leave-from-class="faq-ans-leave-from"
              leave-to-class="faq-ans-leave-to"
            >
              <div v-show="openId === faq.id" class="faq-item__answer-wrap">
                <div class="faq-item__answer">
                  {{ faq.answer }}
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- CTA -->
        <div class="faq-cta">
          <p class="faq-cta__text">Can't find what you're looking for?</p>
          <NuxtLink to="/contact" class="faq-cta__btn">
            <svg viewBox="0 0 20 20" fill="none" class="w-4 h-4">
              <path d="M2.5 5.5A1.5 1.5 0 014 4h12a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0116 16H4a1.5 1.5 0 01-1.5-1.5v-9z" stroke="currentColor" stroke-width="1.6"/>
              <path d="M2.5 6.5l7.5 5 7.5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
            Contact Us
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const { faqSection } = useLandingData()
const openId = ref<string | null>(null)
function toggleFaq(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<style scoped>
/* ════════════════════════════════════════
   SECTION
════════════════════════════════════════ */
.faq-section {
  padding: 0;
}

/* ── Header ── */
.faq-header {
  text-align: center;
  margin-bottom: 52px;
}
.faq-header__eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1e3a5f;
  opacity: 0.5;
  margin-bottom: 8px;
}
.faq-header__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 10px;
}
.faq-header__title--navy { color: #1e3a5f; }
.faq-header__title--red  { color: #dc2626; }
.faq-header__sub {
  font-size: 0.9rem;
  color: #64748b;
}

/* ── Grid ── */
.faq-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: start;
}
@media (min-width: 1024px) {
  .faq-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
    gap: 56px;
  }
}

/* ════════════════════════════════════════
   BLOB IMAGE
════════════════════════════════════════ */
.faq-image-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.faq-blob-wrap {
  position: relative;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
}

/* Soft ring behind blob */
.faq-blob-ring {
  position: absolute;
  inset: -14px;
  border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%;
  border: 2.5px dashed rgba(30,58,95,0.13);
  animation: blob-rotate 18s linear infinite;
  z-index: 0;
}

/* Yellow accent blob */
.faq-blob-accent {
  position: absolute;
  inset: -6px;
  border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%;
  background: linear-gradient(135deg, #fde047 0%, #facc15 60%, #fbbf24 100%);
  opacity: 0.35;
  z-index: 1;
  animation: blob-morph 9s ease-in-out infinite alternate;
}

/* Main blob clip */
.faq-blob {
  position: absolute;
  inset: 0;
  border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%;
  overflow: hidden;
  z-index: 2;
  box-shadow:
    0 20px 60px rgba(30,58,95,0.18),
    0 6px 20px rgba(0,0,0,0.10);
  animation: blob-morph 9s ease-in-out infinite alternate;
  transition: box-shadow 0.35s ease;
}
.faq-blob-wrap:hover .faq-blob {
  box-shadow:
    0 28px 72px rgba(30,58,95,0.28),
    0 10px 32px rgba(0,0,0,0.14);
}

.faq-blob__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s ease;
}
.faq-blob-wrap:hover .faq-blob__img {
  transform: scale(1.06);
}

/* Blob shape animations */
@keyframes blob-morph {
  0%   { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
  33%  { border-radius: 44% 56% 62% 38% / 50% 60% 40% 50%; }
  66%  { border-radius: 55% 45% 38% 62% / 42% 58% 48% 52%; }
  100% { border-radius: 48% 52% 55% 45% / 56% 40% 60% 44%; }
}

@keyframes blob-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}


/* ── Dot grid decoration ── */
.faq-dot-grid {
  position: absolute;
  bottom: -20px;
  left: -20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  z-index: 0;
}
.faq-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #1e3a5f;
  opacity: 0.12;
}

/* ════════════════════════════════════════
   FAQ ACCORDION
════════════════════════════════════════ */
.faq-accordion-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.faq-item {
  border-radius: 14px;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.faq-item:hover {
  border-color: rgba(30,58,95,0.45);
  box-shadow: 0 8px 28px rgba(30,58,95,0.13);
  transform: translateY(-2px);
  background: #f8faff;
}
.faq-item--open {
  border-color: #1e3a5f;
  box-shadow: 0 4px 20px rgba(30,58,95,0.12);
}

.faq-item__btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background 0.25s ease;
}
.faq-item:not(.faq-item--open) .faq-item__btn:hover {
  background: linear-gradient(135deg, rgba(30,58,95,0.05) 0%, rgba(42,82,152,0.07) 100%);
}
.faq-item--open .faq-item__btn {
  background: linear-gradient(135deg, #1e3a5f 0%, #2a5298 100%);
}

.faq-item__question {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 1.4;
  transition: color 0.2s ease;
}
.faq-item:not(.faq-item--open) .faq-item__btn:hover .faq-item__question {
  color: #1e3a5f;
}
.faq-item--open .faq-item__question {
  color: #ffffff;
}
.faq-item--open .faq-item__btn:hover .faq-item__question {
  color: #ffffff;
}

.faq-item__icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
}
.faq-item:not(.faq-item--open) .faq-item__btn:hover .faq-item__icon {
  background: #1e3a5f;
  color: #ffffff;
  transform: scale(1.1);
  box-shadow: 0 3px 10px rgba(30,58,95,0.3);
}
.faq-item--open .faq-item__icon {
  background: rgba(255,255,255,0.18);
  color: #ffffff;
  transform: rotate(180deg);
}

/* Answer panel */
.faq-item__answer-wrap {
  overflow: hidden;
}
.faq-item__answer {
  padding: 14px 18px 16px 18px;
  font-size: 0.84rem;
  color: #475569;
  line-height: 1.7;
  background: #f8fafc;
  border-top: 1px solid #e8edf4;
}

/* Transition classes */
.faq-ans-enter-active,
.faq-ans-leave-active {
  transition: max-height 0.3s ease, opacity 0.25s ease;
  max-height: 500px;
  opacity: 1;
}
.faq-ans-enter-from,
.faq-ans-leave-to {
  max-height: 0;
  opacity: 0;
}
.faq-ans-enter-to,
.faq-ans-leave-from {
  max-height: 500px;
  opacity: 1;
}

/* ── CTA row ── */
.faq-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.faq-cta__text {
  font-size: 0.84rem;
  color: #64748b;
}
.faq-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #1e3a5f 0%, #2a5298 100%);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.18s ease;
  box-shadow: 0 3px 12px rgba(30,58,95,0.28);
  letter-spacing: 0.02em;
}
.faq-cta__btn:hover {
  background: linear-gradient(135deg, #162d4a 0%, #1e3f80 100%);
  box-shadow: 0 6px 20px rgba(30,58,95,0.38);
  transform: translateY(-1px);
}
</style>