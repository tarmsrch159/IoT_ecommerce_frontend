<template>
  <div>
    <!-- Loading -->
    <AppLoading v-if="productStore.isLoading && productStore.products.length === 0" fullscreen
      text="กำลังโหลดข้อมูล..." />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-dark-900 via-dark-850 to-dark-900 border-b border-dark-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              ร้านค้าอุปกรณ์ IoT
            </span>
          </h1>
          <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            สินค้าและอุปกรณ์ IoT คุณภาพสูง สำหรับนักพัฒนาและผู้สนใจเทคโนโลยี
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/products"
              class="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-glow inline-flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              เริ่มช้อปปิ้ง
            </NuxtLink>
            <NuxtLink to="/products"
              class="bg-dark-800 hover:bg-dark-700 text-white font-semibold px-8 py-4 rounded-xl transition-all inline-flex items-center justify-center gap-2">
              ดูสินค้าทั้งหมด
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-dark-900 border-b border-dark-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-400 mb-2">{{ productStore.products.length }}+</div>
            <div class="text-gray-400">สินค้า</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-emerald-400 mb-2">{{ productStore.categories.length }}</div>
            <div class="text-gray-400">หมวดหมู่</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <div class="text-gray-400">ของแท้</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-pink-400 mb-2">24/7</div>
            <div class="text-gray-400">บริการ</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">สินค้าขายดี</h2>
          <p class="text-gray-400">รายการสินค้ายอดนิยมจากยอดสั่งซื้อ</p>
        </div>
        <NuxtLink to="/products" class="text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-2">
          ดูทั้งหมด
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="product in productStore.recommendedProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="bg-dark-900 border-t border-dark-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-2">หมวดหมู่สินค้า</h2>
          <p class="text-gray-400">เลือกหมวดหมู่ที่คุณสนใจ</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <NuxtLink v-for="category in productStore.categories.filter(c => c.id !== 'all')" :key="category.id"
            :to="`/products?category=${category.id}`"
            class="bg-dark-850 border border-dark-700 rounded-2xl p-6 hover:border-primary-500 hover:shadow-glow transition-all group">
            <div class="text-center">
              <div
                class="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 class="text-white font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                {{ category.name }}
              </h3>
              <p class="text-sm text-gray-400">{{ category.products_count }} สินค้า</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductIoTStore } from '~/stores/useProductIoTStore';
import AppLoading from '~/components/ui/AppLoading.vue';

const productStore = useProductIoTStore()

onMounted(() => {
  productStore.fetchAllProducts()
  productStore.fetchRecommendedProducts()
})
</script>
