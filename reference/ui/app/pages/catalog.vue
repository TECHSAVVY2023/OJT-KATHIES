<template>
    <Navbar />
    <div class="min-h-screen flex flex-col">
        <!-- Main content -->
        <div class="flex-1 bg-gradient-to-b from-[#FEF3E2] via-[#FFF7E9] to-[#FEF3E2]">
            <!-- Decorative top band -->
            <div class="bg-gradient-to-br from-[#FAB12F]/75 via-[#DB0000]/75 to-[#FA812F]/75 h-20"></div>
            <!-- Main Catalog Content -->
            <section class="flex-1">
                <!-- Content + Sidebar Wrapper (SINGLE width controller) -->
                <div class="relative mx-auto px-4 md:px-20 lg:px-40 pt-8 pb-20 flex gap-8">

                    <!-- Sidebar -->
                    <aside class="hidden xl:block w-64 self-start sticky top-28" aria-label="Category filter">
                        <div class="bg-white/80 backdrop-blur rounded-2xl shadow border border-[#010024]/10 p-4">
                            <div class="flex items-center justify-between mb-2">
                                <h2 class="font-semibold text-[#010024] text-sm">Categories</h2>
                                <button v-if="activeCategory" class="text-xs text-[#DD0303] hover:underline"
                                    @click="clearCategory()">
                                    Clear
                                </button>
                            </div>

                            <ul class="space-y-1 max-h-[60vh] overflow-auto pr-1">
                                <li>
                                    <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FFF7E9] transition"
                                        :class="!activeCategory
                                            ? 'bg-[#FFF7E9] font-semibold text-[#010024]'
                                            : 'text-[#010024]/80'" @click="setCategory(null)">
                                        All
                                    </button>
                                </li>

                                <li v-for="cat in categories" :key="cat.id">
                                    <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FFF7E9] transition"
                                        :class="activeCategory === cat.name
                                            ? 'bg-[#FFF7E9] font-semibold text-[#010024]'
                                            : 'text-[#010024]/80'" @click="toggleCategory(cat.name)">
                                        {{ cat.name }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <div class="flex-1 min-w-0">
                        <!-- Title + Search -->
                        <div class="mb-6">
                            <h1 class="text-2xl md:text-3xl font-bold text-[#010024]">
                                Products Catalog
                            </h1>
                            <p class="text-sm md:text-base text-[#010024]/70 mt-1">
                                Browse all our tasty finds. Filter by category or search.
                            </p>

                            <div class="mt-4 relative">
                                <input v-model="search" type="text" placeholder="Search products or categories…"
                                    class="w-full rounded-xl border border-[#010024]/15 bg-white/80 backdrop-blur px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#FA812F] placeholder:text-[#010024]/40" />
                                <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#010024]/50"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="m21 21-4.3-4.3M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                        </div>

                        <!-- Mobile category slider -->
                        <div class="xl:hidden mb-4 relative">
                            <!-- Base underline -->
                            <div class="absolute bottom-0 left-0 right-0 h-px bg-[#010024]/30"></div>

                            <!-- Scrollable categories -->
                            <div class="flex gap-6 overflow-x-auto pb-3
                                text-sm font-medium
                                text-[#010024]/50
                                modern-scrollbar">
                                <!-- All -->
                                <button class="relative whitespace-nowrap transition-colors" :class="!activeCategory
                                    ? 'text-[#010024]'
                                    : 'hover:text-[#010024]/80'" @click="setCategory(null)">
                                    All
                                    <span v-if="!activeCategory"
                                        class="absolute -bottom-1 left-0 h-0.5 w-full bg-[#010024]"></span>
                                </button>

                                <!-- Categories -->
                                <button v-for="cat in categories" :key="cat.id"
                                    class="relative whitespace-nowrap transition-colors" :class="activeCategory === cat.name
                                        ? 'text-[#010024]'
                                        : 'hover:text-[#010024]/80'" @click="toggleCategory(cat.name)">
                                    {{ cat.name }}
                                    <span v-if="activeCategory === cat.name"
                                        class="absolute -bottom-1 left-0 h-0.5 w-full bg-[#010024]"></span>
                                </button>
                            </div>
                        </div>

                        <!-- States -->
                        <div v-if="loading" class="text-[#010024]/70">
                            Loading products…
                        </div>
                        <div v-else-if="error" class="text-[#DD0303]">
                            Failed to load products: {{ error }}
                        </div>

                        <!-- Empty state -->
                        <div v-else-if="filteredProducts.length === 0"
                            class="min-h-[40vh] md:min-h-[50vh] flex items-center justify-center text-[#010024]/70">
                            No products match your filters.
                        </div>

                        <!-- Product Grid -->
                        <!-- Product Cards Grid -->
                        <div v-else
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8">
                            <article v-for="p in filteredProducts" :key="p.id" @click="openModal(p)"
                                class="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden">
                                <!-- Product Image -->
                                <div class="aspect-[4/3] overflow-hidden bg-gray-50">
                                    <img :src="p.image || placeholderImg" :alt="p.name"
                                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                                </div>

                                <!-- Product Info -->
                                <div class="p-4 flex flex-col justify-between h-[200px]">
                                    <!-- Product Name & Price -->
                                    <div>
                                        <h3 class="font-semibold text-gray-900 text-base leading-snug line-clamp-2 mb-1"
                                            :title="p.name">
                                            {{ p.name }}
                                        </h3>
                                        <p class="text-[#DD0303] font-bold text-lg">
                                            R{{ formatPrice(p.price) }}
                                        </p>
                                    </div>

                                    <!-- Labels / Deals / Size -->
                                    <div class="mt-3 flex flex-wrap items-center gap-2 text-xs">
                                        <span v-if="p.label"
                                            class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                            {{ p.label }}
                                        </span>
                                        <span v-if="p.deal"
                                            class="px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100 font-medium">
                                            {{ p.deal }}
                                        </span>
                                        <span v-if="p.size"
                                            class="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                                            {{ p.size }}
                                        </span>
                                    </div>

                                    <!-- Category & Stock -->
                                    <div
                                        class="mt-auto flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-2">
                                        <span v-if="p.categoryName" class="italic truncate">
                                            {{ p.categoryName }}
                                        </span>
                                        <span :class="[
                                            p.stock > 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium',
                                        ]">
                                            {{ p.stock > 0 ? `In stock: ${p.stock}` : 'Out of stock' }}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Scroll to Top -->
        <button v-show="showToTop" @click="scrollTop"
            class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 rounded-full shadow-lg bg-[#010024] text-[#FEF3E2] p-3 hover:bg-[#272760] transition"
            aria-label="Back to top">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
            </svg>
        </button>

        <!-- Product Modal -->
        <transition name="fade">
            <div v-if="activeProduct" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                role="dialog" aria-modal="true" @click.self="closeModal">

                <div
                    class="bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-[#010024]/10">

                    <!-- === MOBILE VIEW === -->
                    <div class="md:hidden p-4 space-y-5">
                        <div class="flex gap-4">
                            <!-- Image -->
                            <div
                                class="w-1/2 bg-[#FFF7E9] p-2 rounded-xl border border-[#010024]/10 flex items-center justify-center">
                                <img :src="activeProduct.image || placeholderImg" :alt="activeProduct.name"
                                    class="w-full h-40 object-cover rounded-lg" />
                            </div>

                            <!-- Summary -->
                            <div class="w-1/2 flex flex-col justify-between">
                                <div>
                                    <div class="flex items-start justify-between gap-3">
                                        <h3 class="text-base font-bold text-[#010024] leading-snug line-clamp-2">
                                            {{ activeProduct.name }}
                                        </h3>
                                        <button @click="closeModal"
                                            class="text-[#010024]/60 hover:text-[#010024] text-lg"
                                            aria-label="Close">✕</button>
                                    </div>

                                    <!-- Price + Availability -->
                                    <div class="mt-1 flex items-center gap-2">
                                        <p class="text-xl font-extrabold text-[#DD0303] tracking-tight">
                                            R{{ formatPrice(activeProduct.price) }}
                                        </p>
                                        <span v-if="activeProduct.stock > 0"
                                            class="text-green-600 text-xs font-medium">Available</span>
                                        <span v-else class="text-red-600 text-xs font-medium">Out of Stock</span>
                                    </div>
                                </div>

                                <!-- Tags -->
                                <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                    <span v-if="activeProduct.label"
                                        class="px-2 py-0.5 rounded-full bg-[#010024]/10 text-[#010024] font-medium">
                                        {{ activeProduct.label }}
                                    </span>
                                    <span v-if="activeProduct.size"
                                        class="px-2 py-0.5 rounded-full bg-[#010024]/5 text-[#010024]/80">
                                        Size: {{ activeProduct.size }}
                                    </span>
                                    <span v-if="activeProduct.categoryName"
                                        class="px-2 py-0.5 rounded-full bg-[#FEF3E2] border border-[#010024]/10 text-[#010024]/90">
                                        {{ activeProduct.categoryName }}
                                    </span>
                                    <span v-if="activeProduct.deal"
                                        class="px-2 py-0.5 rounded-full bg-[#DD0303]/10 text-[#DD0303] font-semibold">
                                        {{ activeProduct.deal }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="mt-4">
                            <h4 class="text-sm font-semibold uppercase tracking-wide text-[#010024]/70">Description</h4>
                            <p class="mt-2 text-sm text-[#010024]/80 leading-relaxed">
                                {{ activeProduct.description || "No description available for this product." }}
                            </p>
                        </div>

                        <!-- Info Grid -->
                        <div class="grid grid-cols-2 gap-2 mt-4 text-sm">
                            <div class="rounded-xl border border-[#010024]/10 bg-[#FFF7E9]/60 p-3">
                                <p class="text-[#010024]/60">Stock Quantity</p>
                                <p class="font-semibold text-[#010024]">{{ activeProduct.stock }}</p>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="mt-5 flex flex-wrap gap-3">
                            <button
                                class="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FAB12F] via-[#FA812F] to-[#DD0303] text-white font-semibold hover:opacity-95 transition"
                                @click="openOrderNow()" :disabled="activeProduct.stock <= 0">
                                Order Now
                            </button>
                            <button
                                class="px-5 py-2.5 rounded-lg border border-[#010024]/20 text-[#010024] hover:bg-[#FEF3E2] transition"
                                @click="closeModal">
                                Close
                            </button>
                        </div>
                    </div>
                    <!-- === /MOBILE VIEW === -->

                    <!-- === DESKTOP VIEW === -->
                    <div class="hidden md:grid md:grid-cols-2">
                        <!-- Left: Image -->
                        <div class="bg-[#FFF7E9] p-6 flex items-center justify-center">
                            <img :src="activeProduct.image || placeholderImg" :alt="activeProduct.name"
                                class="w-full h-[420px] object-cover rounded-xl border border-[#010024]/10" />
                        </div>

                        <!-- Right: Details -->
                        <div class="p-6 flex flex-col">
                            <div class="flex items-start justify-between">
                                <h3 class="text-2xl font-bold text-[#010024] leading-tight">{{ activeProduct.name }}
                                </h3>
                                <button @click="closeModal"
                                    class="text-[#010024]/60 hover:text-[#010024] text-2xl leading-none"
                                    aria-label="Close">✕</button>
                            </div>

                            <!-- Price + Availability -->
                            <div class="mt-2 flex items-center gap-3">
                                <p class="text-3xl font-extrabold text-[#DD0303]">R{{ formatPrice(activeProduct.price)
                                }}</p>
                                <span v-if="activeProduct.stock > 0"
                                    class="text-green-600 text-sm font-semibold">Available</span>
                                <span v-else class="text-red-600 text-sm font-semibold">Out of Stock</span>
                            </div>

                            <!-- Tags -->
                            <div class="mt-3 flex flex-wrap items-center gap-2 text-sm">
                                <span v-if="activeProduct.label"
                                    class="px-2 py-0.5 rounded-full bg-[#010024]/10 text-[#010024] font-medium">
                                    {{ activeProduct.label }}
                                </span>

                                <span v-if="activeProduct.category?.name"
                                    class="px-2 py-0.5 rounded-full bg-[#FEF3E2] border border-[#010024]/10 text-[#010024]/90">
                                    {{ activeProduct.category.name }}
                                </span>

                                <span v-if="activeProduct.size"
                                    class="px-2 py-0.5 rounded-full bg-[#010024]/5 text-[#010024]/80">
                                    Size: {{ activeProduct.size }}
                                </span>

                                <span v-if="activeProduct.deal"
                                    class="px-2 py-0.5 rounded-full bg-[#DD0303]/10 text-[#DD0303] font-semibold">
                                    {{ activeProduct.deal }}
                                </span>
                            </div>


                            <!-- Info Grid -->
                            <div class="mt-6 grid grid-cols-3 gap-3 text-sm">
                                <div class="rounded-xl border border-[#010024]/10 bg-[#FFF7E9]/60 p-3">
                                    <p class="text-[#010024]/60">Stock</p>
                                    <p class="font-semibold text-[#010024]">{{ activeProduct.stock }}</p>
                                </div>
                                <div v-if="activeProduct.categoryName"
                                    class="rounded-xl border border-[#010024]/10 bg-[#FFF7E9]/60 p-3">
                                    <p class="text-[#010024]/60">Category</p>
                                    <p class="font-semibold text-[#010024]">{{ activeProduct.categoryName }}</p>
                                </div>
                            </div>

                            <!-- Description -->
                            <div class="mt-6 flex-1 overflow-auto pr-1 space-y-2">
                                <h4 class="text-sm font-semibold uppercase tracking-wide text-[#010024]/70">Description
                                </h4>
                                <p class="text-sm text-[#010024]/80 leading-relaxed">
                                    {{ activeProduct.description || "No description available for this product." }}
                                </p>
                            </div>

                            <!-- Actions -->
                            <div class="mt-6 flex flex-wrap gap-3">
                                <button
                                    class="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#FAB12F] via-[#FA812F] to-[#DD0303] text-white font-semibold hover:opacity-95 transition"
                                    @click="openOrderNow()" :disabled="activeProduct.stock <= 0">
                                    Order Now
                                </button>
                                <button
                                    class="px-5 py-2.5 rounded-lg border border-[#010024]/20 text-[#010024] hover:bg-[#FEF3E2] transition"
                                    @click="closeModal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- === /DESKTOP VIEW === -->
                </div>
            </div>
        </transition>


        <Footer />
    </div>
</template>


<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '#imports';
import { useOrder } from '@/composables/useOrder'
import { buildUrl } from '@/utils/api'
import { BASE_ASSETS_URL } from '@/utils/api'


useHead({ title: "Catalog – Kathie's Kitchen" });

const route = useRoute();
const router = useRouter();

const search = ref('');
const categories = ref([]);
const products = ref([]);
const loading = ref(false);
const error = ref(null);
const activeCategory = ref(null);
const { orderOpen } = useOrder()

function openOrderNow() {
    orderOpen.value = true
    closeModal()
}

const showToTop = ref(false);
const activeProduct = ref(null);

const assetURL = BASE_ASSETS_URL;
const placeholderImg = `${assetURL.replace(/\/$/, '')}/images/kathieslogo.png`;


function imgUrl(field) {
    if (!field) return '';
    if (/^https?:\/\//i.test(field)) return field;
    if (field.startsWith('/')) return `${MEDIA_BASE}${field}`;
    return `${MEDIA_BASE}/media/${field}`;
}

async function fetchCategories() {
    const url = buildUrl('categories');
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Categories HTTP ${res.status}`);
    const data = await res.json();
    categories.value = Array.isArray(data) ? data : (data.results || []);
}

async function fetchProducts(params = {}) {
    const url = buildUrl('products', params);
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Products HTTP ${res.status}`);

    const data = await res.json();
    const arr = Array.isArray(data) ? data : (data.results || []);

    products.value = arr.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description || "",
        price: Number(p.price ?? 0),
        stock: Number(p.stock ?? 0),
        image: imgUrl(p.image),
        label: p.label || null,
        deal: p.deal || null,
        size: p.size || null,
        spotlight: p.spotlight || false,
        category: p.category || null,
        categoryName: p.category?.name || null,
        created_at: p.created_at,
        updated_at: p.updated_at,
    }));
}


const filteredProducts = computed(() => {
    const term = search.value.trim().toLowerCase();
    const cat = activeCategory.value;
    return products.value.filter(p => {
        const nameMatch =
            !term ||
            p.name.toLowerCase().includes(term) ||
            (p.categoryName || '').toLowerCase().includes(term);
        const catMatch = !cat || p.categoryName === cat;
        return nameMatch && catMatch;
    });
});

function setCategory(name) {
    activeCategory.value = name;
    const query = { ...route.query };
    if (name) query.category = name; else delete query.category;
    router.replace({ query });
    loadProducts();
}

function toggleCategory(name) {
    if (activeCategory.value === name) clearCategory();
    else setCategory(name);
}

function clearCategory() {
    setCategory(null);
}

function openModal(p) { activeProduct.value = p; }
function closeModal() { activeProduct.value = null; }

function onScroll() { showToTop.value = window.scrollY > 300; }
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

async function loadProducts() {
    loading.value = true; error.value = null;
    try {
        const params = {};
        if (activeCategory.value) params.category = activeCategory.value;
        await fetchProducts(params);
    } catch (e) {
        error.value = e?.message || String(e);
    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    window.addEventListener('scroll', onScroll);
    if (typeof route.query.category === 'string' && route.query.category.trim()) {
        activeCategory.value = route.query.category.trim();
    }
    try { await fetchCategories(); } catch { }
    await loadProducts();
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
});

watch(() => route.query.category, (val) => {
    const next = (typeof val === 'string' && val.trim()) ? val.trim() : null;
    if (next !== activeCategory.value) {
        activeCategory.value = next;
        loadProducts();
    }
});

function formatPrice(n) { return Number(n || 0).toFixed(2); }
</script>

<style scoped>
/* Simple fade for modal */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
