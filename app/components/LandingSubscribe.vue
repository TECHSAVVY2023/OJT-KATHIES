<template>
  <section class="py-16 md:py-20 overflow-hidden" style="background: linear-gradient(135deg, #083D6D 0%, #0F76D3 50%, #1e3a5f 100%);">
    <div class="container mx-auto px-4 max-w-5xl">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left: form -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t Miss a Bite!
          </h2>
          <form class="space-y-3" @submit.prevent="onSubmit">
            <input
              v-model="email"
              type="email"
              placeholder="Email Address"
              class="w-full px-5 py-4 rounded-lg bg-white/95 text-slate-800 placeholder:text-slate-500 border-0 focus:ring-2 focus:ring-white/50 outline-none"
              required
            >
            <p class="text-white/80 text-sm italic">
              Be the first to know when new Filipino favorites hit our shelves.
            </p>
            <button
              type="submit"
              class="px-8 py-3.5 bg-[#062a4d] hover:bg-[#041e38] text-white font-semibold rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
        <!-- Right: phone mockup with logo inside -->
        <div class="hidden md:flex justify-center items-center relative min-h-[320px]">
          <!-- Light circle behind phone (centered) -->
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#f5f0e8]"
            aria-hidden="true"
          />
          <!-- Phone mockup (angled, realistic) -->
          <div
            class="relative z-10 w-[200px] -rotate-[8deg]"
          >
            <div class="relative bg-slate-900 rounded-[2.75rem] p-[5px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
              <!-- Side buttons -->
              <div class="absolute -left-[2px] top-24 w-[2px] h-8 rounded-l bg-slate-700" />
              <div class="absolute -left-[2px] top-36 w-[2px] h-12 rounded-l bg-slate-700" />
              <div class="absolute -left-[2px] top-52 w-[2px] h-12 rounded-l bg-slate-700" />
              <div class="absolute -right-[2px] top-28 w-[2px] h-14 rounded-r bg-slate-700" />
              <!-- Screen bezel -->
              <div class="relative aspect-[9/19.5] rounded-[2.25rem] overflow-hidden bg-black">
                <!-- Screen content -->
                <div class="absolute inset-[3px] rounded-[2rem] overflow-hidden bg-white">
                  <!-- Punch hole camera -->
                  <div class="absolute top-[10px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-black z-10 ring-2 ring-slate-800/50" />
                  <div class="absolute inset-0 flex items-center justify-center p-4 pt-12">
                    <img
                      src="/images/logo.png"
                      alt="Kathie's Kitchen"
                      class="w-[90%] max-w-[170px] object-contain object-center"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { add: addSubscriber } = useSubscribers()
const email = ref('')

function onSubmit() {
  if (email.value.trim()) {
    addSubscriber(email.value)
    email.value = ''
  }
}
</script>
