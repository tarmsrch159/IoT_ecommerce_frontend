<template>
  <!-- Loading -->
  <AppLoading v-if="isLoading" fullscreen text="กำลังโหลดรายละเอียดสินค้า..." />


  <!-- Product Detail -->
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm mb-8">
      <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">หน้าแรก</NuxtLink>
      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <NuxtLink to="/products" class="text-gray-400 hover:text-white transition-colors">สินค้าทั้งหมด</NuxtLink>
      <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="text-white">{{ product.name }}</span>
    </nav>

    <!-- Product Detail -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <!-- Product Image -->
      <div class="bg-dark-850 border border-dark-700 rounded-2xl overflow-hidden">
        <img :src="product.thumbnail" :alt="product.name" class="w-full aspect-square object-cover" />
      </div>

      <!-- Product Info -->
      <div>
        <!-- Category Badge -->
        <div class="mb-4">
          <span
            class="px-4 py-2 bg-primary-500/20 text-primary-400 text-sm font-semibold rounded-lg border border-primary-500/30">
            {{ product.category.name }}
          </span>
        </div>

        <!-- Product Name -->
        <h1 class="text-4xl font-bold text-white mb-4">{{ product.name }}</h1>

        <!-- Price -->
        <div class="mb-6">
          <div class="text-4xl font-bold text-emerald-400 mb-2">
            ฿{{ product.price.toLocaleString() }}
          </div>
          <div class="flex items-center gap-4 text-sm">
            <span class="text-gray-400">SKU: {{ product.sku }}</span>
            <span :class="[
              'font-semibold',
              product.qty > 20 ? 'text-emerald-400' : 'text-orange-400'
            ]">
              {{ product.qty > 0 ? `มีสินค้า ${product.qty} ชิ้น` : 'สินค้าหมด' }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-white mb-3">รายละเอียดสินค้า</h3>
          <p class="text-gray-400 leading-relaxed">{{ product.description }}</p>
        </div>

        <!-- Specifications -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-white mb-3">คุณสมบัติ</h3>
          <div class="bg-dark-850 border border-dark-700 rounded-xl p-4">
            {{ product.description }}
            <!-- <ul class="space-y-2">
              <li v-for="(spec, index) in product.specs" :key="index" class="flex items-start gap-2 text-gray-400">
                <svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ spec }}</span>
              </li>
            </ul> -->
          </div>
        </div>

        <!-- Quantity Selector -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-white mb-3">จำนวน</label>
          <div class="flex items-center gap-4">
            <div class="flex items-center bg-dark-850 border border-dark-700 rounded-xl">
              <button @click="decrementQuantity" :disabled="quantity <= 1"
                class="px-4 py-3 text-white hover:bg-dark-800 rounded-l-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <input v-model.number="quantity" type="number" min="1" :max="product.stock"
                class="w-20 text-center bg-transparent border-x border-dark-700 py-3 text-white focus:outline-none" />
              <button @click="incrementQuantity" :disabled="quantity >= product.stock"
                class="px-4 py-3 text-white hover:bg-dark-800 rounded-r-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <span class="text-gray-400 text-sm">สูงสุด {{ product.qty }} ชิ้น</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-4">
          <button v-if="!isInCart" @click="addToCart" :disabled="product.stock === 0"
            class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:shadow-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            เพิ่มลงตะกร้า
          </button>
          <NuxtLink v-else to="/cart"
            class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            ไปที่ตะกร้า
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <section v-if="relatedProducts.length > 0" class="mb-16">
      <h2 class="text-2xl font-bold text-white mb-6">สินค้าที่เกี่ยวข้อง</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :product="relatedProduct" />
      </div>
    </section>

    <section v-else class="mb-16">
      <h2 class="text-2xl font-bold text-white mb-6">สินค้าที่เกี่ยวข้อง</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-gray-400">ไม่มีสินค้าที่เกี่ยวข้องในขณะนี้</div>
      </div>
    </section>

  </div>

  <!-- Product Not Found -->
  <!-- <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <div class="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <h2 class="text-2xl font-bold text-white mb-2">ไม่พบสินค้า</h2>
    <p class="text-gray-400 mb-6">สินค้าที่คุณค้นหาไม่มีในระบบ</p>
    <NuxtLink to="/products"
      class="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all inline-block">
      กลับไปหน้าสินค้า
    </NuxtLink>
  </div> -->
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useProductDetailsStore } from '~/stores/useProductDetailsStore'
import { useProductIoTStore } from '~/stores/useProductIoTStore'
import AppLoading  from '~/components/ui/AppLoading.vue'

const productDetailsStore = useProductDetailsStore()
const route = useRoute()
const cartStore = useCartStore()
const productStore = useProductIoTStore()
const isLoading = computed(() => productDetailsStore.isLoading)


const product = computed(() => productDetailsStore.product)
const productId = computed(() => route.params.id)
const quantity = ref(1)

const isInCart = computed(() => cartStore.isInCart(parseInt(productId.value)))

// สินค้าที่เกี่ยวข้อง (หมวดหมู่เดียวกัน)
const relatedProducts = computed(() => {
  if (!product.value) return []

  return productStore.getByCategory(
    product.value.category.id,
    product.value.id,
    4
  )
})

const incrementQuantity = () => {
  if (quantity.value < product.value.qty) {
    quantity.value++
  }
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(product.value)
  }
}

// Set page title
watchEffect(() => {
  if (product.value) {
    useHead({
      title: `${product.value.name} - IoT Shop`
    })
  }
})
onMounted(async () => {
  productDetailsStore.fetchProduct(route.params.id)
  if (productStore.products.length === 0) {
    await productStore.fetchAllProducts()
  }
})
</script>
