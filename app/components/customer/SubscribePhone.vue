<template>
  <div class="relative z-10 animate-[phone-float_6s_ease-in-out_infinite] [animation-duration:6.4s] transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg] hover:scale-[1.02]">
    <div class="relative w-[200px] rounded-[42px] bg-[#0d1117] p-[6px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(15,118,211,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <!-- Side buttons -->
      <div class="absolute left-[-3px] top-[90px] h-[28px] w-[3px] rounded-[2px] bg-[#1a2030]" />
      <div class="absolute left-[-3px] top-[128px] h-[36px] w-[3px] rounded-[2px] bg-[#1a2030]" />
      <div class="absolute right-[-3px] top-[110px] h-[44px] w-[3px] rounded-[2px] bg-[#1a2030]" />

      <!-- Screen -->
      <div class="relative aspect-[9/19.5] overflow-hidden rounded-[36px] bg-black">
        <div class="absolute left-1/2 top-[10px] z-20 h-[22px] w-[80px] -translate-x-1/2 rounded-[12px] bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" />
        <div class="absolute inset-0 flex flex-col bg-[linear-gradient(160deg,#0a1628_0%,#0d1f3c_60%,#071525_100%)]">
          <div class="flex items-center justify-between px-[14px] pb-2 pt-9">
            <div class="flex gap-[3px]">
              <span class="h-1 w-1 rounded-full bg-white/25" />
              <span class="h-1 w-1 rounded-full bg-white/25" />
              <span class="h-1 w-1 rounded-full bg-white/25" />
            </div>
            <div class="text-[14px]">📬</div>
          </div>

          <div class="flex flex-1 flex-col items-center justify-center gap-2 px-[14px] py-[10px]">
            <div class="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border-2 border-[rgba(15,118,211,0.4)] bg-white p-[6px] shadow-[0_0_20px_rgba(15,118,211,0.25)]">
              <img src="/images/logo.png" alt="Kathie's Kitchen" class="h-full w-full object-contain" />
            </div>
            <p class="m-0 text-[11px] font-bold tracking-[0.04em] text-[rgba(230,234,237,0.9)]">Kumain ka na?</p>
            <p class="m-0 text-center text-[9px] leading-[1.5] text-[rgba(230,234,237,0.45)]">Your Filipino favorites are waiting.</p>
            <div class="inline-flex items-center gap-[5px] rounded-[20px] border border-[rgba(15,118,211,0.4)] bg-[rgba(15,118,211,0.25)] px-[10px] py-[3px] text-[8.5px] font-semibold tracking-[0.04em] text-[#7DB8EC]">
              <span class="h-[5px] w-[5px] rounded-full bg-[#C8323A] shadow-[0_0_4px_rgba(200,50,58,0.8)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
              3 new items dropped
            </div>
          </div>

          <div class="flex justify-around border-t border-white/5 px-[10px] pb-[14px] pt-2 text-[14px]">
            <span>🏠</span>
            <span>🔍</span>
            <span class="[filter:drop-shadow(0_0_4px_rgba(15,118,211,0.8))]">🛒</span>
            <span>👤</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes phone-float {
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-12px) rotate(-4deg); }
}

@keyframes pulse-dot {
  0%,100% { box-shadow: 0 0 6px rgba(200,50,58,0.8); }
  50% { box-shadow: 0 0 16px rgba(200,50,58,1); }
}
</style>