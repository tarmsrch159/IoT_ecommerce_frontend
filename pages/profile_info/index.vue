<template>
    <div class="min-h-screen bg-gray-50 dark:bg-dark-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div class="max-w-5xl mx-auto space-y-8">

            <!-- Header -->
            <div class="text-center animate-fade-in-up">
                <h1
                    class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                    โปรไฟล์ของฉัน
                </h1>
                <p class="mt-3 text-gray-600 dark:text-gray-400 text-lg">
                    จัดการข้อมูลส่วนตัวและรูปภาพโปรไฟล์ของคุณ
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <!-- Left Column: Profile Card & Image Upload -->
                <div class="lg:col-span-1 space-y-6 animate-fade-in-left">
                    <div
                        class="bg-white dark:bg-dark-850 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-dark-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                        <div
                            class="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-primary-500/20 to-purple-600/20 dark:from-primary-500/10 dark:to-purple-600/10">
                        </div>

                        <div class="relative flex flex-col items-center">
                            <!-- Image Container -->
                            <div class="relative w-32 h-32 mb-4 group/image cursor-pointer" @click="triggerFileInput">
                                <div
                                    class="w-full h-full rounded-full p-1 bg-gradient-to-br from-primary-500 to-purple-600 shadow-glow">

                                    <ClientOnly>
                                        <img :src="previewImage || authStore.user?.profile_image" alt="Profile"
                                            class="w-full h-full rounded-full object-cover border-4 border-white dark:border-dark-850" />
                                    </ClientOnly>

                                </div>

                                <!-- Overlay -->
                                <div
                                    class="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>

                            <!-- Hidden File Input -->
                            <input type="file" ref="fileInput" class="hidden" accept="image/*"
                                @change="handleFileChange" />

                            <!-- User Info -->
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white text-center">
                                {{ authStore.user?.name || 'Guest User' }}
                            </h2>
                            <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                                {{ authStore.user?.email }}
                            </p>

                            <div class="w-full pt-4 border-t border-gray-100 dark:border-dark-700">
                                <div class="flex justify-between items-center text-sm mb-2">
                                    <span class="text-gray-500 dark:text-gray-400">สถานะ</span>
                                    <span
                                        class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full font-medium text-xs">
                                        Online
                                    </span>
                                </div>

                            </div>

                            <!-- Upload Button (Show only when image selected) -->
                            <Transition name="fade">
                                <div v-if="selectedFile" class="w-full mt-6 space-y-2">
                                    <button @click="uploadImage" :disabled="uploading"
                                        class="w-full py-2.5 px-4 bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2">
                                        <svg v-if="uploading" class="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        <span v-else>บันทึกรูปโปรไฟล์</span>
                                    </button>
                                    <button @click="cancelUpload"
                                        class="w-full py-2 px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors">
                                        ยกเลิก
                                    </button>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Tabs & Content -->
                <div class="lg:col-span-2 animate-fade-in-right">

                    <!-- Tabs -->
                    <div class="flex space-x-1 bg-gray-100 dark:bg-dark-800 p-1 rounded-xl mb-6">
                        <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value" :class="[
                            'flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200',
                            activeTab === tab.value
                                ? 'bg-white dark:bg-dark-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        ]">
                            {{ tab.label }}
                        </button>
                    </div>

                    <!-- Content -->
                    <Transition name="fade" mode="out-in">

                        <!-- Edit Profile -->
                        <div v-if="activeTab === 'profile'" key="profile">
                            <UpdateProfile title="แก้ไขข้อมูลส่วนตัว" submitText="บันทึกการเปลี่ยนแปลง"
                                @success="handleSuccess" />
                        </div>

                        <!-- Order History -->
                        <div v-else key="orders" class="space-y-4">
                            <AppLoading v-if="loadingOrders" :showSkeleton="false"
                                text="กำลังโหลดข้อมูลคำสั่งซื้อ..." />

                            <div v-else-if="!orders || orders.length === 0"
                                class="bg-white dark:bg-dark-850 rounded-2xl p-10 text-center border border-gray-100 dark:border-dark-700">
                                <div
                                    class="w-16 h-16 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    ยังไม่มีประวัติการสั่งซื้อ</h3>
                                <NuxtLink to="/products" class="text-primary-500 hover:text-primary-600 font-medium">
                                    เริ่มช้อปปิ้งเลย
                                </NuxtLink>
                            </div>

                            <div v-else class="space-y-4">
                                <div v-for="order in orders.slice(0, data.ordersToShow)" :key="order.id"
                                    class="bg-white dark:bg-dark-850 rounded-2xl p-6 border border-gray-100 dark:border-dark-700 hover:shadow-lg transition-shadow">
                                    <!-- Order Header -->
                                    <div
                                        class="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-dark-700">
                                        <div>
                                            <div class="flex items-center gap-3 mb-1">
                                                <span class="text-lg font-bold text-gray-900 dark:text-white">Order #{{
                                                    order.id }}</span>
                                                <span :class="[
                                                    'px-2.5 py-0.5 rounded-full text-xs font-medium',
                                                    order.delivered_at
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                ]">
                                                    {{ order.delivered_at ? 'จัดส่งสำเร็จ' : 'กำลังดำเนินการ' }}
                                                </span>
                                            </div>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                                สั่งซื้อเมื่อ: {{ order.created_at }}
                                            </p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">ยอดรวมทั้งสิ้น</p>
                                            <p class="text-xl font-bold text-primary-600 dark:text-primary-400">฿{{
                                                Number(order.total).toLocaleString() }}</p>
                                        </div>
                                    </div>

                                    <!-- Order Items -->
                                    <div class="space-y-3">
                                        <div v-for="product in order.products" :key="product.id"
                                            class="flex items-center gap-4">
                                            <div
                                                class="w-16 h-16 bg-gray-100 dark:bg-dark-800 rounded-lg overflow-hidden flex-shrink-0">
                                                <!-- Fallback image logic needed if product doesn't have image field standard -->
                                                <img :src="product.thumbnail_api || '/placeholder.png'"
                                                    class="w-full h-full object-cover" />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {{ product.name }}</h4>
                                                <!-- Pivot data usually contains quantity/price at time of order, but lets check how backend sends it. 
                             Assuming simple structure for now or using fetch defaults. 
                             If backend sends pivot, it's usually in product.pivot -->
                                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                                    ราคา: ฿{{ Number(product.price).toLocaleString() }}
                                                    <span v-if="product.pivot?.quantity" class="ml-2">x {{
                                                        product.pivot.quantity }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Footer/Actions -->
                                    <div
                                        class="mt-6 pt-4 border-t border-gray-100 dark:border-dark-700 flex justify-end">
                                        <button
                                            class="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
                                            ดูรายละเอียด
                                        </button>
                                    </div>


                                </div>
                                <button @click="loadMoreOrders"
                                    class="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">
                                    ดูเพิ่มเติม
                                </button>

                            </div>

                        </div>

                    </Transition>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import UpdateProfile from '~/components/profile/UpdateProfile.vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { headersConfig } from '~/configs/apiConfig'
import AppLoading from '~/components/ui/AppLoading.vue'

definePageMeta({
    middleware: ['auth']
})

const authStore = useAuthStore()
const toast = useToast()
const { public: { apiBaseUrl } } = useRuntimeConfig()

// Tabs Configuration
const tabs = [
    { label: 'ข้อมูลส่วนตัว', value: 'profile' },
    { label: 'ประวัติการสั่งซื้อ', value: 'orders' }
]
const activeTab = ref('profile')

// Order Data
const orders = computed(() => authStore.user?.orders || [])
const data = reactive({
    ordersToShow: 5
})
const loadMoreOrders = () => {
    if (data.ordersToShow < orders.value.length) {
        data.ordersToShow += 5
    }
}

const loadingOrders = ref(false)

// Fetch latest user data on mount
onMounted(async () => {
    loadingOrders.value = true
    try {
        const config = headersConfig(authStore.access_token)
        const response = await axios.get(`${apiBaseUrl}/api/user/profile`, config)
        authStore.user = response.data.data

    } catch (e) {
        console.error("Failed to fetch profile", e)
    } finally {
        loadingOrders.value = false
    }
})

/* --- Image Upload Logic --- */
const fileInput = ref(null)
const selectedFile = ref(null)
const previewImage = ref(null)
const uploading = ref(false)

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        if (file.size > 2 * 1024 * 1024) { // 2MB validation
            toast.error("รูปภาพต้องมีขนาดไม่เกิน 2MB")
            return
        }
        selectedFile.value = file
        const reader = new FileReader()
        reader.onload = (e) => {
            previewImage.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const cancelUpload = () => {
    selectedFile.value = null
    previewImage.value = null
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const uploadImage = async () => {
    if (!selectedFile.value) return

    uploading.value = true
    const formData = new FormData()
    formData.append('profile_image', selectedFile.value)

    try {
        const config = headersConfig(authStore.access_token)
        const response = await axios.post(`${apiBaseUrl}/api/user/update/profile`, formData, headersConfig(authStore.access_token, 'multipart/form-data'))

        // Update store with new user data including image
       
        authStore.user = response.data.data
        toast.success("อัพเดทรูปโปรไฟล์เรียบร้อยแล้ว")
        // cancelUpload() // Reset state

    } catch (error) {
        console.error(error)
        toast.error("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ")
    } finally {
        uploading.value = false
    }
}

const handleSuccess = () => {
    // Optional: Scroll to top or show extra message
}
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

.animate-fade-in-left {
    animation: fadeInLeft 0.6s ease-out;
}

.animate-fade-in-right {
    animation: fadeInRight 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
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
