<template>
    <!-- Trending Deals Section -->
    <section class="max-w-7xl mx-auto py-16">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 text-[#010024]">
            <h2 class="font-righteous text-2xl md:text-3xl">This week's must-haves</h2>
            <p class="mt-2 md:mt-0 md:ml-6 font-righteous">
                Shop our most popular Filipino products before they sell out!
            </p>
        </div>

        <!-- Carousel Container -->
        <div class="relative flex items-center">
            <!-- Left Button -->
            <button v-if="showButtons && !isSingleProduct" @click="handlePrev"
                class="flex flex-shrink-0 items-center justify-center bg-[#FA812F] text-white text-3xl w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:bg-[#E36B1C] transition-transform duration-200 hover:scale-110 z-20"
                aria-label="Previous">
                ‹
            </button>
            <!-- TRACK -->
            <div class="flex-1 overflow-hidden">
                <div ref="track" class="flex" :style="isSingleProduct ? {} : {
                    transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                    transition: transitioning ? 'transform 0.65s ease' : 'none',
                }" @transitionend="onTransitionEnd">
                    <div v-for="(item, idx) in displayProducts" :key="`slide-${idx}-${item?.id ?? idx}`"
                        class="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 sm:p-4">
                        <div @click="openModal(item)"
                            class="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col h-[400px]">
                            <!-- Product Image -->
                            <div class="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                                <img :src="item.image" :alt="item.name"
                                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                                <span v-if="item.deal"
                                    class="absolute top-3 left-3 bg-[#FA812F] text-[#FEF3E2] text-xs font-semibold px-3 py-1 rounded-full shadow">
                                    {{ item.deal }}
                                </span>
                            </div>

                            <!-- Product Info -->
                            <div class="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 class="font-semibold text-gray-900 text-base leading-snug line-clamp-2 mb-1"
                                        :title="item.name">
                                        {{ item.name }}
                                    </h3>
                                    <p class="text-[#DD0303] font-bold text-lg">
                                        R{{ formatPrice(item.price) }}
                                    </p>
                                </div>

                                <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
                                    <span v-if="item.label"
                                        class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                        {{ item.label }}
                                    </span>
                                    <span v-if="item.size"
                                        class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                                        {{ item.size }}
                                    </span>
                                </div>

                                <div
                                    class="mt-auto flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-2">
                                    <span v-if="item.categoryName" class="italic truncate">
                                        {{ item.categoryName }}
                                    </span>
                                    <span
                                        :class="[item.stock > 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium']">
                                        {{ item.stock > 0 ? ` In stock: ${item.stock}` : 'Out of stock' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Button -->
            <button v-if="showButtons && !isSingleProduct" @click="handleNext"
                class="flex flex-shrink-0 items-center justify-center bg-[#FA812F] text-white text-3xl w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hover:bg-[#E36B1C] transition-transform duration-200 hover:scale-110 z-20"
                aria-label="Next">
                ›
            </button>
        </div>
    </section>

    <!-- Product Modal -->
    <Transition name="fade">
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]"
            @click.self="closeModal">
            <div class="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl relative animate-fadeIn">
                <!-- Close Button -->
                <button @click="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition">
                    ✕
                </button>

                <!-- Product Image -->
                <div class="w-full aspect-square overflow-hidden rounded-lg mb-4">
                    <img :src="selectedProduct?.image" :alt="selectedProduct?.name"
                        class="w-full h-full object-cover" />
                </div>

                <!-- Product Info -->
                <h2 class="text-2xl font-bold text-[#FA812F] mb-2">
                    {{ selectedProduct?.name }}
                </h2>
                <p class="text-[#DD0303] font-semibold text-lg mb-2">
                    R{{ formatPrice(selectedProduct?.price) }}
                </p>

                <div class="text-gray-700 space-y-1">
                    <p><strong>Label:</strong> {{ selectedProduct?.label || '—' }}</p>
                    <p><strong>Deal:</strong> {{ selectedProduct?.deal || '—' }}</p>
                    <p><strong>Size:</strong> {{ selectedProduct?.size || '—' }}</p>
                    <p>
                        <strong>Status:</strong>
                        <span :class="selectedProduct?.stock > 0 ? 'text-green-600' : 'text-red-500'">
                            {{ selectedProduct?.stock > 0 ? ' In Stock' : 'Out of Stock' }}
                        </span>
                    </p>
                    <p><strong>Category:</strong> {{ selectedProduct?.categoryName || '—' }}</p>

                    <p class="pt-2 text-sm text-gray-600 leading-snug">
                        {{ selectedProduct?.description || 'No description available.' }}
                    </p>
                </div>

                <!-- Close Button (bottom) -->
                <div class="mt-6 text-right">
                    <button @click="closeModal"
                        class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg shadow-md transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { fetchFromApi } from '@/utils/api'

// DATA
const products = ref([])
const visibleCards = ref(4)
const currentIndex = ref(0)
const transitioning = ref(true)
let autoSlideTimer = null

// MODAL STATE
const showModal = ref(false)
const selectedProduct = ref(null)
const openModal = (product) => {
    selectedProduct.value = product
    showModal.value = true
}
const closeModal = () => (showModal.value = false)

// RESPONSIVE SETTINGS
const updateVisibleCards = () => {
    const w = window.innerWidth
    if (w >= 1024) visibleCards.value = 4
    else if (w >= 768) visibleCards.value = 3
    else if (w >= 640) visibleCards.value = 2
    else visibleCards.value = 1
}

const clonesCount = computed(() => Math.max(1, visibleCards.value))
const displayProducts = computed(() => {
    if (!products.value.length) return []
    if (isSingleProduct.value) return products.value

    const first = products.value.slice(0, clonesCount.value)
    const last = products.value.slice(-clonesCount.value)
    return [...last, ...products.value, ...first]
})

const resetIndexToStart = () => {
    currentIndex.value = clonesCount.value
}

const fetchSpotlightProducts = async () => {
    try {
        const res = await fetchFromApi('products?spotlight=true')
        products.value = Array.isArray(res) ? res : []
        await nextTick()
        resetIndexToStart()
    } catch (err) {
        console.error('fetch spotlight', err)
    }
}

// HANDLE SINGLE PRODUCT CASE
const isSingleProduct = computed(() => products.value.length <= 1)

// SLIDER LOGIC
const nextSlide = () => {
    transitioning.value = true
    currentIndex.value += 1
}
const prevSlide = () => {
    transitioning.value = true
    currentIndex.value -= 1
}
const onTransitionEnd = () => {
    const realCount = products.value.length
    if (!realCount) return
    if (currentIndex.value >= realCount + clonesCount.value) {
        transitioning.value = false
        currentIndex.value = clonesCount.value
        requestAnimationFrame(() => {
            const _ = document.body.offsetHeight
            transitioning.value = true
        })
    }
    if (currentIndex.value < clonesCount.value) {
        transitioning.value = false
        currentIndex.value = realCount + clonesCount.value - 1
        requestAnimationFrame(() => {
            const _ = document.body.offsetHeight
            transitioning.value = true
        })
    }
}

// AUTO SLIDE
const startAutoSlide = () => {
    clearInterval(autoSlideTimer)
    autoSlideTimer = setInterval(nextSlide, 5000)
}
const resetAutoSlide = () => {
    clearInterval(autoSlideTimer)
    startAutoSlide()
}
const handleNext = () => {
    nextSlide()
    resetAutoSlide()
}
const handlePrev = () => {
    prevSlide()
    resetAutoSlide()
}

// SHOW BUTTONS CONDITIONALLY
const showButtons = computed(() => {
    if (!products.value.length) return false
    if (window.innerWidth >= 1024) return products.value.length > 4
    if (window.innerWidth >= 768) return products.value.length > 3
    if (window.innerWidth >= 640) return products.value.length > 2
    return products.value.length > 1
})

// HANDLE RESIZE
const handleResize = () => {
    updateVisibleCards()
    transitioning.value = false
    currentIndex.value = clonesCount.value
    requestAnimationFrame(() => {
        const _ = document.body.offsetHeight
        transitioning.value = true
    })
}

onMounted(async () => {
    updateVisibleCards()
    window.addEventListener('resize', handleResize)
    await fetchSpotlightProducts()
    startAutoSlide()
})

onBeforeUnmount(() => {
    clearInterval(autoSlideTimer)
    window.removeEventListener('resize', handleResize)
})

function formatPrice(value) {
    if (value == null || isNaN(value)) return '0.00'
    return Number(value).toFixed(2)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes fadeIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-fadeIn {
    animation: fadeIn 0.25s ease-out;
}
</style>
