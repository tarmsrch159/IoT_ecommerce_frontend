<template>
    <AppLoading v-if="authStore.isLoading" fullscreen text="กำลังเข้าสู่ระบบ..." />
    <div class="h-full flex items-center justify-center px-4 py-10">
        <!-- Card -->
        <div class="w-full max-w-xs sm:max-w-md
             rounded-2xl
             bg-dark-850
             border border-dark-700
             shadow-lg
             px-6 py-6">
            <!-- Logo -->
            <div class="flex flex-col items-center mb-5">
                <div class="w-11 h-11 bg-gradient-to-br
                 from-primary-500 to-purple-600
                 rounded-xl flex items-center justify-center
                 shadow-glow mb-2">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>

                <h1 class="text-lg font-semibold text-white">
                    เข้าสู่ระบบ
                </h1>
                <p class="text-xs text-gray-400 mt-0.5">
                    IoT Shop Management
                </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleLogin" class="space-y-4">
                <!-- Email -->
                <div>
                    <label class="block text-xs font-medium text-gray-400 mb-1">
                        Email
                    </label>
                    <input v-model="form.email" type="email" placeholder="you@example.com" class="w-full rounded-xl px-3 py-2.5 text-sm
                   bg-dark-800
                   border border-dark-700
                   text-white placeholder-gray-500
                   focus:outline-none
                   focus:ring-2 focus:ring-primary-500/30
                   focus:border-primary-500" />
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-xs font-medium text-gray-400 mb-1">
                        Password
                    </label>
                    <input  @keydown.space.prevent v-model="form.password" minlength="8" type="password" placeholder="••••••••" class="w-full rounded-xl px-3 py-2.5 text-sm
                   bg-dark-800
                   border border-dark-700
                   text-white placeholder-gray-500
                   focus:outline-none
                   focus:ring-2 focus:ring-primary-500/30
                   focus:border-primary-500" />
                </div>

                <!-- Remember -->
                <!-- <div class="flex items-center justify-between text-xs">
                    <label class="flex items-center gap-2 text-gray-400">
                        <input type="checkbox" class="rounded border-dark-600 text-primary-500" />
                        Remember me
                    </label>

                    <NuxtLink to="/forgot-password" class="text-primary-400 hover:text-primary-300">
                        ลืมรหัสผ่าน?
                    </NuxtLink>
                </div> -->

                <!-- Button -->
                <button type="submit" class="w-full py-2.5 rounded-xl text-sm font-medium
                 bg-gradient-to-r from-primary-500 to-purple-600
                 text-white
                 shadow-glow
                 hover:shadow-glow-lg
                 transition">
                    Login
                </button>
            </form>

            <!-- Register -->
            <p class="text-center text-xs text-gray-400 mt-5">
                ยังไม่มีบัญชี?
                <NuxtLink to="/register" class="text-primary-400 font-medium hover:underline">
                    สมัครสมาชิก
                </NuxtLink>
            </p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '~/stores/useAuthStore'
import { useRouter } from 'vue-router'
import AppLoading from '~/components/ui/AppLoading.vue'
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const form = reactive({
    email: '',
    password: '',
})
const { public: { apiBaseUrl } } = useRuntimeConfig()

const handleLogin = async () => {
    try {
        authStore.isLoading = true
        const response = await axios.post(`${apiBaseUrl}/api/user/auth`, form)
        if (response.data.error) {
            toast.error(response.data.error)
            return
        } else {
            authStore.isLoggedIn = true
            authStore.user = response.data.user
            authStore.access_token = response.data.access_token
            toast.success("เข้าสู่ระบบสำเร็จ! เรากำลังพาคุณไปยังหน้าหลัก...");
            setTimeout(() => {
                router.push('/')
            }, 1000);
        }

    } catch (error) {
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
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