<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useAdminApi } from '~/composables/adminAPI'
import { useAdminGuard } from '~/composables/useAdminGuard'

const { admin } = useAdminGuard()
const { get, post, put, del } = useAdminApi()

// State
const items = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const showAddModal = ref(false)
const selectedItem = ref(null)
const isEditing = ref(false)

// Load items
const loadItems = async () => {
    try {
        items.value = await get('admin-api/comingsoon/')
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed to load', text: err.message })
    }
}
onMounted(loadItems)

// Search
const filteredItems = computed(() => {
    const q = searchQuery.value.toLowerCase()
    return sortedItems.value.filter(i => i.name.toLowerCase().includes(q))
})

// Sorting
const sortKey = ref(null)
const sortDirection = ref(null)
const toggleSort = key => {
    if (sortKey.value === key) {
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
const sortedItems = computed(() => {
    if (!sortKey.value || !sortDirection.value) return items.value
    return [...items.value].sort((a, b) => {
        const x = a[sortKey.value]
        const y = b[sortKey.value]
        return typeof x === 'string'
            ? sortDirection.value === 'asc'
                ? x.localeCompare(y)
                : y.localeCompare(x)
            : sortDirection.value === 'asc'
                ? x - y
                : y - x
    })
})

// Add new item
const newItem = ref({ name: '', image: null })
const addItem = async () => {
    try {
        const formData = new FormData()
        formData.append('name', newItem.value.name)
        if (newItem.value.image instanceof File)
            formData.append('image', newItem.value.image)
        await post('admin-api/comingsoon/', formData, true)
        showAddModal.value = false
        newItem.value = { name: '', image: null }
        await loadItems()
        Swal.fire({ icon: 'success', title: 'Added!', timer: 1200, showConfirmButton: false })
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed', text: err.message })
    }
}

// Edit
const editItem = async () => {
    const confirmEdit = await Swal.fire({
        title: 'Save changes?',
        icon: 'question',
        showCancelButton: true,
    })
    if (!confirmEdit.isConfirmed) return

    try {
        const formData = new FormData()
        formData.append('name', selectedItem.value.name)
        if (selectedItem.value.image instanceof File)
            formData.append('image', selectedItem.value.image)
        await put(`admin-api/comingsoon/${selectedItem.value.id}/`, formData, true)
        showModal.value = false
        await loadItems()
        Swal.fire({ icon: 'success', title: 'Updated!', timer: 1200, showConfirmButton: false })
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed', text: err.message })
    }
}

// Delete
const deleteItem = async () => {
    const confirmDelete = await Swal.fire({
        title: 'Delete item?',
        icon: 'warning',
        showCancelButton: true,
    })
    if (!confirmDelete.isConfirmed) return

    try {
        await del(`admin-api/comingsoon/${selectedItem.value.id}/`)
        showModal.value = false
        await loadItems()
        Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1200, showConfirmButton: false })
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed', text: err.message })
    }
}

const openItemModal = (item) => {
    selectedItem.value = { ...item }
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
        newItem.value.image = null;
        return;
    }

    newItem.value.image = file;
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
        selectedItem.value.image = null;
        return;
    }

    selectedItem.value.image = file;
};


</script>

<template>
    <div v-if="admin" class="bg-white shadow-lg rounded-lg p-6">
        <!-- Search + Add -->
        <div class="flex justify-between items-center mb-6 gap-4">
            <input v-model="searchQuery" type="text" placeholder="Search..."
                class="w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FA812F]" />
            <button @click="showAddModal = true"
                class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg">+ Add Item</button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse text-left">
                <thead class="bg-[#E3D9CB] text-[#010024]">
                    <tr>
                        <th class="p-3">Image</th>
                        <th class="p-3 cursor-pointer" @click="toggleSort('name')">
                            Name
                            <span v-if="sortKey === 'name'">
                                {{ sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '' }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredItems" :key="item.id"
                        class="border-b border-gray-200 hover:bg-[#FEF3E2] cursor-pointer" @click="openItemModal(item)">
                        <td class="p-3"><img :src="item.image" alt="" class="w-12 h-12 rounded-lg object-cover" /></td>
                        <td class="p-3 font-medium">{{ item.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modals -->
        <Transition name="fade">
            <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                @click.self="showModal = false">
                <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
                    <h2 class="text-xl font-bold mb-4 text-[#FA812F]">
                        {{ isEditing ? 'Edit Item' : selectedItem.name }}
                    </h2>

                    <div v-if="!isEditing" class="space-y-3 text-gray-700">
                        <img :src="selectedItem.image" class="w-32 h-32 object-cover rounded-lg mb-3" />
                        <p><strong>Name:</strong> {{ selectedItem.name }}</p>
                    </div>

                    <form v-else @submit.prevent="editItem" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-600 mb-1">Name</label>
                            <input v-model="selectedItem.name" type="text"
                                class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FA812F]" required />
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-600 mb-1">Image</label>
                            <button type="button" @click="$refs.imageInput.click()"
                                class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg text-sm">
                                Upload Image
                            </button>
                            <span class="text-sm text-gray-600 ml-2">{{ selectedItem.image?.name || 'No file chosen'
                                }}</span>
                            <input ref="imageInput" type="file" accept="image/*" @change="validateEditImage"
                                class="hidden" />
                        </div>
                    </form>

                    <div class="flex justify-end gap-2 mt-6">
                        <button v-if="!isEditing" @click="deleteItem"
                            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                        <button v-if="!isEditing" @click="isEditing = true"
                            class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg">Edit</button>
                        <button v-if="isEditing" @click="isEditing = false"
                            class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Cancel</button>
                        <button v-if="isEditing" @click="editItem"
                            class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg">Save</button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Add Modal -->
        <Transition name="fade">
            <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
                    <h2 class="text-xl font-bold mb-4 text-[#FA812F]">Add Coming Soon Item</h2>
                    <form @submit.prevent="addItem" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-600 mb-1">Name</label>
                            <input v-model="newItem.name" type="text"
                                class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FA812F]" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-600 mb-1">Image</label>
                            <button type="button" @click="$refs.newImageInput.click()"
                                class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg text-sm">Upload
                                Image</button>
                            <span class="text-sm text-gray-600 ml-2">{{ newItem.image?.name || 'No file chosen'
                                }}</span>
                            <input ref="newImageInput" type="file" accept="image/*" @change="validateNewImage"
                                class="hidden" />
                        </div>
                        <div class="flex justify-end gap-2 mt-6">
                            <button type="button" @click="showAddModal = false"
                                class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Cancel</button>
                            <button type="submit"
                                class="bg-[#FA812F] hover:bg-[#e8721f] text-white px-4 py-2 rounded-lg">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
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
</style>
