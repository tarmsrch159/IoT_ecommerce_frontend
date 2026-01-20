<template>
  <nav
    class="sticky top-0 z-50 bg-white/80 dark:bg-dark-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-dark-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span
            class="text-xl font-bold bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500 bg-clip-text text-transparent">
            IoT Shop
          </span>
        </NuxtLink>

        <!-- Search Bar (Desktop) -->
        <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <div class="relative w-full">
            <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="ค้นหาสินค้า, SKU, หมวดหมู่..."
              class="w-full bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-2.5 pl-11 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors" />
            <svg class="absolute left-3.5 top-3 w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <!-- Quick Search Dropdown -->

            <div v-if="quickSearchStore.results.length > 0" @click.outside="quickSearchStore.clear()" class="absolute z-50 mt-2 w-full bg-white dark:bg-dark-900
         border border-gray-200 dark:border-dark-700
         rounded-xl shadow-xl overflow-hidden">
              <NuxtLink v-for="item in quickSearchStore.results" :key="item.id" :to="`/products/${item.slug}`" class="flex items-center justify-between gap-4
         px-4 py-3 text-sm
         hover:bg-gray-100 dark:hover:bg-dark-800" @click="quickSearchStore.clear()">
                <!-- LEFT : text -->
                <div class="min-w-0">
                  <div class="font-medium text-gray-900 dark:text-white truncate">
                    {{ item.name }}
                  </div>
                  <!-- SKU -->
                  <div class="text-xs text-gray-400">
                    SKU: {{ item.sku }}
                  </div>
                  <div class="text-xs text-gray-500">
                    ฿{{ item.price }}
                  </div>
                </div>

                <!-- RIGHT : image -->
                <img :src="item.thumbnail_api" :alt="item.name"
                  class="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
              </NuxtLink>

              <!-- ดูทั้งหมด -->
              <button class="w-full px-4 py-3 text-sm text-primary-500
           hover:bg-primary-50 dark:hover:bg-dark-800" @click="goToSearch">
                ดูผลลัพธ์ทั้งหมด
              </button>
            </div>
          </div>

        </div>

        <!-- Right Menu -->
        <div class="flex items-center space-x-4">
          <!-- Cart Button -->
          <NuxtLink to="/cart"
            class="relative p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.totalItems > 0"
              class="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-glow">
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>


          <!-- Theme Toggle -->
          <button
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-800 rounded-xl transition-all"
            @click="toggleTheme">
            <svg v-if="colorMode.value === 'dark'" class="w-6 h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Auth -->
          <div class="relative flex items-center" v-if="authStore.isLoggedIn && authStore.user">
            <!-- Profile Button -->
            <button @click="open = !open" class="flex items-center gap-2 p-1 pr-3 rounded-xl
           hover:bg-gray-100 dark:hover:bg-dark-800
           transition">
              <img :src="authStore.user.profile_image || '/avatar.png'" class="w-8 h-8 rounded-full object-cover
             border border-gray-300 dark:border-dark-700" />
              <span class="hidden sm:block text-sm font-medium">
                {{ authStore.user.name }}
              </span>

              <svg class="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown -->
            <div v-show="open" @click.outside="open = false" class="absolute right-0 top-full mt-2 w-48
         bg-white dark:bg-dark-900
         border border-gray-200 dark:border-dark-800
         rounded-xl shadow-xl z-[9999]">
              <NuxtLink to="/profile_info" class="flex items-center gap-2 px-4 py-3 text-sm
             hover:bg-gray-100 dark:hover:bg-dark-800">
                👤 Profile
              </NuxtLink>

              <button @click="logout" class="w-full text-left flex items-center gap-2
             px-4 py-3 text-sm text-red-500
             hover:bg-red-50 dark:hover:bg-red-500/10">
                🚪 Logout
              </button>
            </div>
          </div>

         

          <!-- Guest -->
          <div v-else class="hidden sm:flex items-center space-x-2">
            <NuxtLink to="/login" class="px-4 py-2 text-sm font-medium rounded-xl
           text-gray-700 dark:text-gray-300
           hover:text-primary-500 dark:hover:text-white
           hover:bg-gray-100 dark:hover:bg-dark-800
           transition-all">
              Login
            </NuxtLink>

            <NuxtLink to="/register" class="px-4 py-2 text-sm font-medium rounded-xl
           bg-gradient-to-r from-primary-500 to-purple-600
           text-white shadow-glow
           hover:shadow-glow-lg hover:opacity-90
           transition-all">
              Register
            </NuxtLink>
          </div>

        </div>
      </div>

      <!-- Mobile Search -->
      <div class="md:hidden pb-4">
        <div class="relative">
          <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="ค้นหาสินค้า..."
            class="w-full bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl px-4 py-2.5 pl-11 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors" />
          <svg class="absolute left-3.5 top-3 w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>



    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/useAuthStore'
import { useQuickSearchStore } from '~/stores/useQuickSearchStore'
import { debounce } from 'lodash-es'
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'


const cartStore = useCartStore()
const colorMode = useColorMode()
const router = useRouter()
const route = useRoute()
const quickSearchStore = useQuickSearchStore()
const searchQuery = ref('')

const authStore = useAuthStore()

const open = ref(false)

const handleGoCart = () => {
  quickSearchStore.clear()
}

const doSearch = debounce((value) => {
  quickSearchStore.search(value)
}, 300)

const logout = async () => {
  await authStore.logout()
  open.value = false
  navigateTo('/login')
}

const handleSearch = () => {
  doSearch(searchQuery.value)
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// โหลดตะกร้าอัตโนมัติด้วย persist plugin
onMounted(() => {
  // ไม่ต้องโหลดเองแล้ว
})

const goToSearch = () => {
  router.push(`/products`)
  quickSearchStore.clear()
}

watch(() => route.fullPath, () => {
  quickSearchStore.clear()
})
</script>
