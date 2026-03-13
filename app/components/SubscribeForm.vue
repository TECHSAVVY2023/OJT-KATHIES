<template>
  <form class="flex w-full max-w-[520px] flex-col gap-3" @submit.prevent="onSubmit">
    <label
      class="group flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.07)] px-[18px] transition-[border-color,background,box-shadow] duration-200 [backdrop-filter:blur(12px)] focus-within:border-[rgba(15,118,211,0.7)] focus-within:bg-[rgba(255,255,255,0.1)] focus-within:shadow-[0_0_0_4px_rgba(15,118,211,0.12),0_4px_20px_rgba(0,0,0,0.2)]"
    >
      <svg class="h-[18px] w-[18px] flex-shrink-0 text-[rgba(230,234,237,0.4)] transition-colors duration-200 group-focus-within:text-[#7DB8EC]" viewBox="0 0 20 20" fill="none">
        <path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4"/>
        <path d="M2 6l8 5 8-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
      <input
        v-model="email"
        type="email"
        class="w-full bg-transparent py-4 text-[14px] font-normal text-[#E6EAED] outline-none placeholder:text-[rgba(230,234,237,0.35)]"
        placeholder="Enter your email address"
        required
      >
    </label>

    <button
      type="submit"
      class="group relative flex w-full items-center justify-center overflow-hidden rounded-xl border-0 px-8 py-4 [isolation:isolate] cursor-pointer transition-transform duration-200 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-[2px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.99]"
      :class="submitted
        ? 'shadow-[0_0_0_2px_rgba(34,197,94,0.6),0_4px_24px_rgba(0,80,30,0.4)]'
        : 'shadow-[0_0_0_1px_rgba(15,118,211,0.6),0_4px_24px_rgba(8,61,109,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] animate-[btn-outer-pulse_4s_ease-in-out_infinite]'"
    >
      <span
        v-if="!submitted"
        class="absolute -inset-[2px] -z-[1] rounded-[14px] bg-[conic-gradient(from_0deg,#0F76D3,#4db8ff,#fff,#4db8ff,#0F76D3,#083D6D,#0F76D3)] animate-[btn-ring-spin_3s_linear_infinite]"
      />
      <span
        class="absolute inset-0 z-[0] rounded-[12px] [background-size:200%_200%] animate-[btn-bg-shift_6s_ease-in-out_infinite]"
        :class="submitted
          ? 'bg-[linear-gradient(135deg,#0a3a1a_0%,#0d5c2a_50%,#0a3a1a_100%)]'
          : 'bg-[linear-gradient(135deg,#0a2a50_0%,#083D6D_35%,#0b5499_65%,#083D6D_100%)]'"
      />
      <span
        v-if="!submitted"
        class="pointer-events-none absolute inset-0 z-[2] rounded-[12px] bg-[linear-gradient(110deg,transparent_0%,transparent_28%,rgba(255,255,255,0.06)_38%,rgba(150,210,255,0.55)_48%,rgba(255,255,255,0.9)_52%,rgba(150,210,255,0.55)_57%,rgba(255,255,255,0.06)_65%,transparent_75%,transparent_100%)] -translate-x-[200%] skew-x-[-15deg] animate-[btn-shine-interval_3.5s_cubic-bezier(0.4,0,0.2,1)_infinite]"
      />

      <span class="relative z-[10] flex items-center gap-[10px] text-[14px] font-semibold uppercase tracking-[0.08em] text-white">
        <template v-if="!submitted">
          <svg class="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="none">
            <path d="M3 10h14M11 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Subscribe Now
        </template>
        <template v-else>
          <svg class="h-[18px] w-[18px]" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l5 5 7-7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          You're in!
        </template>
      </span>
    </button>

    <p class="m-0 text-[11.5px] text-[rgba(230,234,237,0.3)]">
      No spam. Unsubscribe anytime.
    </p>
  </form>
</template>

<script setup lang="ts">
const { add: addSubscriber } = useSubscribers()
const email = ref('')
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
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
</style>