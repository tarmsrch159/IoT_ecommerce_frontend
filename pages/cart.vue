<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <AppLoading v-if="cartStore.isLoading" fullscreen text="กำลังดำเนินการสั่งซื้อ..." />
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">ตะกร้าสินค้า</h1>
      <p class="text-gray-400">จัดการสินค้าในตะกร้าของคุณ</p>
    </div>

    <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-for="item in cartStore.items" :key="item.id"
          class="bg-dark-850 border border-dark-700 rounded-2xl p-6 hover:border-dark-600 transition-all">
          <div class="flex gap-6">
            <!-- Product Image -->
            <NuxtLink :to="`/products/${item.id}`" class="flex-shrink-0">

              <img :src="item.thumbnail" :alt="item.name" class="w-24 h-24 object-cover rounded-xl" />
            </NuxtLink>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1">
                  <NuxtLink :to="`/products/${item.id}`"
                    class="text-lg font-semibold text-white hover:text-primary-400 transition-colors line-clamp-2">
                    {{ item.name }}
                  </NuxtLink>
                  <div class="text-sm text-gray-400 mt-1">
                    หมวดหมู่: {{ item.category.name }}
                  </div>
                  <div class="text-sm text-gray-400 mt-1">
                    SKU: {{ item.sku }}
                  </div>
                </div>
                <button @click="removeItem(item.id)" class="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="flex items-center justify-between mt-4">
                <!-- Quantity Controls -->
                <div class="flex items-center bg-dark-800 border border-dark-700 rounded-xl">
                  <button @click="decrementQuantity(item.id)"
                    class="px-3 py-2 text-white hover:bg-dark-700 rounded-l-xl transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <span class="px-4 py-2 text-white font-semibold">{{ item.quantity }}</span>
                  <button @click="incrementQuantity(item.id)"
                    class="px-3 py-2 text-white hover:bg-dark-700 rounded-r-xl transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                <!-- Price -->
                <div class="text-right">
                  <div class="text-xl font-bold text-emerald-400">
                    ฿{{ (item.price * item.quantity).toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-400">
                    ฿{{ item.price.toLocaleString() }} / ชิ้น
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-dark-850 border border-dark-700 rounded-2xl p-6 sticky top-24">
          <h2 class="text-xl font-bold text-white mb-6">สรุปคำสั่งซื้อ</h2>

          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-gray-400">
              <span>จำนวนสินค้า</span>
              <span class="text-white font-semibold">{{ cartStore.totalItems }} ชิ้น</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>ราคารวม</span>
              <span class="text-white font-semibold">฿{{ cartStore.totalPrice.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>ค่าจัดส่ง</span>
              <span class="text-emerald-400 font-semibold">ฟรี</span>
            </div>
          </div>

          <div class="border-t border-dark-700 pt-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="text-lg text-white font-semibold">ยอดรวมทั้งหมด</span>
              <span class="text-2xl font-bold text-emerald-400">
                ฿{{ cartStore.totalPrice.toLocaleString() }}
              </span>
            </div>
          </div>

          <button @click="handleCheckout"
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-xl transition-all hover:shadow-glow flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            ดำเนินการชำระเงิน
          </button>

          <button @click="clearCart"
            class="w-full mt-3 bg-dark-800 hover:bg-dark-700 text-gray-400 hover:text-white font-semibold py-3 rounded-xl transition-all">
            ล้างตะกร้า
          </button>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center py-16">
      <div class="w-32 h-32 bg-dark-850 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white mb-2">ตะกร้าสินค้าว่างเปล่า</h2>
      <p class="text-gray-400 mb-8">คุณยังไม่มีสินค้าในตะกร้า เริ่มช้อปปิ้งเลยตอนนี้!</p>
      <NuxtLink to="/products"
        class="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-glow inline-flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        เริ่มช้อปปิ้ง
      </NuxtLink>
    </div>

    <!-- Profile Form -->
    <UpdateProfile :visible="showProfileForm" @success="showProfileForm = false" />



  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/useAuthStore'
import { useToast } from 'vue-toastification'
import UpdateProfile from '~/components/profile/UpdateProfile.vue'
import axios from 'axios'
import { headersConfig } from '~/configs/apiConfig'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const showProfileForm = ref(false)
const toast = useToast()
const router = useRouter()

const { public: { apiBaseUrl } } = useRuntimeConfig()
import AppLoading from '~/components/ui/AppLoading.vue'



const cartStore = useCartStore()

const incrementQuantity = (productId) => {
  cartStore.incrementQuantity(productId)
}

const decrementQuantity = (productId) => {
  cartStore.decrementQuantity(productId)
}

const removeItem = (productId) => {
  if (confirm('คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?')) {
    cartStore.removeFromCart(productId)
  }
}

const clearCart = () => {
  if (confirm('คุณต้องการล้างตะกร้าสินค้าทั้งหมดหรือไม่?')) {
    cartStore.clearCart()
  }
}


const handleCheckout = async () => {
  if (!authStore.user) {
    navigateTo('/login')
    return
  }

  if (!authStore.user.profile_completed) {
    toast.info('กรุณากรอกข้อมูลสำหรับจัดส่งก่อนดำเนินการชำระเงิน')
    showProfileForm.value = true
    return
  }

  try {
    cartStore.isLoading = true
    console.log('Proceeding to checkout with items:', cartStore.items)
    const response = await axios.post(`${apiBaseUrl}/api/store/order`,
      {
        cartItems: cartStore.items,
      },
      headersConfig(authStore.access_token)
    )
    cartStore.clearCart()

    authStore.user = response.data.user
    console.log(response.data)
    console.log(response.data.order.id)
    console.log(response.data.order.total)
    router.push({
      path: '/order/success',
      query: {
        order_id: response.data.order.id,
        total: response.data.order.total,
      }
    })
    // toast.success("สั่งซื้อสินค้าสําเร็จ", {
    //   timeout: 2000
    // })

  } catch (error) {
    console.log(error)
  } finally {
    cartStore.isLoading = false
  }


}

useHead({
  title: 'ตะกร้าสินค้า - IoT Shop'
})

</script>

<style>
/* fade + slide */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.35s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* subtle fade in */
.animate-fade-in {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
