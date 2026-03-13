<template>
  <div>
    <!-- Floating notifications -->
    <div class="absolute left-[-20px] top-6 z-20 flex min-w-[180px] items-center gap-[10px] rounded-[14px] border border-white/10 bg-[rgba(8,30,60,0.85)] px-[14px] py-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] [backdrop-filter:blur(16px)] animate-[notif-float_4s_ease-in-out_infinite] [animation-duration:4.6s] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] max-sm:left-[-10px] max-sm:top-[10px]">
      <span class="text-[20px]">🆕</span>
      <div>
        <p class="m-0 text-[11px] font-bold tracking-[0.02em] text-[#E6EAED]">New Arrival!</p>
        <p class="m-0 text-[10px] font-normal text-[rgba(230,234,237,0.5)]">Mama Sita's Kare-Kare Mix</p>
      </div>
    </div>

    <div class="absolute left-[-30px] bottom-[60px] z-20 flex min-w-[180px] items-center gap-[10px] rounded-[14px] border border-white/10 bg-[rgba(8,30,60,0.85)] px-[14px] py-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] [backdrop-filter:blur(16px)] animate-[notif-float_4s_ease-in-out_infinite] [animation-delay:1.3s] [animation-duration:5.2s] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] max-sm:left-[-10px] max-sm:bottom-[30px]">
      <span class="text-[20px]">🔥</span>
      <div>
        <p class="m-0 text-[11px] font-bold tracking-[0.02em] text-[#E6EAED]">Flash Sale</p>
        <p class="m-0 text-[10px] font-normal text-[rgba(230,234,237,0.5)]">Up to 30% off today</p>
      </div>
    </div>

    <div class="absolute right-[-24px] top-1/2 z-20 flex min-w-[180px] -translate-y-1/2 items-center gap-[10px] rounded-[14px] border border-white/10 bg-[rgba(8,30,60,0.85)] px-[14px] py-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] [backdrop-filter:blur(16px)] animate-[notif-float-mid_4s_0.7s_ease-in-out_infinite] [animation-duration:4.8s] transition-transform duration-300 hover:translate-y-[calc(-50%-4px)] hover:scale-[1.02] max-sm:right-[-10px]">
      <span class="text-[20px]">🎉</span>
      <div>
        <p class="m-0 text-[11px] font-bold tracking-[0.02em] text-[#E6EAED]">You're subscribed!</p>
        <p class="m-0 text-[10px] font-normal text-[rgba(230,234,237,0.5)]">Welcome to Kathie's Kitchen</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes notif-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes notif-float-mid {
  0%, 100% { transform: translateY(-50%); }
  50% { transform: translateY(calc(-50% - 8px)); }
}
</style>