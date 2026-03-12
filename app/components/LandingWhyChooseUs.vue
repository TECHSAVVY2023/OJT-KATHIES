<template>
  <section id="why-choose-us" class="wcu-section bg-white py-[68px] pb-[62px] font-sans overflow-hidden">
    <div class="mx-auto w-full max-w-[1100px] px-6">

      <!-- Header -->
      <div class="section-header mb-[52px] flex flex-col items-center gap-2 text-center">
        <h2 class="section-title m-0 text-[clamp(22px,2.4vw,28px)] font-semibold leading-snug tracking-[-0.02em] text-[#083D6D]">
          {{ whyChooseUs?.title || 'Your Trusted Filipino Store' }}
        </h2>
        <p class="section-subtitle m-0 max-w-[420px] text-[14px] leading-relaxed text-[#6B7F95]">
          Authentic Filipino products — delivered with care, right to your door.
        </p>
      </div>

      <!-- Grid -->
      <div class="wcu-grid grid items-center gap-[44px] md:grid-cols-[1fr_auto_1fr]">

        <!-- Left features -->
        <div class="features-col flex flex-col items-center gap-8">
          <div
            v-for="(f, i) in whyChooseUs?.features?.slice(0, 2)"
            :key="f.id"
            class="feature-item flex max-w-[250px] flex-col items-center gap-3 text-center animate-[wcuFadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
            :style="{ '--d': `${i * 80}ms` }"
          >
            <div class="feature-icon-wrap flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-[rgba(15,118,211,0.14)] bg-[#EDF3FF] text-[#083D6D] transition duration-300 ease-out">
              <LandingWhyChooseUsIcon :icon="f.icon" />
            </div>
            <div>
              <h3 class="feature-name mb-[3px] text-[14.5px] font-semibold text-[#083D6D] transition-colors duration-200">
                {{ f.name }}
              </h3>
              <p class="feature-desc m-0 text-[12.5px] leading-relaxed text-[#6B7F95]">
                {{ f.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Center flip card -->
        <div class="flip-col relative flex h-[310px] w-[310px] shrink-0 items-center justify-center">
          <div
            class="ring ring-1 pointer-events-none absolute left-1/2 top-1/2 h-[294px] w-[294px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(15,118,211,0.13)] animate-[wcuSpin_22s_linear_infinite]"
            aria-hidden="true"
          />
          <div
            class="ring ring-2 pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(200,50,58,0.07)] animate-[wcuSpin_32s_linear_infinite_reverse]"
            aria-hidden="true"
          />
          <button
            type="button"
            class="flip-trigger relative z-[1] h-[264px] w-[264px] cursor-pointer rounded-full border-0 bg-transparent p-0 [perspective:1100px]"
            :aria-pressed="flipped"
            aria-label="Flip card"
            @click="flipped = !flipped"
          >
            <div
              class="flip-inner relative h-full w-full rounded-full [transform-style:preserve-3d] [transition:transform_0.7s_cubic-bezier(0.4,0.2,0.2,1)]"
              :class="{ 'is-flipped': flipped }"
            >

              <!-- Front -->
              <div
                class="flip-face flip-front absolute inset-0 rounded-full border border-[rgba(15,118,211,0.18)] bg-white shadow-[0_6px_28px_rgba(8,61,109,0.1),0_2px_6px_rgba(8,61,109,0.06)] [backface-visibility:hidden] [overflow:hidden]"
              >
                <div class="flip-image-frame h-full w-full overflow-hidden">
                  <img
                    v-if="!imgError"
                    :key="flipped ? 'flipped' : 'front'"
                    :src="whyChooseUs?.centerImage || '/images/flip.png'"
                    alt="Kathie's Kitchen products"
                    class="flip-image h-full w-full animate-[imgZoomOut_3.5s_cubic-bezier(0.25,0.46,0.45,0.94)_forwards] object-cover"
                    @error="imgError = true"
                  >
                  <div v-else class="flip-fallback">
                    <span style="font-size:34px">🍜</span>
                    <p class="fallback-title">Kathie's Kitchen</p>
                    <p class="fallback-sub">Filipino Sari-Sari Store</p>
                  </div>
                </div>
                <div
                  class="flip-hint absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[rgba(8,61,109,0.68)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white"
                >
                  <svg viewBox="0 0 16 16" fill="none" style="width:10px;height:10px;flex-shrink:0">
                    <path d="M8 3v5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                  Tap to flip
                </div>
              </div>

              <!-- Back -->
              <div
                class="flip-face flip-back absolute inset-0 flex items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(145deg,#083D6D_0%,#0a4d88_55%,#0F76D3_100%)] shadow-[0_6px_28px_rgba(8,61,109,0.22)] [backface-visibility:hidden] [overflow:hidden] [transform:rotateY(180deg)]"
              >
                <div class="flip-back-content flex w-[172px] flex-col items-center gap-1.5 text-center">
                  <div class="back-icon text-[26px] leading-none">🏪</div>
                  <h3 class="back-title m-0 text-[14px] font-bold tracking-[-0.02em] text-white">
                    Kathie's Kitchen
                  </h3>
                  <p class="back-tagline m-0 text-[8.5px] font-medium uppercase tracking-[0.07em] text-white/50">
                    Filipino Sari-Sari · South Africa
                  </p>
                  <div class="back-divider my-[2px] h-[2px] w-7 rounded bg-[linear-gradient(90deg,#0F76D3,#CE1126)]" />
                  <ul class="back-list m-0 flex w-full list-none flex-col gap-1.5 p-0 text-left">
                    <li class="back-item flex items-start gap-1.5 text-[10px] leading-snug text-[#E1E8F0]">
                      <span class="back-bullet mt-[3px] h-1 w-1 rounded-full bg-[#CE1126] shadow-[0_0_4px_rgba(206,17,38,0.55)]" />
                      Authentic Filipino online grocery &amp; food shop
                    </li>
                    <li class="back-item flex items-start gap-1.5 text-[10px] leading-snug text-[#E1E8F0]">
                      <span class="back-bullet mt-[3px] h-1 w-1 rounded-full bg-[#CE1126] shadow-[0_0_4px_rgba(206,17,38,0.55)]" />
                      Snacks, noodles, pantry staples &amp; more
                    </li>
                    <li class="back-item flex items-start gap-1.5 text-[10px] leading-snug text-[#E1E8F0]">
                      <span class="back-bullet mt-[3px] h-1 w-1 rounded-full bg-[#CE1126] shadow-[0_0_4px_rgba(206,17,38,0.55)]" />
                      Nationwide delivery across South Africa
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </button>
        </div>

        <!-- Right features -->
        <div class="features-col flex flex-col items-center gap-8">
          <div
            v-for="(f, i) in whyChooseUs?.features?.slice(2, 4)"
            :key="f.id"
            class="feature-item flex max-w-[250px] flex-col items-center gap-3 text-center animate-[wcuFadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
            :style="{ '--d': `${i * 80}ms` }"
          >
            <div class="feature-icon-wrap flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-[rgba(15,118,211,0.14)] bg-[#EDF3FF] text-[#083D6D] transition duration-300 ease-out">
              <LandingWhyChooseUsIcon :icon="f.icon" />
            </div>
            <div>
              <h3 class="feature-name mb-[3px] text-[14.5px] font-semibold text-[#083D6D] transition-colors duration-200">
                {{ f.name }}
              </h3>
              <p class="feature-desc m-0 text-[12.5px] leading-relaxed text-[#6B7F95]">
                {{ f.description }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { whyChooseUs } = useLandingData()
const flipped = ref(false)
const imgError = ref(false)
</script>

<style scoped>
@keyframes wcuFadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Hover effects using nested selectors */
.feature-item:hover .feature-icon-wrap {
  transform: scale(1.1) rotate(-4deg);
  background: linear-gradient(135deg, #083D6D, #0F76D3);
  color: #fff;
  box-shadow: 0 6px 18px rgba(8,61,109,0.2);
  border-color: transparent;
}

.feature-item:hover .feature-name { color: #0F76D3; }

@keyframes wcuSpin {
  to { transform: translate(-50%,-50%) rotate(360deg); }
}

.flip-inner.is-flipped { transform: rotateY(180deg); }

.flip-trigger:hover .flip-front {
  border-color: rgba(15,118,211,0.38);
  box-shadow: 0 12px 40px rgba(8,61,109,0.14), 0 0 0 3px rgba(15,118,211,0.06);
}

@keyframes imgZoomOut {
  0%   { transform: scale(1.35); }
  100% { transform: scale(1.0); }
}

/* Re-trigger animation on each flip-in by targeting the front face when not flipped */
.flip-inner:not(.is-flipped) .flip-image {
  animation: imgZoomOut 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
.flip-trigger:hover .flip-image { transform: scale(1.04); }

.flip-inner.is-flipped .flip-hint { opacity: 0; pointer-events: none; }

/* ── Responsive ── */
@media (max-width: 860px) {
  .wcu-grid { grid-template-columns: 1fr; justify-items: center; gap: 22px; }
  .features-col { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 16px; }
  .feature-item { max-width: 200px; }
  .flip-col { order: -1; }
}

@media (max-width: 520px) {
  .wcu-section { padding: 48px 0 44px; }
  .flip-trigger { width: 230px; height: 230px; }
  .flip-col { width: 268px; height: 268px; }
  .ring-1 { width: 248px; height: 248px; }
  .ring-2 { width: 296px; height: 296px; }
}
</style>