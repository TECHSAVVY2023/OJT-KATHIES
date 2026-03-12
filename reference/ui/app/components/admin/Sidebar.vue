<script setup>
import { adminLogout } from '~/composables/useAdminAuth'
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BASE_ASSETS_URL } from '@/utils/api'

//  Define props properly
const props = defineProps({
    active: { type: String, default: 'products' },
    menuItems: { type: Array, default: () => [] } // 👈 Added to remove extraneous prop warning
})

//  Explicitly declare emits
const emit = defineEmits(['navigate', 'logout'])

const router = useRouter()
const isMenuOpen = ref(false)
const dropdownRef = ref(null)

//  Handle navigation cleanly
const handleNavigate = (section) => {
    emit('navigate', section)
    isMenuOpen.value = false
}

//  Handle logout properly
const handleLogout = async () => {
    await adminLogout()
    emit('logout') // 👈 Triggers any parent listener
    router.push('/admin/login')
}

//  Compute button classes
const navClass = (isActive) =>
    [
        'px-4 py-2 rounded-lg text-sm font-medium transition block text-left w-full',
        isActive ? 'bg-[#FA812F] text-white' : 'hover:bg-[#E3D9CB]/40 text-[#010024]'
    ].join(' ')

//  Toggle menu (mobile)
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

//  Close dropdown when clicking outside
const handleClickOutside = (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        isMenuOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>


<template>
    <!--  Desktop Sidebar -->
    <div
        class="hidden md:flex h-full min-w-48 flex-col bg-[#FEF3E2] text-[#010024] min-h-screen drop-shadow-xl pt-5 pb-20">
        <div class="px-4 py-6 flex items-center gap-3 border-b border-[#E3D9CB]/50">
            <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" alt="logo" class="w-10 h-10 rounded-full" />
            <div>
                <div class="font-righteous text-xl">Kathie's Kitchen</div>
                <div class="text-xs text-[#010024]/70">Admin Panel</div>
            </div>
        </div>

        <nav class="flex-1 overflow-auto px-2 py-4">
            <button @click="$emit('navigate', 'orders')" :class="navClass(active === 'orders')" class="mt-2">
                Orders
            </button>

            <button @click="$emit('navigate', 'products')" :class="navClass(active === 'products')">
                Products
            </button>

            <button @click="$emit('navigate', 'subscribers')" :class="navClass(active === 'subscribers')" class="mt-2">
                Subscribers
            </button>

            <button @click="$emit('navigate', 'comingsoon')" :class="navClass(active === 'comingsoon')" class="mt-2">
                Coming Soon
            </button>
        </nav>

        <div class="px-4 py-4 border-t border-[#E3D9CB]/40">
            <button @click="handleLogout"
                class="w-full bg-red-500 hover:bg-black text-white py-2 rounded-lg text-sm font-medium">
                Logout
            </button>
        </div>
    </div>

    <!--  Mobile Navbar -->
    <div
        class="md:hidden fixed top-0 left-0 w-full bg-[#FEF3E2] text-[#010024] flex items-center justify-between px-4 py-3 drop-shadow-md z-50">
        <!-- Burger Icon -->
        <button @click.stop="toggleMenu" class="focus:outline-none" aria-label="Toggle menu">
            <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <!-- Brand -->
        <div class="flex items-center gap-2">
            <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" alt="logo" class="w-8 h-8 rounded-full" />
            <div class="font-righteous text-lg">Kathie's Kitchen</div>
        </div>

        <!-- Logout -->
        <button @click="handleLogout"
            class="bg-red-500 hover:bg-black text-white px-3 py-1 rounded-lg text-sm font-medium">
            Logout
        </button>

        <!-- Floating Dropdown -->
        <Transition name="fade">
            <div v-if="isMenuOpen" ref="dropdownRef"
                class="absolute w-1/2 top-14 left-2 right-2 bg-white rounded-xl shadow-2xl border border-[#E3D9CB]/40 z-50 p-4">
                <nav class="flex flex-col space-y-2">
                    <button @click="$emit('navigate', 'orders'); toggleMenu()" :class="navClass(active === 'orders')">
                        Orders
                    </button>
                    <button @click="$emit('navigate', 'products'); toggleMenu()"
                        :class="navClass(active === 'products')">
                        Products
                    </button>
                    <button @click="$emit('navigate', 'subscribers'); toggleMenu()"
                        :class="navClass(active === 'subscribers')">
                        Subscribers
                    </button>
                    <button @click="$emit('navigate', 'comingsoon'); toggleMenu()"
                        :class="navClass(active === 'comingsoon')">
                        Coming Soon
                    </button>
                </nav>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    @apply transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
    @apply opacity-0;
}
</style>
