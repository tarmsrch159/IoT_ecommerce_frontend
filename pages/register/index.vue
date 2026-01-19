<template>
    <AppLoading v-if="authStore.isLoading" fullscreen text="กำลังสร้างบัญชี..." />
    <div class="w-full flex justify-center py-10 px-4">
        <div class="w-full max-w-sm
             bg-white dark:bg-dark-900
             border border-gray-200 dark:border-dark-800
             rounded-2xl shadow-lg p-6">
            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-2xl font-bold
                 bg-gradient-to-r from-primary-500 to-purple-600
                 bg-clip-text text-transparent">
                    Create Account
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    สมัครสมาชิกเพื่อใช้งานระบบ
                </p>
            </div>

            <!-- Profile Image -->
            <div class="flex flex-col items-center mb-6">
                <label for="profile" class="relative group cursor-pointer">
                    <!-- Avatar -->
                    <div
                        class="w-24 h-24 rounded-full overflow-hidden
                   bg-gray-100 dark:bg-dark-800
                   border border-gray-300 dark:border-dark-700
                   flex items-center justify-center hover:opacity-90 transition cursor-pointer shadow-glow group-hover:shadow-glow-lg">
                        <img v-if="preview" :src="preview" class="w-full h-full object-cover" />
                        <svg v-else class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                </label>

                <input id="profile" type="file" accept="image/*" class="hidden" @change="handleImage" />
                <br>
                <p class="text-xs text-gray-400 mt-2">
                    รูปโปรไฟล์ (ไม่เกิน 2MB)
                </p>
            </div>

            <!-- Form -->
            <form class="space-y-4" @submit.prevent="handleRegister" method="post">
                <!-- Name -->
                <div>
                    <label class="text-sm font-medium">Name</label>
                    <input v-model="form.name" type="text" required class="mt-1 w-full rounded-xl px-4 py-2.5 text-sm
                   bg-gray-100 dark:bg-dark-800
                   border border-gray-200 dark:border-dark-700
                   focus:ring-2 focus:ring-primary-500/30" />
                </div>

                <!-- Email -->
                <div>
                    <label class="text-sm font-medium">Email</label>
                    <input v-model="form.email" type="email" required class="mt-1 w-full rounded-xl px-4 py-2.5 text-sm
                   bg-gray-100 dark:bg-dark-800
                   border border-gray-200 dark:border-dark-700
                   focus:ring-2 focus:ring-primary-500/30" />
                </div>

                <!-- Password -->
                <div>
                    <label class="text-sm font-medium">Password</label>
                    <input  @keydown.space.prevent v-model="form.password" type="password" minlength="8" required class="mt-1 w-full rounded-xl px-4 py-2.5 text-sm
                   bg-gray-100 dark:bg-dark-800
                   border border-gray-200 dark:border-dark-700
                   focus:ring-2 focus:ring-primary-500/30" />
                </div>

                <!-- Submit -->
                <button type="submit" class="w-full py-2.5 rounded-xl font-medium text-white
                 bg-gradient-to-r from-primary-500 to-purple-600
                 hover:opacity-90 transition">
                    Register
                </button>
            </form>



            <!-- Footer -->
            <p class="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
                มีบัญชีอยู่แล้ว?
                <NuxtLink to="/login" class="text-primary-500 hover:underline font-medium">
                    Login
                </NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { reactive, ref } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import AppLoading from '~/components/ui/AppLoading.vue'
const authStore = useAuthStore()
const toast = useToast()
const form = reactive({
    name: '',
    email: '',
    password: '',
    profile_image: null
})


const preview = ref(null)
const { public: { apiBaseUrl } } = useRuntimeConfig()



const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return

    form.profile_image = file
    preview.value = URL.createObjectURL(file)
}

const handleRegister = async () => {
    try {
        authStore.isLoading = true
        console.log(` apiBaseUrl: ${apiBaseUrl}`)
        const formData = new FormData()
        Object.entries(form).forEach(([k, v]) => v && formData.append(k, v))

        await axios.post(`${apiBaseUrl}/api/user/register`, formData)
        toast.success('สมัครสมาชิกสําเร็จ กำลังพาไปยังหน้าเข้าสู่ระบบ!')
        setTimeout(() => {
            window.location.href = '/login'
        }, 1000);
    } catch (error) {
        toast.error(error.response?.data?.message || 'Register failed!')
        console.error(error)
    } finally {
        authStore.isLoading = false
    }

}

definePageMeta({
    layout: false,
    middleware: ['guest'],
})
</script>
