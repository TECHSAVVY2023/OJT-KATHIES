<template>
    <!-- Coming Soon Section -->
    <section class="max-w-7xl mx-auto py-16 text-[#010024]">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
                <h2 class="font-righteous text-2xl md:text-3xl">
                    Coming soon to your pantry
                </h2>
                <p class="font-kaushan text-[#FA812F] mt-2">
                    Exciting Filipino snacks and ingredients are on the way. Be the first to know when they arrive!
                </p>
            </div>

            <!-- <button @click="showNewsletterModal = true"
                class="bg-[#FA812F] text-[#FEF3E2] font-righteous px-6 py-2 rounded-full shadow-md hover:bg-[#010024] hover:text-[#FEF3E2] transition duration-300">
                Notify me when available
            </button> -->
        </div>

        <!-- Carousel -->
        <div class="relative flex items-center justify-center">
            <!-- Prev Button (with invisible placeholder) -->
            <div class="w-12 h-12 flex items-center justify-center">
                <button v-if="canGoPrev" @click="handlePrev"
                    class="flex items-center justify-center bg-[#FA812F] text-white text-3xl w-12 h-12 rounded-full shadow-lg hover:bg-[#E36B1C] transition-transform duration-200 hover:scale-110 z-20"
                    aria-label="Previous">
                    ‹
                </button>
            </div>

            <!-- Only show carousel if items > visibleCards -->
            <div v-if="showCarousel" class="relative flex items-center flex-1">
                <!-- Track -->
                <div class="flex-1 overflow-hidden">
                    <div ref="comingSoonTrack" class="flex transition-transform duration-500 ease-in-out"
                        :style="{ transform: `translateX(-${translateXPercent}%)` }">
                        <div v-for="(item, idx) in items" :key="`coming-${idx}-${item?.id ?? idx}`"
                            class="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <div
                                class="group bg-transparent rounded-xl overflow-hidden relative border border-transparent transition duration-300">
                                <div
                                    class="relative w-full h-[32vh] overflow-hidden rounded-xl transform transition duration-300">
                                    <span
                                        class="absolute top-3 left-3 bg-[#FA812F] text-[#FEF3E2] text-xs font-semibold px-3 py-1 rounded-full z-10">
                                        Upcoming Stock
                                    </span>
                                    <img :src="item.image" :alt="item.name"
                                        class="w-full h-full object-cover object-center" />
                                </div>
                                <div class="p-4">
                                    <h3 class="text-lg font-righteous text-center md:text-left">{{ item.name }}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Next Button (with invisible placeholder) -->
                <div class="w-12 h-12 flex items-center justify-center">
                    <button v-if="canGoNext" @click="handleNext"
                        class="flex items-center justify-center bg-[#FA812F] text-white text-3xl w-12 h-12 rounded-full shadow-lg hover:bg-[#E36B1C] transition-transform duration-200 hover:scale-110 z-20"
                        aria-label="Next">
                        ›
                    </button>
                </div>
            </div>

            <!-- Fallback Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="item in items" :key="item.id"
                    class="group bg-transparent rounded-xl overflow-hidden relative border border-transparent transition duration-300 p-4">
                    <div
                        class="relative w-full h-[32vh] overflow-hidden rounded-xl transform transition duration-300">
                        <span
                            class="absolute top-3 left-3 bg-[#FA812F] text-[#FEF3E2] text-xs font-semibold px-3 py-1 rounded-full z-10">
                            Upcoming Stock
                        </span>
                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover object-center" />
                    </div>
                    <div class="p-4">
                        <h3 class="text-lg font-righteous text-center md:text-left">{{ item.name }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Newsletter Modal -->
        <transition name="fade">
            <div v-if="showNewsletterModal" @click.self="closeNewsletterModal"
                class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                <div class="bg-[#FEF3E2] rounded-2xl shadow-lg max-w-md w-full p-8 relative">
                    <button @click="closeNewsletterModal"
                        class="absolute top-3 right-3 text-[#010024] hover:text-[#FA812F] transition">
                        ✕
                    </button>

                    <h3 class="font-righteous text-2xl text-[#010024] mb-4 text-center">
                        Stay Updated
                    </h3>
                    <p class="text-center text-sm text-[#010024]/70 mb-6">
                        Enter your email to get notified when new Filipino favorites arrive!
                    </p>

                    <form @submit.prevent="submitNewsletter" class="space-y-3">
                        <div class="flex flex-col sm:flex-row items-center gap-3">
                            <input v-model="newsletterEmail" type="email" required placeholder="Enter your email"
                                class="w-full bg-white/60 flex-1 border border-[#010024]/20 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FA812F]" />
                            <button type="submit"
                                class="bg-[#FA812F] text-[#FEF3E2] font-righteous px-6 py-2 rounded-full hover:bg-[#010024] transition duration-300">
                                Subscribe
                            </button>
                        </div>

                        <p v-if="statusMessage"
                            :class="['font-medium text-center mt-2 transition-colors duration-300', statusClass]">
                            {{ statusMessage }}
                        </p>
                    </form>
                </div>
            </div>
        </transition>
    </section>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { fetchFromApi } from '@/utils/api'

const items = ref([])
const visibleCards = ref(4)
const currentIndex = ref(0)

let autoSlideTimer = null

// --- Responsive visible cards ---
const updateVisibleCards = () => {
    const w = window.innerWidth
    if (w >= 1024) visibleCards.value = 4
    else if (w >= 768) visibleCards.value = 3
    else if (w >= 640) visibleCards.value = 2
    else visibleCards.value = 1
}

// --- Derived values ---
const totalPages = computed(() => {
    if (!items.value.length) return 0
    return Math.ceil(items.value.length / visibleCards.value)
})

// Ensure we don’t exceed bounds when visibleCards > 1
const maxIndex = computed(() => Math.max(0, totalPages.value - 1))

// Derived transform percentage (correctly handles last-page offset)
const translateXPercent = computed(() => {
    const totalItems = items.value.length
    const cardWidthPercent = 100 / visibleCards.value
    const maxTranslate = (totalItems - visibleCards.value) * cardWidthPercent
    const offset = Math.min(currentIndex.value * cardWidthPercent, maxTranslate)
    return offset
})


const showCarousel = computed(() => totalPages.value > 1)
const canGoPrev = computed(() => showCarousel.value && currentIndex.value > 0)
const canGoNext = computed(() => showCarousel.value && currentIndex.value < totalPages.value - 1)

// --- Fetch Data ---
const fetchComingSoon = async () => {
    try {
        const res = await fetchFromApi('comingsoon')
        items.value = Array.isArray(res) ? res : []
        await nextTick()
        currentIndex.value = 0
    } catch (err) {
        console.error('fetch ComingSoon failed:', err)
    }
}


// --- Navigation ---
const handleNext = () => {
    if (currentIndex.value < maxIndex.value) {
        currentIndex.value++
        resetAutoSlide()
    }
}

const handlePrev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
        resetAutoSlide()
    }
}


// --- Auto Slide ---
const startAutoSlide = () => {
    clearInterval(autoSlideTimer)
    if (showCarousel.value) autoSlideTimer = setInterval(handleNext, 5000)
}

const resetAutoSlide = () => {
    clearInterval(autoSlideTimer)
    startAutoSlide()
}

// --- Resize ---
const handleResize = () => {
    const prevVisible = visibleCards.value
    updateVisibleCards()
    if (prevVisible !== visibleCards.value) {
        currentIndex.value = 0
    }
}

onMounted(async () => {
    updateVisibleCards()
    window.addEventListener('resize', handleResize)
    await fetchComingSoon()
    startAutoSlide()
})

onBeforeUnmount(() => {
    clearInterval(autoSlideTimer)
    window.removeEventListener('resize', handleResize)
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { getApiUrl } from '@/utils/api'
const showNewsletterModal = ref(false)
const newsletterEmail = ref('')
const statusMessage = ref('')     // text shown to user
const statusType = ref('')        // 'success' | 'warning' | 'error' | ''

// computed class for text color
const statusClass = computed(() => {
    if (statusType.value === 'success') return 'text-green-600'
    if (statusType.value === 'warning') return 'text-yellow-600'
    if (statusType.value === 'error') return 'text-red-600'
    return 'text-gray-700'
})

// call this to close modal AND clear fields/messages
const closeNewsletterModal = () => {
    showNewsletterModal.value = false
    newsletterEmail.value = ''
    statusMessage.value = ''
    statusType.value = ''
}

// helper: normalize responses that might be paginated
function extractListFromResponse(json) {
    if (!json) return []
    // DRF paginated response usually has 'results'
    if (Array.isArray(json)) return json
    if (Array.isArray(json.results)) return json.results
    // fallback: if object but has items-like fields, try to find array
    for (const key of Object.keys(json)) {
        if (Array.isArray(json[key])) return json[key]
    }
    return []
}

const submitNewsletter = async () => {
    // reset
    statusMessage.value = ''
    statusType.value = ''

    const email = (newsletterEmail.value || '').trim()
    if (!email) {
        statusMessage.value = 'Please enter your email.'
        statusType.value = 'warning'
        return
    }

    try {
        // 1) Check existing subscribers (assumes your backend supports ?email=... filter)
        const checkUrl = getApiUrl(`subscribers?email=${encodeURIComponent(email)}`)
        const checkRes = await fetch(checkUrl, { method: 'GET' })
        if (!checkRes.ok) {
            // non-fatal: log and continue to attempt create (or show error)
            console.warn('check subscribers returned non-OK', await checkRes.text())
        } else {
            const checkJson = await checkRes.json()
            const found = extractListFromResponse(checkJson)
            if (found.length > 0) {
                statusMessage.value = 'You’re already subscribed.'
                statusType.value = 'warning'
                return
            }
        }

        // 2) POST new subscriber
        const postUrl = getApiUrl('subscribers')
        const postRes = await fetch(postUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })

        if (!postRes.ok) {
            const text = await postRes.text()
            console.error('subscriber POST failed', postRes.status, text)
            statusMessage.value = 'Something went wrong. Please try again later.'
            statusType.value = 'error'
            return
        }

        // success
        statusMessage.value = 'Thank you for subscribing!'
        statusType.value = 'success'
        newsletterEmail.value = ''
    } catch (err) {
        console.error('submitNewsletter error', err)
        statusMessage.value = 'Something went wrong. Please try again later.'
        statusType.value = 'error'
    }
}


</script>
