<template>
  <footer class="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800 mt-20 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-glow">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-primary-500 to-purple-600 dark:from-primary-400 dark:to-purple-500 bg-clip-text text-transparent">
              IoT Shop
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            ร้านค้าสินค้าและอุปกรณ์ IoT คุณภาพสูง สำหรับนักพัฒนาและผู้สนใจเทคโนโลยี มั่นใจในคุณภาพและบริการ
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-gray-900 dark:text-white font-semibold mb-4">ลิงก์ด่วน</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors">
                หน้าแรก
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors">
                สินค้าทั้งหมด
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart" class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition-colors">
                ตะกร้าสินค้า
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-gray-900 dark:text-white font-semibold mb-4">หมวดหมู่</h4>
          <ul class="space-y-2">
            <li class="text-gray-600 dark:text-gray-400 text-sm">บอร์ดควบคุม</li>
            <li class="text-gray-600 dark:text-gray-400 text-sm">เซ็นเซอร์</li>
            <li class="text-gray-600 dark:text-gray-400 text-sm">Smart Home</li>
            <li class="text-gray-600 dark:text-gray-400 text-sm">อุปกรณ์เสริม</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-gray-900 dark:text-white font-semibold mb-4">ติดต่อเรา</h4>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@iotshop.com
            </li>
            <li class="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
              <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              02-123-4567
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-200 dark:border-dark-800 mt-8 pt-8 text-center">
        <p class="text-gray-500 text-sm">
          © 2025 IoT Shop. สร้างด้วย Nuxt.js และ Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
