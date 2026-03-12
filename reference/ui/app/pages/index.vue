<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-br from-[#FEF3E2] via-[#FFE9C7] to-[#E3D9CB]">

    <!-- Hero Section -->
    <section class="relative h-[50vh] lg:h-[40vh] pt-20 flex items-center justify-center text-center text-[#FEF3E2]">
      <!-- Background Image -->
      <img :src="`${BASE_ASSETS_URL}/images/bg/Hero.png`" alt="Hero Background"
        class="absolute inset-0 w-full h-full object-cover" />

      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#FAB12F]/75 via-[#DB0000]/75 to-[#FA812F]/75"></div>

      <!-- Content -->
      <div class="relative z-10 max-w-5xl mx-auto px-6">
        <h1 class="font-kaushan text-4xl md:text-6xl mb-4">
          Bringing home closer, one bite at a time
        </h1>
        <p class="text-lg md:text-xl font-righteous ">
          Authentic Filipino flavors, crafted with love and delivered fresh to your
          doorstep.
        </p>
      </div>
    </section>

    <!-- Trending Deals Section -->
    <Trending />

    <!-- Categories Section -->
    <section class="max-w-7xl mx-auto text-[#010024]">
      <div class="text-center mb-12">
        <h2 class="font-righteous text-3xl md:text-4xl mb-2">
          Browse By Category, Shop By Craving
        </h2>
        <p class="font-kaushan text-[#FA812F] text-lg">
          Find exactly what you’re craving — whether it’s noodles, snacks, or something sweet.
        </p>
      </div>

      <div v-if="isLoading" class="text-center text-gray-500">
        Loading categories...
      </div>

      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>

      <!-- Bento Grid -->
      <div v-else
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 auto-rows-[200px] md:auto-rows-[250px] gap-4 md:gap-6">
        <div v-for="(category, index) in categories" :key="category.id" @click="goToCategory(category.name)" :class="[
          'relative group rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03]',
          index === 0 ? 'col-span-2 sm:col-span-1 sm:row-span-2 md:row-span-2' : '',
          index === 1 ? 'sm:col-span-1 md:col-span-1 lg:col-span-2' : '',
          index === 5 ? 'sm:col-span-2 md:col-span-1' : '',
          index === 6 ? 'sm:col-span-1 md:col-span-1' : ''
        ]">
          <img :src="category.image" :alt="category.name" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-[#010024]/60 transition-opacity duration-300 group-hover:bg-[#010024]/80">
          </div>
          <div
            class="absolute bottom-0 left-0 w-full p-4 text-[#FEF3E2] transition-all duration-300 group-hover:bottom-10">
            <h3 class="font-righteous text-lg md:text-xl">
              {{ category.name }}
            </h3>
            <p class="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
              {{ category.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <Comingsoon />

    <!-- Newsletter / Subscribe Section -->
    <section
      class="relative w-full bg-gradient-to-br from-[#FAB12F] via-[#DB0000] to-[#FA812F] overflow-hidden">
      <div class="max-w-7xl mx-auto py-30 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left Side -->
        <div class="text-[#FEF3E2] space-y-6">
          <h2 class="font-righteous text-3xl md:text-4xl leading-tight">
            Don’t Miss a Bite!
          </h2>

          <input v-model="newsletterEmail" type="email" placeholder="Email Address"
            class="w-full px-4 py-3 rounded-lg bg-[#FEF3E2] text-[#010024] placeholder-[#010024]/60 focus:outline-none focus:ring-2 focus:ring-[#010024]" />

          <p class="font-kaushan text-[#FEF3E2]/90">
            Be the first to know when new Filipino favorites hit our shelves.
          </p>

          <button @click="submitNewsletter"
            class="w-full md:w-auto bg-[#010024] text-[#FEF3E2] px-8 py-3 rounded-full font-semibold transition duration-300 hover:bg-[#FEF3E2] hover:text-[#010024] hover:shadow-lg">
            Subscribe
          </button>
        </div>

        <!-- Right Side (Mockup) -->
        <div class="relative flex justify-center items-center">
          <div class="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div class="w-80 h-80 md:w-96 md:h-96 bg-[#FEF3E2] rounded-full shadow-lg"></div>
          </div>
          <img :src="`${BASE_ASSETS_URL}/images/iMockup.png`"
            alt="App preview" class="relative w-80 md:w-96 lg:w-[50vh] object-contain drop-shadow-2xl z-10" />
        </div>
      </div>

      <!-- Alert Modal -->
      <transition name="fade">
        <div v-if="statusMessage" @click.self="closeAlert"
          class="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div :class="[
            'rounded-xl px-8 py-6 shadow-xl text-center text-lg font-semibold transition',
            statusType === 'success' && 'bg-green-100 text-green-700',
            statusType === 'warning' && 'bg-yellow-100 text-yellow-700',
            statusType === 'error' && 'bg-red-100 text-red-700'
          ]">
            {{ statusMessage }}
          </div>
        </div>
      </transition>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-7xl mx-auto py-16">
      <div class="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <!-- Left Side -->
        <div class="text-[#010024] space-y-10">
          <h2 class="font-righteous text-3xl md:text-4xl">
            Your Questions, Answered
          </h2>
          <p class="font-kaushan text-[#FA812F]">
            We want your shopping to be stress-free. Here are quick answers you need.
          </p>
          <NuxtLink to="/faq"
            class="w-full md:w-auto bg-[#010024] text-[#FEF3E2] px-8 py-3 rounded-full font-semibold transition duration-300 hover:bg-[#FEF3E2] hover:text-[#010024] hover:shadow-lg">
            More FAQs →
          </NuxtLink>

        </div>

        <!-- Right Side: FAQ Accordion -->
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index"
            class="border border-[#010024]/10 rounded-2xl overflow-hidden transition-all duration-300 bg-gradient-to-br from-[#FEF3E2] via-[#FFF6EC] to-[#FFECD0] shadow-sm hover:shadow-md">
            <!-- Question Header -->
            <button
              class="w-full flex justify-between items-center p-5 text-left text-[#010024] font-semibold hover:text-[#FA812F] transition-all duration-300"
              @click="toggleFaq(index)">
              <span class="pr-4">{{ faq.question }}</span>
              <svg :class="[
                'w-5 h-5 transform transition-transform duration-300',
                openIndex === index ? 'rotate-180 text-[#FA812F]' : 'text-[#010024]'
              ]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Animated Answer -->
            <transition name="faq-slide">
              <div v-show="openIndex === index" v-html="faq.answer"
                class="px-6 pb-6 pt-4 text-base text-[#2b2b2b] leading-relaxed bg-[#FFF7E9]/70 rounded-b-2xl space-y-2">
              </div>
            </transition>

          </div>
        </div>

      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from 'sweetalert2'
import { buildUrl } from '@/utils/api' // adjust if needed
import { BASE_ASSETS_URL } from '@/utils/api'
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// for categories
import { useRouter } from 'vue-router'

const router = useRouter()
const categories = ref([])
const isLoading = ref(true)
const error = ref(null)

async function fetchCategories() {
  try {
    const res = await fetch(buildUrl('categories'))
    // console.log('Fetching:', res)
    if (!res.ok) throw new Error(`Categories HTTP ${res.status}`)
    const data = await res.json()
    categories.value = Array.isArray(data) ? data : (data.results || [])
  } catch (err) {
    error.value = 'Failed to load categories'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function goToCategory(catName) {
  router.push(`/catalog?category=${encodeURIComponent(catName)}`)
}

onMounted(fetchCategories)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const newsletterEmail = ref('')
const statusMessage = ref('')
const statusType = ref('') // 'success' | 'warning' | 'error' | ''
let alertTimeout

// close alert manually or auto after 5s
const closeAlert = () => {
  statusMessage.value = ''
  statusType.value = ''
  clearTimeout(alertTimeout)
}

// normalize DRF paginated response
function extractListFromResponse(json) {
  if (!json) return []
  if (Array.isArray(json)) return json
  if (Array.isArray(json.results)) return json.results
  for (const key of Object.keys(json)) {
    if (Array.isArray(json[key])) return json[key]
  }
  return []
}

const submitNewsletter = async () => {
  const email = (newsletterEmail.value || '').trim();

  // === Basic validation ===
  if (!email) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Email',
      text: 'Please enter your email address.',
      timer: 2500,
      showConfirmButton: false,
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      timer: 2500,
      showConfirmButton: false,
    });
    return;
  }

  try {
    // Show loading state
    Swal.fire({
      title: 'Subscribing...',
      text: 'Please wait a moment.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await fetch(buildUrl('subscribe-newsletter'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    Swal.close();

    // === Handle API result ===
    if (!res.ok) {
      console.error('Newsletter response:', data);
      Swal.fire({
        icon: 'error',
        title: 'Subscription Failed',
        text: data?.error || 'Something went wrong. Please try again later.',
      });
      return;
    }

    // === Interpret normal messages ===
    if (data.message.includes('already')) {
      Swal.fire({
        icon: 'info',
        title: 'Already Subscribed',
        text: data.message,
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Subscription Successful!',
        text: 'Please check your inbox for a welcome message 😊',
        timer: 3500,
        showConfirmButton: false,
      });
      newsletterEmail.value = '';
    }

  } catch (err) {
    console.error('Newsletter error:', err);
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'Network Error',
      text: 'Something went wrong. Please try again later.',
    });
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for FAQs page section
const openIndex = ref(null)
const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'Do prices change often?',
    answer: `
      <p>
        Yes — product prices may change occasionally based on <strong>market rates</strong>, supplier costs, or import adjustments.
        Rest assured, <strong>all price updates are reflected in real-time</strong> on our website, so what you see online is always accurate and up to date.
      </p>
    `
  },
  {
    question: 'What payment methods do you accept?',
    answer: `
      <p>
        We accept <strong>EFT (bank transfer)</strong>, <strong>major debit/credit cards</strong>, and <strong>secure mobile payments</strong> through verified South African payment gateways.
      </p>
      <p class="mt-2">
        All transactions are <strong>encrypted and PCI-compliant</strong> to ensure your information is safe.
      </p>
    `
  },
  {
    question: 'How do deliveries work?',
    answer: `
      <p>
        We deliver <strong>nationwide across South Africa</strong> via trusted courier partners. Delivery costs depend on your <strong>location, order weight, and volume</strong>.
      </p>
      <p class="mt-2">
        <strong>Cape Town & nearby areas:</strong> local delivery options available.<br>
        <strong>Nationwide:</strong> standard and express courier services offered.
      </p>
      <p class="mt-2">
        For custom delivery quotes, email us at 
        <a href="mailto:info@kathieskitchen.com" class="text-[#FA812F] underline hover:text-[#010024] transition">
          info@kathieskitchen.com
        </a>.
      </p>
    `
  },
  {
    question: 'Can I return products?',
    answer: `
      <p>
        Yes! You can return <strong>unopened and undamaged items</strong> within <strong>7 days</strong> of receiving your order.
      </p>
      <p class="mt-2">
        To start a return or check eligibility, please review our 
        <a href="/refund-policy" class="text-[#FA812F] underline hover:text-[#010024] transition">
          Refund Policy
        </a> 
        or contact our team for assistance.
      </p>
    `
  },
  {
    question: 'What are your working hours?',
    answer: `
      <div class="space-y-1">
        <p><strong>Mon–Wed & Fri–Sat:</strong> 09:00 – 17:00</p>
        <p><strong>Thu:</strong> By Appointment</p>
        <p><strong>Sun:</strong> Closed</p>
      </div>
      <p class="mt-2">
        For wholesale or special inquiries, we recommend booking an appointment via 
        <a href="mailto:info@kathieskitchen.com" class="text-[#FA812F] underline hover:text-[#010024] transition">
          info@kathieskitchen.com
        </a>.
      </p>
    `
  },
  {
    question: 'What type of cuisine does Kathie’s Kitchen offer?',
    answer: `
      <p>
        Kathie’s Kitchen takes pride in its <strong>Kapampangan heritage</strong> — known as the culinary capital of the Philippines.
      </p>
      <p class="mt-2">
        We serve <strong>authentic Filipino dishes and ingredients</strong> that capture the warmth of home cooking — from savory meals to nostalgic snacks.
      </p>
      <p class="mt-2 italic">
        “Bringing home closer, one bite at a time.”
      </p>
    `
  },
  {
    question: 'Is a wholesale pricelist available?',
    answer: `
      <p>
        Absolutely! Kathie’s Kitchen supplies both <strong>retailers</strong> and <strong>restaurants</strong> with high-quality Filipino products.
      </p>
      <ul class="list-disc pl-5 mt-2 space-y-1">
        <li>1 box per item minimum for grocery goods</li>
        <li>20 kg minimum for ready-to-cook food items</li>
      </ul>
      <p class="mt-2">
        Request our latest wholesale catalogue and price list by emailing 
        <a href="mailto:info@kathieskitchen.com" class="text-[#FA812F] underline hover:text-[#010024] transition">
          info@kathieskitchen.com
        </a>.
      </p>
    `
  },
  {
    question: 'How do we get our orders?',
    answer: `
      <p>
        We offer <strong>local delivery</strong> in Cape Town and surrounding areas, plus <strong>nationwide shipping</strong> through reliable couriers.
      </p>
      <p class="mt-2">
        Frozen goods and bulk items may require special handling — delivery fees depend on distance and order size.
      </p>
      <p class="mt-2">
        For detailed delivery options or bulk quotes, contact us at 
        <a href="mailto:info@kathieskitchen.com" class="text-[#FA812F] underline hover:text-[#010024] transition">
          info@kathieskitchen.com
        </a> 
        or WhatsApp 
        <a href="https://wa.me/27715751616" target="_blank" class="text-[#FA812F] underline hover:text-[#010024] transition">
          +27 71 575 1616
        </a>.
      </p>
    `
  }
]

</script>

<style scoped>
.faq-slide-enter-active,
.faq-slide-leave-active {
  transition: all 0.3s ease;
}

.faq-slide-enter-from,
.faq-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.faq-slide-enter-to,
.faq-slide-leave-from {
  max-height: 500px;
  opacity: 1;
}

/* smooth carousel animation */
.transition-transform {
  transition: transform 0.6s ease-in-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.group {
  transition: all 0.3s ease;
}

.group img {
  user-select: none;
  -webkit-user-drag: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>