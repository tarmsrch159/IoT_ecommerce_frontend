<template>
  <div class="h-full flex items-center justify-center px-4 py-10">
    <!-- Card -->
    <div class="w-full max-w-xs sm:max-w-md
             bg-dark-850
             border border-dark-700
             rounded-2xl
             shadow-lg
             px-6 py-6
             text-center
             animate-fade-in">
      <!-- Icon -->
      <div class="w-20 h-20 mx-auto mb-5 rounded-full
               bg-emerald-500/10
               flex items-center justify-center">
        <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-lg font-semibold text-white mb-1">
        สั่งซื้อสำเร็จ
      </h1>
      <p class="text-xs text-gray-400 mb-4">
        เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว
      </p>

      <!-- Order Info -->
      <div class="bg-dark-800 border border-dark-700
               rounded-xl p-3 text-sm mb-4">
        <div class="flex justify-between text-gray-400 mb-1">
          <span>Order No.</span>
          <span class="text-white font-medium">
            #{{ orderId }}
          </span>
        </div>
        <div class="flex justify-between text-gray-400">
          <span>ยอดชำระ</span>
          <span class="text-emerald-400 font-medium">
            ฿{{ totalPrice.toLocaleString() }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-2">
        <NuxtLink :to="{
          path: '/profile_info',
          query: { tab: 'orders' }
        }" 
        class="block w-full py-2.5 rounded-xl text-sm font-medium
                 bg-primary-600 hover:bg-primary-700
                 text-white transition">
          ดูคำสั่งซื้อ
        </NuxtLink>

        <NuxtLink to="/products" class="block w-full py-2.5 rounded-xl text-sm font-medium
                 bg-dark-800 hover:bg-dark-700
                 text-gray-300 transition">
          ซื้อสินค้าต่อ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>


<script setup>
useHead({
  title: 'สั่งซื้อสำเร็จ - IoT Shop',
})

/**
 * ปกติข้อมูลนี้จะส่งมาจาก backend
 * หรือเก็บไว้ใน store / query
 */
const route = useRoute()


const orderId = route.query.order_id || '1'
const totalPrice = Number(route.query.total || 0)
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
