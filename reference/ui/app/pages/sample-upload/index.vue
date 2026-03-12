<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold mb-6">Sample Upload</h1>
        
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input 
                type="file" 
                @change="handleFileChange" 
                ref="fileInput"
                class="hidden"
                id="file-upload"
            />
            <label 
                for="file-upload" 
                class="cursor-pointer inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
                Choose File
            </label>
            
            <div v-if="selectedFile" class="mt-4">
                <p class="text-gray-700">Selected: <strong>{{ selectedFile.name }}</strong></p>
                <p class="text-sm text-gray-500">Size: {{ formatFileSize(selectedFile.size) }}</p>
            </div>
        </div>

        <button 
            @click="uploadFile" 
            :disabled="!selectedFile || uploading"
            class="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
            {{ uploading ? 'Uploading...' : 'Upload' }}
        </button>

        <div v-if="uploadStatus" class="mt-4 p-4 rounded-lg" :class="uploadStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
            {{ uploadStatus.message }}
        </div>

        <div v-if="uploadedFileUrl" class="mt-4 p-4 bg-blue-50 rounded-lg">
            <p class="font-semibold mb-2">Uploaded File URL:</p>
            <a :href="uploadedFileUrl" target="_blank" class="text-blue-600 hover:underline break-all">
                {{ uploadedFileUrl }}
            </a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const config = useRuntimeConfig()
const selectedFile = ref(null)
const uploading = ref(false)
const uploadStatus = ref(null)
const uploadedFileUrl = ref(null)
const fileInput = ref(null)

// Always use production API - uploads to Digital Ocean Spaces
const API_BASE = 'https://api.kathieskitchen.com/api'

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        selectedFile.value = file
        uploadStatus.value = null
        uploadedFileUrl.value = null
    }
}

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const uploadFile = async () => {
    if (!selectedFile.value) {
        uploadStatus.value = {
            type: 'error',
            message: 'Please select a file first'
        }
        return
    }

    uploading.value = true
    uploadStatus.value = null
    uploadedFileUrl.value = null

    try {
        const formData = new FormData()
        formData.append('file', selectedFile.value)
        formData.append('name', selectedFile.value.name)

        const response = await fetch(`${API_BASE}/upload-sample/upload/`, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Upload failed')
        }

        const data = await response.json()
        
        uploadStatus.value = {
            type: 'success',
            message: 'File uploaded successfully!'
        }
        uploadedFileUrl.value = data.file_url
        
        // Reset the file input
        selectedFile.value = null
        if (fileInput.value) {
            fileInput.value.value = ''
        }

    } catch (error) {
        console.error('Upload error:', error)
        uploadStatus.value = {
            type: 'error',
            message: error.message || 'Failed to upload file. Please try again.'
        }
    } finally {
        uploading.value = false
    }
}
</script>

