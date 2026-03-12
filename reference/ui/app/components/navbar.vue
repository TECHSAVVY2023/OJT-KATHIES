<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOrder } from '@/composables/useOrder'
import { buildUrl } from '@/utils/api' // adjust if needed
import { BASE_ASSETS_URL } from '@/utils/api'

const router = useRouter()
const categories = ref([])

async function fetchCategories() {
    try {
        const res = await fetch(buildUrl('categories'))
        // console.log('Fetching:', res)
        if (!res.ok) throw new Error(`Categories HTTP ${res.status}`)
        const data = await res.json()
        categories.value = Array.isArray(data) ? data : (data.results || [])
    } catch (err) {
        console.error('Failed to fetch categories:', err)
    }
}

function goToCategory(catName) {
    router.push(`/catalog?category=${encodeURIComponent(catName)}`)
    mobileMenuOpen.value = false
    mobileCategoriesOpen.value = false
    categoriesOpen.value = false
}

onMounted(() => {
    fetchCategories()

    // handle scroll effect
    window.addEventListener('scroll', () => {
        isScrolled.value = window.scrollY > 50
    })
})


const { orderOpen } = useOrder() // << use shared state 
const isScrolled = ref(false);
const categoriesOpen = ref(false);
const cartOpen = ref(false);
const mobileMenuOpen = ref(false);
const mobileCategoriesOpen = ref(false);
const route = useRoute();

// loading & error state for products
const loadingProducts = ref(false);
const productsError = ref(null);

const orderItems = ref([]);

async function fetchProducts({ }) {
    loadingProducts.value = true;
    productsError.value = null;
    try {
        const url = buildUrl("products"); // -> /api/products/?...
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status} @ ${url}`);
        const data = await res.json();

        const items = Array.isArray(data) ? data : (data.results || []);
        console.log(items);
        // Map into your UI shape
        orderItems.value = items.map(p => ({
            id: p.id,
            name: p.name,
            price: Number(p.price ?? 0),
            stock: Number(p.stock ?? 0),
            qty: 0,
            label: p.label || null,          // optional in UI
            deal: p.deal || null,            // optional in UI
            categoryName: p.category?.name || null,
        }));
    } catch (err) {
        productsError.value = err?.message || String(err);
        orderItems.value = [];
    } finally {
        loadingProducts.value = false;
    }
}

const menuRef = ref(null);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

const handleClickOutside = (e) => {
    if (!menuRef.value) return;
    if (mobileMenuOpen.value && !menuRef.value.contains(e.target)) {
        mobileMenuOpen.value = false;
        mobileCategoriesOpen.value = false;
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    // Fetch spotlight products (or pass {} to fetch all)
    fetchProducts({ spotlight: "true" });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("click", handleClickOutside);
});

const increaseQty = (i) => {
    const item = orderItems.value[i];
    if (item.qty < item.stock) item.qty++;
};
const decreaseQty = (i) => {
    const item = orderItems.value[i];
    if (item.qty > 0) item.qty--;
};
const validateQty = (i) => {
    const item = orderItems.value[i];
    if (isNaN(item.qty) || item.qty === null || item.qty === "") item.qty = 0;
    if (item.qty < 0) item.qty = 0;
    if (item.qty > item.stock) item.qty = item.stock;
};

const total = computed(() =>
    orderItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
);

const customer = ref({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: "",
    deliveryDate: "",
});

const confirmOpen = ref(false);

function openConfirmModal() {
    const selected = orderItems.value.filter(i => i.qty > 0)
    if (!selected.length) {
        alert("Please select at least one item.")
        return
    }
    confirmOpen.value = true
}


import Swal from "sweetalert2";
async function submitConfirmedOrder() {
    confirmOpen.value = false;

    try {
        const selected = orderItems.value.filter(i => i.qty > 0);

        if (!selected.length) {
            Swal.fire({
                icon: "warning",
                title: "No Items Selected",
                text: "Please add at least one product before placing your order.",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        const payload = {
            customer: {
                name: customer.value.name,
                email: customer.value.email,
                phone: customer.value.phone,
                address: customer.value.address,
                city: customer.value.city,
                zip: customer.value.zip,
                notes: customer.value.notes,
                delivery_date: customer.value.deliveryDate,
            },
            items: selected.map(i => ({
                product_id: i.id,
                quantity: i.qty,
                price_each: i.price,
            })),
            total_amount: total.value,
        };

        // Show loading (buffering) alert
        Swal.fire({
            title: "Placing your order...",
            text: "Please wait while we process your request.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const res = await fetch(buildUrl("create-order/"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        // Close loading before showing result
        Swal.close();

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            console.error("Server response:", errData);

            Swal.fire({
                icon: "error",
                title: "Order Failed",
                text: errData?.error || "Unable to process your order. Please try again.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const data = await res.json();

        await Swal.fire({
            icon: "success",
            title: "Order Submitted!",
            html: `
                <p>Thank you, <b>${payload.customer.name}</b>! 🎉</p>
                <p>Your order has been received and is now <b>awaiting confirmation</b>.</p>
                <p>A confirmation email has been sent to <b>${payload.customer.email}</b>.</p>
                <p><b>Reference:</b> #${data.order_id || '(pending)'}</p>
                <p><b>Estimated Total:</b> R${(data.total_amount || total.value).toFixed(2)}</p>
                <p class="mt-2 text-gray-500" style="font-size: 0.85rem;">Our team will review your order and contact you shortly for final confirmation and payment details.</p>
            `,
            confirmButtonText: "Got it",
            confirmButtonColor: "#FA812F",
        });


        orderOpen.value = false;
        fetchProducts({});
        window.location.reload();

    } catch (err) {
        console.error("Order error:", err);
        Swal.close(); // ensure loading closes if something fails

        Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text: "Failed to place your order. Please try again later.",
            confirmButtonColor: "#d33",
        });
    }
}

</script>

<template>
    <header :class="[
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-5',
        isScrolled ? 'bg-[#FEF3E2] shadow-md' : 'bg-transparent'
    ]">
        <nav class="flex items-center justify-between px-2 lg:px-12 py-4">
            <!-- Logo + Brand -->
            <NuxtLink to="/" class="flex items-center gap-3">
                <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" alt="Kathie’s Kitchen Logo"
                    class="w-12 h-12 rounded-full object-cover" />
                <h2 :class="[
                    'font-kaushan text-2xl tracking-tight transition-colors duration-300 invisible sm:visible',
                    isScrolled ? 'text-[#010024]' : 'text-[#FEF3E2]'
                ]">
                    Kathie’s Kitchen
                </h2>
            </NuxtLink>

            <!-- Links (Desktop) -->
            <ul class="hidden md:flex space-x-8 font-medium transition-colors duration-300"
                :class="isScrolled ? 'text-[#010024]' : 'text-[#FEF3E2]'">
                <li>
                    <NuxtLink to="/" :class="[
                        'hover:underline hover:underline-offset-8',
                        route.path === '/' ? 'font-bold underline underline-offset-8 text-[#DD0303]' : ''
                    ]">Home</NuxtLink>
                </li>

                <!-- Product Catalog Desktop -->
                <li class="relative" @mouseenter="categoriesOpen = true" @mouseleave="categoriesOpen = false">
                    <NuxtLink to="/catalog">
                        <button class="flex items-center gap-1 focus:outline-none">
                            Product Catalog
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-200"
                                :class="{ 'rotate-180': categoriesOpen }" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </NuxtLink>

                    <transition name="fade">
                        <ul v-if="categoriesOpen"
                            class="absolute top-full left-0 mt-2 w-48 bg-[#FEF3E2] text-[#010024] shadow-lg rounded-lg py-2">
                            <li v-for="cat in categories" :key="cat.id" @click="goToCategory(cat.name)"
                                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                {{ cat.name }}
                            </li>
                        </ul>
                    </transition>
                </li>

                <li>
                    <NuxtLink to="/about" class="hover:underline hover:underline-offset-8">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" class="hover:underline hover:underline-offset-8">Contact Us</NuxtLink>
                </li>
            </ul>

            <!-- Right side -->
            <div class="flex items-center gap-4">
                <button @click.stop="mobileMenuOpen = !mobileMenuOpen" class="md:hidden focus:outline-none"
                    :class="isScrolled ? 'text-[#010024]' : 'text-[#FEF3E2]'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <!-- Order Now -->
                <button @click="orderOpen = true" :class="[
                    'px-4 py-2 rounded-lg font-semibold transition outline-1',
                    isScrolled
                        ? 'bg-gradient-to-br from-[#FAB12F] to-[#DB0000] text-[#FEF3E2]'
                        : 'bg-transparent text-[#FEF3E2] outline-[#FEF3E2]'
                ]">
                    Order Now
                </button>
            </div>
        </nav>

        <!-- Mobile Dropdown Menu -->
        <transition name="fade">
            <ul v-if="mobileMenuOpen"
                class="absolute top-full right-0 mt-2 w-1/2 bg-[#FEF3E2] text-[#010024] shadow-lg rounded-lg py-4 px-6 space-y-4 md:hidden z-50">
                <li>
                    <NuxtLink to="/" @click="mobileMenuOpen = false" class="block hover:underline">Home</NuxtLink>
                </li>

                <!-- Expandable Categories -->
                <li>
                    <button @click="mobileCategoriesOpen = !mobileCategoriesOpen"
                        class="flex items-center justify-between w-full focus:outline-none">
                        <span>Product Catalog</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-200"
                            :class="{ 'rotate-180': mobileCategoriesOpen }" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <transition name="fade">
                        <ul v-if="mobileCategoriesOpen" class="mt-2 ml-4 space-y-2">
                            <li v-for="cat in categories" :key="cat.id" @click="goToCategory(cat.name)"
                                class="block hover:underline cursor-pointer">
                                {{ cat.name }}
                            </li>
                        </ul>
                    </transition>
                </li>

                <li>
                    <NuxtLink to="/about" @click="mobileMenuOpen = false" class="block hover:underline">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" @click="mobileMenuOpen = false" class="block hover:underline">Contact Us
                    </NuxtLink>
                </li>
            </ul>
        </transition>
    </header>

    <!-- BACKDROP -->
    <transition name="fade">
        <div v-if="cartOpen" class="fixed inset-0 bg-black/50 z-40" @click="cartOpen = false"></div>
    </transition>

    <!-- Order Modal -->
    <transition name="fade">
        <div v-if="orderOpen" class="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            @click.self="orderOpen = false">
            <div class="bg-[#FEF3E2] rounded-2xl shadow-2xl w-[90%] max-w-5xl p-8 relative overflow-hidden">
                <!-- Close Button -->
                <button @click="orderOpen = false"
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl">✕</button>

                <!-- Header -->
                <h2 class="text-2xl font-bold text-[#010024] mb-6">🛒 Place Your Order</h2>

                <!-- Two-Column Layout -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-[#010024]">
                    <!-- Left: Product Checklist -->
                    <div class="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                        <h3 class="text-lg font-semibold mb-2">Select Items</h3>

                        <div v-for="(item, i) in orderItems" :key="item.id"
                            class="flex justify-between items-center bg-[#FFF7E9] p-4 rounded-xl shadow-sm border border-[#010024]/10 hover:shadow-md transition">
                            <div>
                                <h4 class="font-medium">{{ item.name }}</h4>
                                <p class="text-sm text-gray-500">R{{ item.price.toFixed(2) }}</p>
                                <p v-if="item.stock === 0" class="text-red-600 text-sm font-semibold mt-1">
                                    Out of Stock
                                </p>
                            </div>

                            <div class="flex items-center gap-2">
                                <!-- Decrease Button -->
                                <button @click="decreaseQty(i)"
                                    class="px-3 py-1 bg-[#010024]/10 rounded-lg hover:bg-[#010024]/20 disabled:opacity-40"
                                    :disabled="item.qty === 0 || item.stock === 0">−</button>

                                <!-- Quantity Input -->
                                <input type="number" v-model.number="item.qty" :max="item.stock" min="0"
                                    @blur="validateQty(i)" @mouseleave="validateQty(i)"
                                    class="w-14 text-center border border-gray-300 rounded-md py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#FA812F]" />

                                <!-- Increase Button -->
                                <button @click="increaseQty(i)"
                                    class="px-3 py-1 bg-[#FA812F] text-white rounded-lg hover:bg-[#fa8d45] disabled:opacity-40"
                                    :disabled="item.qty >= item.stock || item.stock === 0">+</button>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Customer Info + Total Section -->
                    <div class="space-y-6 bg-[#FFF7E9]/60 p-6 rounded-xl shadow-inner">
                        <h3 class="text-lg font-semibold mb-4 text-[#010024]">Customer Details</h3>

                        <form class="space-y-5" @submit.prevent="openConfirmModal">
                            <!-- Full Name -->
                            <div class="floating-group">
                                <input v-model.trim="customer.name" type="text" id="fullName" placeholder=" " required
                                    minlength="2" class="floating-input" />
                                <label for="fullName" class="floating-label">Full Name</label>
                            </div>

                            <!-- Email -->
                            <div class="floating-group">
                                <input v-model.trim="customer.email" type="email" id="email" placeholder=" " required
                                    class="floating-input" />
                                <label for="email" class="floating-label">Email Address</label>
                            </div>

                            <p class="text-xs text-gray-500 italic -mt-3">
                                We'll contact you via this email to confirm your order.
                            </p>

                            <!-- WhatsApp Number -->
                            <div class="floating-group">
                                <input v-model.trim="customer.phone" type="tel" id="phone" placeholder=" "
                                    pattern="^(\+?\d{10,13}|0\d{9})$" class="floating-input" />
                                <label for="phone" class="floating-label">WhatsApp Number (Optional)</label>
                            </div>

                            <!-- Address -->
                            <div class="floating-group">
                                <input v-model.trim="customer.address" type="text" id="address" placeholder=" " required
                                    minlength="5" class="floating-input" />
                                <label for="address" class="floating-label">Street Address / House No.</label>
                            </div>

                            <!-- City and ZIP -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="floating-group">
                                    <input v-model.trim="customer.city" type="text" id="city" placeholder=" " required
                                        class="floating-input" />
                                    <label for="city" class="floating-label">City / Municipality</label>
                                </div>

                                <div class="floating-group">
                                    <input v-model.trim="customer.zip" type="text" id="zip" placeholder=" " required
                                        inputmode="numeric" pattern="^[0-9]{4,6}$" minlength="4" maxlength="6"
                                        class="floating-input" />
                                    <label for="zip" class="floating-label">ZIP / Postal Code</label>
                                </div>
                            </div>

                            <!-- Landmark / Notes -->
                            <div class="floating-group">
                                <textarea v-model.trim="customer.notes" id="notes" rows="2" placeholder=" "
                                    class="floating-input resize-none"></textarea>
                                <label for="notes" class="floating-label">
                                    Landmark / Delivery Instructions (Optional)
                                </label>
                            </div>

                            <!-- Preferred Delivery Date -->
                            <div class="floating-group">
                                <input v-model="customer.deliveryDate" type="date" id="deliveryDate"
                                    :min="new Date().toISOString().split('T')[0]" placeholder=" "
                                    class="floating-input" />
                                <label for="deliveryDate" class="floating-label">
                                    Preferred Delivery Date (Optional)
                                </label>
                            </div>

                            <!-- Total -->
                            <div class="flex justify-between items-center py-3 border-t border-gray-300">
                                <span class="text-lg font-semibold">Total:</span>
                                <span class="text-2xl font-bold text-[#FA812F]">
                                    R{{ total.toFixed(2) }}
                                </span>
                            </div>

                            <p class="text-sm italic text-gray-500 -mt-2">
                                Note: This is not your final total. Shipping fees will be confirmed later in
                                the transaction.
                            </p>

                            <!-- Submit -->
                            <button type="submit" :disabled="loadingProducts" class="w-full bg-[#010024] text-[#FEF3E2] py-3 rounded-lg text-lg font-semibold
           hover:bg-[#272760] transition disabled:opacity-50 disabled:cursor-not-allowed">
                                Place Order
                            </button>
                        </form>

                    </div>


                </div>
            </div>
        </div>
    </transition>

    <!-- 🔹 Confirmation Modal -->
    <transition name="fade">
        <div v-if="confirmOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]"
            @click.self="confirmOpen = false">
            <div class="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
                <h3 class="text-xl font-bold mb-4 text-[#010024]">Confirm Your Order</h3>

                <div class="max-h-60 overflow-y-auto border rounded-md p-3 bg-[#FFF7E9]/40 mb-4">
                    <ul class="space-y-2 text-[#010024]">
                        <li v-for="item in orderItems.filter(i => i.qty > 0)" :key="item.id"
                            class="flex justify-between">
                            <span>{{ item.name }} × {{ item.qty }}</span>
                            <span>R{{ (item.price * item.qty).toFixed(2) }}</span>
                        </li>
                    </ul>
                </div>

                <div class="flex justify-between items-center border-t pt-3 text-[#010024]">
                    <span class="font-semibold text-lg">Total:</span>
                    <span class="font-bold text-[#FA812F] text-xl">R{{ total.toFixed(2) }}</span>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                    <button @click="confirmOpen = false"
                        class="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">Cancel</button>
                    <button @click="submitConfirmedOrder"
                        class="px-4 py-2 rounded-md bg-[#FA812F] text-white font-semibold hover:bg-[#fa9833]">
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
/* Dropdown fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Sidebar slide */
.slide-enter-from {
    transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-leave-to {
    transform: translateX(100%);
}

.floating-group {
    position: relative;
}

.floating-input {
    width: 100%;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    padding: 0.75rem 0.75rem 0.25rem;
    outline: none;
    transition: all 0.2s;
}

.floating-input:focus {
    border-color: #FA812F;
    box-shadow: 0 0 0 2px rgba(250, 129, 47, 0.3);
}

.floating-label {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    background: #FEF3E2;
    color: #9ca3af;
    font-size: 0.875rem;
    transition: 0.2s ease;
    pointer-events: none;
}

.floating-input:focus+.floating-label,
.floating-input:not(:placeholder-shown)+.floating-label {
    top: -0.5rem;
    left: 0.6rem;
    font-size: 0.75rem;
    color: #FA812F;
    padding: 0 0.25rem;
}
</style>
