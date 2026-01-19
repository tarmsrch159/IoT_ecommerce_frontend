<template>
  <!-- Loading -->
  <AppLoading v-if="isLoading" fullscreen text="กำลังโหลดรายละเอียดสินค้า..." />
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">สินค้าทั้งหมด</h1>
      <p class="text-gray-400">ค้นหาและเลือกซื้อสินค้า IoT คุณภาพสูง</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Sidebar Filter -->
      <aside class="lg:col-span-1">
        <CategoryFilter v-model="selectedCategory" :categories="productStore.categories" />
      </aside>

      <!-- Products Grid -->
      <div class="lg:col-span-3">
        <!-- Results Header -->
        <div class="bg-dark-850 border border-dark-700 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div class="text-gray-400">
            แสดง <span class="text-white font-semibold">{{ productStore.products.length }}</span> สินค้า
          </div>
          <div class="flex items-center gap-2">
            <span class="text-gray-400 text-sm">เรียงตาม:</span>
            <select v-model="sortBy"
              class="bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary-500">
              <option value="default">ค่าเริ่มต้น</option>
              <option value="price-asc">ราคา: ต่ำ - สูง</option>
              <option value="price-desc">ราคา: สูง - ต่ำ</option>
              <option value="name">ชื่อสินค้า</option>
            </select>
          </div>
        </div>

        <!-- Products Grid -->
        <!-- <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
        </div> -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">ไม่พบสินค้า</h3>
          <p class="text-gray-400 mb-6">ลองค้นหาด้วยคำค้นอื่นหรือเลือกหมวดหมู่อื่น</p>
          <button @click="resetFilters"
            class="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
            รีเซ็ตตัวกรอง
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import { useProductIoTStore } from '~/stores/useProductIoTStore'
import AppLoading from '~/components/ui/AppLoading.vue'

const productStore = useProductIoTStore()
const route = useRoute()

const selectedCategory = ref('all')
const sortBy = ref('default')
const isLoading = computed(() => productStore.isLoading)
// ตรวจสอบ query parameters
onMounted(() => {
  productStore.fetchAllProducts()
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }

})

// กรองสินค้าตามหมวดหมู่และคำค้นหา
const filteredProducts = computed(() => {
  let result = productStore.products

  // Filter by category
  if (selectedCategory.value !== 'all') {
    result = result.filter(
      p => p.category?.slug === selectedCategory.value
    )
  }

  // Filter by search query
  if (route.query.search) {
    result = searchProducts(route.query.search)
  }

  return result
})

// เรียงลำดับสินค้า
const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]

  switch (sortBy.value) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'th'))
    default:
      return sorted
  }
})

const resetFilters = () => {
  selectedCategory.value = 'all'
  sortBy.value = 'default'
}
</script>
