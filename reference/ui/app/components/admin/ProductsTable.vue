<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useAdminApi } from '~/composables/adminAPI'
import { useAdminGuard } from '~/composables/useAdminGuard'

// Auth & API setup
const { admin } = useAdminGuard()
const { get, post, put, del } = useAdminApi()
const categories = ref([])

// Reactive state
const products = ref([])
const originalProducts = ref([]) // Keep original order for reset
const searchQuery = ref('')
const selectedProduct = ref(null)
const showModal = ref(false)
const showAddModal = ref(false)
const isEditing = ref(false)

// Fetch products
const loadProducts = async () => {
    try {
        const response = await get('admin-api/products/')
        products.value = response
        originalProducts.value = [...response] // store original order
    } catch (err) {
        console.error('Failed to load products:', err)
        Swal.fire({
            icon: 'error',
            title: 'Failed to load products',
            text: err.message,
        })
    }
}
onMounted(loadProducts)

// Filtering (search)
const filteredProducts = computed(() => {
    const q = searchQuery.value.toLowerCase()
    return sortedProducts.value.filter(
        p =>
            p.name.toLowerCase().includes(q) ||
            (p.label && p.label.toLowerCase().includes(q))
    )
})

// Sorting
const sortKey = ref(null)
const sortDirection = ref(null) // 'asc' | 'desc' | null

const toggleSort = key => {
    if (sortKey.value === key) {
        // Cycle through asc → desc → reset
        if (sortDirection.value === 'asc') sortDirection.value = 'desc'
        else if (sortDirection.value === 'desc') {
            sortKey.value = null
            sortDirection.value = null
        } else sortDirection.value = 'asc'
    } else {
        sortKey.value = key
        sortDirection.value = 'asc'
    }
}

const sortedProducts = computed(() => {
    if (!sortKey.value || !sortDirection.value) return products.value

    return [...products.value].sort((a, b) => {
        let x = a[sortKey.value]
        let y = b[sortKey.value]

        // 🟠 Handle category (since it's an object or ID)
        if (sortKey.value === 'category') {
            x = typeof a.category === 'object'
                ? a.category?.name || ''
                : categories.find(c => c.id === a.category)?.name || ''

            y = typeof b.category === 'object'
                ? b.category?.name || ''
                : categories.find(c => c.id === b.category)?.name || ''
        }

        // Handle null or undefined
        if (x == null || y == null) return 0

        // Compare strings alphabetically
        if (typeof x === 'string' && typeof y === 'string') {
            return sortDirection.value === 'asc'
                ? x.localeCompare(y)
                : y.localeCompare(x)
        }

        // Compare numbers
        if (typeof x === 'number' && typeof y === 'number') {
            return sortDirection.value === 'asc' ? x - y : y - x
        }

        // Fallback to string conversion
        return sortDirection.value === 'asc'
            ? String(x).localeCompare(String(y))
            : String(y).localeCompare(String(x))
    })
})


// Fetch categories
const loadCategories = async () => {
    try {
        const response = await get('admin-api/categories/')
        categories.value = response
    } catch (err) {
        console.error('Failed to load categories:', err)
    }
}

onMounted(() => {
    loadCategories()
})


// Add product
const newProduct = ref({
    name: '',
    label: '',
    description: '',
    price: '',
    deal: '',
    size: '',
    stock: 0,
    spotlight: false,
    category: null,
    image: null,
})

const resetNewProduct = () => {
    Object.assign(newProduct.value, {
        name: '',
        label: '',
        description: '',
        price: '',
        deal: '',
        size: '',
        stock: 0,
        spotlight: false,
        category: null,
        image: null,
    })
}

const addProduct = async () => {
    try {
        const formData = new FormData()
        for (const [key, value] of Object.entries(newProduct.value)) {
            if (key === 'image') continue
            if (key === 'category' && value) {
                const categoryId = typeof value === 'object' ? value.id : value
                formData.append('category_id', categoryId)
            } else if (value !== null && value !== undefined) {
                formData.append(key, value)
            }
        }

        if (newProduct.value.image instanceof File) {
            formData.append('image', newProduct.value.image)
        }

        await post('admin-api/products/', formData)
        resetNewProduct()
        showAddModal.value = false
        await loadProducts()
        Swal.fire({
            icon: 'success',
            title: 'Product added successfully!',
            showConfirmButton: false,
            timer: 1500,
        })
    } catch (err) {
        console.error('Failed to add product:', err)
        Swal.fire({
            icon: 'error',
            title: 'Failed to add product',
            text: err.message,
        })
    }
}


// Edit product
const editProduct = async () => {
    const confirmEdit = await Swal.fire({
        title: 'Save changes?',
        text: 'Do you want to update this product?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, save it!',
        cancelButtonText: 'Cancel',
    })
    if (!confirmEdit.isConfirmed) return

    try {
        const product = selectedProduct.value
        const formData = new FormData()

        formData.append('name', product.name || '')
        formData.append('label', product.label || '')
        formData.append('description', product.description || '')
        formData.append('price', product.price || '')
        formData.append('deal', product.deal || '')
        formData.append('size', product.size || '')
        formData.append('stock', product.stock || 0)
        formData.append('spotlight', product.spotlight ? 'true' : 'false')

        if (product.category) {
            const categoryId = typeof product.category === 'object'
                ? product.category.id
                : product.category
            formData.append('category_id', categoryId)
        }
        if (product.image instanceof File) formData.append('image', product.image)

        await put(`admin-api/products/${product.id}/`, formData)
        isEditing.value = false
        showModal.value = false
        await loadProducts()

        Swal.fire({
            icon: 'success',
            title: 'Product updated successfully!',
            showConfirmButton: false,
            timer: 1500,
        })
    } catch (err) {
        console.error('Failed to update product:', err)
        Swal.fire({
            icon: 'error',
            title: 'Update failed',
            text: err.message || 'Please check your input.',
        })
    }
}

// Delete product
const deleteProduct = async () => {
    const confirmDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'This product will be permanently deleted.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    })
    if (!confirmDelete.isConfirmed) return

    try {
        await del(`admin-api/products/${selectedProduct.value.id}/`)
        showModal.value = false
        await loadProducts()
        Swal.fire({
            icon: 'success',
            title: 'Product deleted successfully!',
            showConfirmButton: false,
            timer: 1500,
        })
    } catch (err) {
        console.error('Failed to delete product:', err)
        Swal.fire({
            icon: 'error',
            title: 'Failed to delete product',
            text: err.message,
        })
    }
}

// Open modal
const openProductModal = (product) => {
    selectedProduct.value = { ...product }
    if (selectedProduct.value.category && typeof selectedProduct.value.category === 'object') {
        selectedProduct.value.category = selectedProduct.value.category.id
    }
    isEditing.value = false
    showModal.value = true
}

const MAX_IMAGE_SIZE = 900 * 1024;

const validateNewImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
        Swal.fire({
            icon: "error",
            title: "Image Too Large",
            text: "Maximum allowed size is 900 KB.",
        });
        e.target.value = null;
        newProduct.value.image = null;
        return;
    }

    newProduct.value.image = file;
};

const validateEditImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
        Swal.fire({
            icon: "error",
            title: "Image Too Large",
            text: "Maximum allowed size is 900 KB.",
        });
        e.target.value = null;
        selectedProduct.value.image = null;
        return;
    }

    selectedProduct.value.image = file;
};
</script>

<template>
    <div v-if="admin" class="bg-white shadow-lg rounded-lg p-6">
        <!-- Search + Add -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <input v-model="searchQuery" type="text" placeholder="Search products..."
                class="w-full sm:w-1/3 border border-black/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FA812F] focus:outline-none" />
            <button @click="showAddModal = true"
                class="bg-[#FA812F] hover:bg-[#e8721f] text-white font-medium px-4 py-2 rounded-lg">
                + Add Product
            </button>
        </div>

        <!-- Product Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full text-left border-collapse">
                <thead class="bg-[#E3D9CB] text-[#010024]">
                    <tr>
                        <th class="p-3">Image</th>

                        <th class="p-3 cursor-pointer select-none" @click="toggleSort('name')">
                            Name
                            <span v-if="sortKey === 'name'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>

                        <th class="p-3 hidden sm:table-cell cursor-pointer select-none" @click="toggleSort('label')">
                            Label
                            <span v-if="sortKey === 'label'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>

                        <th class="p-3 hidden md:table-cell cursor-pointer select-none" @click="toggleSort('price')">
                            Price
                            <span v-if="sortKey === 'price'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>

                        <th class="p-3 hidden md:table-cell cursor-pointer select-none" @click="toggleSort('deal')">
                            Deal
                            <span v-if="sortKey === 'deal'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>

                        <th class="p-3 hidden lg:table-cell cursor-pointer select-none" @click="toggleSort('size')">
                            Size
                            <span v-if="sortKey === 'size'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>

                        <th class="p-3 hidden lg:table-cell cursor-pointer select-none" @click="toggleSort('stock')">
                            Stock
                            <span v-if="sortKey === 'stock'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>

                        <th class="p-3 hidden xl:table-cell cursor-pointer select-none"
                            @click="toggleSort('spotlight')">
                            Spotlight
                            <span v-if="sortKey === 'spotlight'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>

                        <th class="p-3 hidden lg:table-cell cursor-pointer select-none" @click="toggleSort('category')">
                            Category
                            <span v-if="sortKey === 'category'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>
                    </tr>
                </thead>


                <tbody>
                    <tr v-for="product in filteredProducts" :key="product.id"
                        class="border-b border-black/20 hover:bg-[#FEF3E2] transition cursor-pointer"
                        @click="openProductModal(product)">
                        <td class="p-3">
                            <img :src="product.image" alt="product" class="w-12 h-12 object-cover rounded" />
                        </td>
                        <td class="p-3 font-medium">{{ product.name }}</td>
                        <td class="p-3 hidden sm:table-cell">{{ product.label || '-' }}</td>
                        <td class="p-3 hidden md:table-cell">R{{ product.price }}</td>
                        <td class="p-3 hidden md:table-cell">{{ product.deal || '-' }}</td>
                        <td class="p-3 hidden lg:table-cell">{{ product.size || '-' }}</td>
                        <td class="p-3 hidden lg:table-cell">{{ product.stock }}</td>
                        <td class="p-3 hidden xl:table-cell">
                            <span class="px-2 py-1 rounded text-xs font-semibold"
                                :class="product.spotlight ? 'bg-[#FAB12F] text-[#010024]' : 'bg-gray-300 text-gray-700'">
                                {{ product.spotlight ? 'Yes' : 'No' }}
                            </span>
                        </td>
                        <td class="p-3 hidden lg:table-cell">{{ product.category?.name || 'Not Assigned' }}</td>

                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Product Modal -->
        <Transition name="fade">
            <div v-if="showModal"
                :class="[
                    'fixed inset-0 flex items-center justify-center z-[1000] transition-colors', isEditing ? 'bg-black/70' : 'bg-black/50']"
                @click.self="!isEditing && (showModal = false)">

                <div class="bg-white rounded-lg p-6 w-full max-w-2xl shadow-2xl mx-10">
                    <!-- Product Details View -->
                    <div v-if="!isEditing" class="space-y-6 text-gray-800">
                        <!-- Top Section -->
                        <div
                            class="flex flex-col sm:flex-row sm:items-start gap-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <!-- Product Image -->
                            <div class="flex-shrink-0">
                                <img :src="selectedProduct.image" alt="Product Image"
                                    class="w-64 h-64 object-cover rounded-2xl shadow-md ring-1 ring-gray-200" />
                            </div>

                            <!-- Product Details (Right Side) -->
                            <div class="flex-1 space-y-5">
                                <!-- Name + Price -->
                                <div class="flex flex-wrap items-center justify-between gap-3">
                                    <h3 class="text-3xl font-semibold text-[#010024]">{{ selectedProduct.name }}</h3>
                                    <p class="text-3xl font-bold text-[#FA812F] whitespace-nowrap">
                                        R{{ selectedProduct.price }}
                                    </p>
                                </div>

                                <!-- Category + Tags -->
                                <div class="flex flex-wrap gap-3">
                                    <span
                                        class="px-3 py-1 bg-[#FA812F]/10 text-[#FA812F] font-medium rounded-full text-sm border border-[#FA812F]/30">
                                        {{
                                            typeof selectedProduct.category === 'object'
                                                ? selectedProduct.category.name
                                                : categories.find(c => c.id === selectedProduct.category)?.name ||
                                                'Uncategorized'
                                        }}
                                    </span>

                                    <span v-if="selectedProduct.spotlight"
                                        class="px-3 py-1 bg-[#FAB12F]/20 text-[#B45309] font-medium rounded-full text-sm border border-[#FAB12F]/40">
                                        🌟 Spotlight
                                    </span>

                                    <span v-if="selectedProduct.deal"
                                        class="px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full text-sm border border-green-200">
                                        Deal: {{ selectedProduct.deal }}
                                    </span>
                                </div>

                                <!-- Info Grid -->
                                <div class="grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm">
                                    <div>
                                        <p class="text-gray-500">Size</p>
                                        <p class="font-medium">{{ selectedProduct.size || 'N/A' }}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">Stock</p>
                                        <p class="font-medium">{{ selectedProduct.stock }}</p>
                                    </div>
                                </div>

                                <!-- Description -->
                                <div>
                                    <p class="text-gray-500 mb-1">Description</p>
                                    <p
                                        class="text-gray-700 text-sm leading-relaxed border border-gray-200 p-3 rounded-lg bg-gray-50">
                                        {{ selectedProduct.description || 'No description provided.' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>




                    <!-- Editable form -->
                    <form v-else @submit.prevent="editProduct" class="space-y-4">
                        <!-- Name -->
                        <div class="floating-group">
                            <input v-model="selectedProduct.name" type="text" id="name" placeholder=" " required
                                class="floating-input" />
                            <label for="name" class="floating-label">Product Name</label>
                        </div>

                        <!-- Label -->
                        <div class="floating-group">
                            <input v-model="selectedProduct.label" type="text" id="label" placeholder=" "
                                class="floating-input" />
                            <label for="label" class="floating-label">Label</label>
                        </div>

                        <!-- Description -->
                        <div class="floating-group">
                            <textarea v-model="selectedProduct.description" id="description" rows="3" placeholder=" "
                                class="floating-input resize-none"></textarea>
                            <label for="description" class="floating-label">Description</label>
                        </div>

                        <!-- Price, Deal, Size, Stock -->
                        <div class="grid grid-cols-2 gap-3">
                            <div class="floating-group">
                                <input v-model="selectedProduct.price" type="number" id="price" placeholder=" " required
                                    class="floating-input" />
                                <label for="price" class="floating-label">Price (ZAR)</label>
                            </div>

                            <div class="floating-group">
                                <input v-model="selectedProduct.deal" type="text" id="deal" placeholder=" "
                                    class="floating-input" />
                                <label for="deal" class="floating-label">Deal</label>
                            </div>

                            <div class="floating-group">
                                <input v-model="selectedProduct.size" type="text" id="size" placeholder=" "
                                    class="floating-input" />
                                <label for="size" class="floating-label">Size</label>
                            </div>

                            <div class="floating-group">
                                <input v-model.number="selectedProduct.stock" type="number" id="stock" placeholder=" "
                                    class="floating-input" />
                                <label for="stock" class="floating-label">Stock</label>
                            </div>
                        </div>

                        <!-- Category (dynamic) -->
                        <div class="floating-group mt-3">
                            <select v-model="selectedProduct.category" id="category" class="floating-input">
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                            <label for="category" class="floating-label">Category</label>
                        </div>

                        <!-- Spotlight toggle -->
                        <div class="flex items-center gap-2 text-sm text-gray-700 mt-2">
                            <input id="spotlight" type="checkbox" v-model="selectedProduct.spotlight"
                                class="h-4 w-4 text-[#FA812F] focus:ring-[#FA812F] border-gray-300 rounded" />
                            <label for="spotlight">Spotlight Product</label>
                        </div>

                        <!-- Image upload -->
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-600 mb-1">Product Image</label>
                            <div class="flex items-center gap-3">
                                <button type="button" @click="$refs.imageInput.click()"
                                    class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg text-sm transition">
                                    Upload Image
                                </button>
                                <span class="text-sm text-gray-600 truncate max-w-[200px]">
                                    {{ selectedProduct.image?.name || 'No file chosen' }}
                                </span>
                            </div>
                            <input ref="imageInput" type="file" accept="image/*" @change="validateEditImage"
                                class="hidden" />
                        </div>
                    </form>

                    <!-- Buttons -->
                    <div class="flex justify-end gap-2 mt-6">
                        <button v-if="!isEditing" @click="deleteProduct"
                            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                            Delete
                        </button>
                        <button v-if="!isEditing" @click="isEditing = true"
                            class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg">
                            Edit
                        </button>

                        <button v-if="isEditing" @click="isEditing = false"
                            class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">
                            Cancel
                        </button>
                        <button v-if="isEditing" @click="editProduct"
                            class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Transition>


        <!-- ADD PRODUCT MODAL -->
        <transition name="fade">
            <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div class="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-2xl mx-4">
                    <h2 class="text-xl font-bold mb-4 text-[#FA812F]">Add Product</h2>

                    <form @submit.prevent="addProduct" class="space-y-4">
                        <!-- Name -->
                        <div class="floating-group">
                            <input v-model="newProduct.name" type="text" id="add-name" placeholder=" " required
                                class="floating-input" />
                            <label for="add-name" class="floating-label">Product Name</label>
                        </div>

                        <!-- Label -->
                        <div class="floating-group">
                            <input v-model="newProduct.label" type="text" id="add-label" placeholder=" "
                                class="floating-input" />
                            <label for="add-label" class="floating-label">Label (Optional)</label>
                        </div>

                        <!-- Description -->
                        <div class="floating-group">
                            <textarea v-model="newProduct.description" id="add-description" rows="3" placeholder=" "
                                required class="floating-input resize-none"></textarea>
                            <label for="add-description" class="floating-label">Description</label>
                        </div>

                        <!-- Price, Deal, Size, Stock -->
                        <div class="grid grid-cols-2 gap-3">
                            <div class="floating-group">
                                <input v-model.number="newProduct.price" type="number" id="add-price" placeholder=" "
                                    required class="floating-input" />
                                <label for="add-price" class="floating-label">Price (ZAR)</label>
                            </div>

                            <div class="floating-group">
                                <input v-model="newProduct.deal" type="text" id="add-deal" placeholder=" "
                                    class="floating-input" />
                                <label for="add-deal" class="floating-label">Deal (Optional)</label>
                            </div>

                            <div class="floating-group">
                                <input v-model="newProduct.size" type="text" id="add-size" placeholder=" " required
                                    class="floating-input" />
                                <label for="add-size" class="floating-label">Size</label>
                            </div>

                            <div class="floating-group">
                                <input v-model.number="newProduct.stock" type="number" id="add-stock" placeholder=" "
                                    class="floating-input" />
                                <label for="add-stock" class="floating-label">Stock</label>
                            </div>
                        </div>

                        <!-- Category (dynamic) -->
                        <div class="floating-group mt-3">
                            <select v-model="newProduct.category" id="add-category" class="floating-input" required>
                                <option disabled value="">Select a category</option>
                                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                            </select>
                            <label for="add-category" class="floating-label">Category</label>
                        </div>

                        <!-- Spotlight toggle -->
                        <div class="flex items-center gap-2 text-sm text-gray-700 mt-2">
                            <input id="add-spotlight" type="checkbox" v-model="newProduct.spotlight"
                                class="h-4 w-4 text-[#FA812F] focus:ring-[#FA812F] border-gray-300 rounded" />
                            <label for="add-spotlight">Spotlight Product</label>
                        </div>

                        <!-- Image upload -->
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-600 mb-1">Product Image</label>
                            <div class="flex items-center gap-3">
                                <button type="button" @click="$refs.addImageInput.click()"
                                    class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg text-sm transition">
                                    Upload Image
                                </button>
                                <span class="text-sm text-gray-600 truncate max-w-[200px]">
                                    {{ newProduct.image?.name || 'No file chosen' }}
                                </span>
                            </div>
                            <input ref="addImageInput" type="file" accept="image/*" required @change="validateNewImage"
                                class="hidden" />
                        </div>

                        <!-- Buttons -->
                        <div class="flex justify-end gap-3 mt-6">
                            <button type="button" @click="showAddModal = false"
                                class="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
                                Cancel
                            </button>
                            <button type="submit"
                                class="px-4 py-2 bg-[#FA812F] text-white rounded-lg hover:bg-[#e8721f]">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>


    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
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
    background: white;
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