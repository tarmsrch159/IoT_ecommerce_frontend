<template>
  <div v-if="product"
    class="bg-white dark:bg-dark-850 border border-gray-200 dark:border-dark-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all hover:shadow-xl dark:hover:shadow-glow group flex flex-col h-full">
    <!-- Product Image -->
    <NuxtLink :to="`/products/${product.id}`"
      class="block relative overflow-hidden aspect-square bg-gray-100 dark:bg-dark-800">
      <img :src="product.thumbnail" :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      <!-- Category Badge -->
      <div class="absolute top-3 left-3">
        <span class="px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-lg">
          {{ product.category.name }}
        </span>
      </div>
      <!-- Stock Badge -->
      <div class="absolute top-3 right-3">
        <span :class="[
          'px-3 py-1 backdrop-blur-sm text-xs font-semibold rounded-lg',
          product.stock > 20 ? 'bg-emerald-500/90 text-white' : 'bg-orange-500/90 text-white'
        ]">
          {{ product.qty > 0 ? `มีสินค้า ${product.qty} ชิ้น` : 'สินค้าหมด' }}
        </span>
      </div>
    </NuxtLink>

    <!-- Product Info -->
    <div class="p-5 flex flex-col flex-1">
      <NuxtLink :to="`/products/${product.id}`" class="mb-2 flex flex-col flex-1">
        <h3
          class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ฿{{ product.price.toLocaleString() }}
          </div>
          <div class="text-xs text-gray-500">
            SKU: {{ product.sku }}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 mt-auto">
        <button v-if="!isInCart" @click="addToCart"
          class="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all hover:shadow-glow flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          เพิ่มลงตะกร้า
        </button>
        <button v-else @click="removeFromCart"
          class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          อยู่ในตะกร้า
        </button>

        <NuxtLink :to="`/products/${product.id}`"
          class="bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-600 dark:text-white p-2.5 rounded-xl transition-all">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useCartStore } from '~/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const isInCart = computed(() => cartStore.isInCart(props.product.id))

const addToCart = () => {
  cartStore.addToCart(props.product)
}

const removeFromCart = () => {
  cartStore.removeFromCart(props.product.id)
}
</script>
