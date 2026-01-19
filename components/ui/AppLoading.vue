<template>
  <div
    :class="[
      fullscreen
        ? 'fixed inset-0 z-50'
        : 'w-full',
      'flex items-center justify-center'
    ]"
  >
    <div class="bg-dark-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-dark-700">
      <!-- Spinner -->
      <div class="flex justify-center mb-4">
        <div class="relative w-14 h-14">
          <div
            class="absolute inset-0 rounded-full border-4 border-primary-500/20"
          ></div>
          <div
            class="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"
          ></div>
        </div>
      </div>

      <!-- Text -->
      <p class="text-center text-gray-300 font-medium">
        {{ text }}
      </p>

      <!-- Skeleton -->
      <div v-if="showSkeleton" class="mt-6 space-y-3">
        <div class="h-4 bg-dark-700 rounded animate-pulse"></div>
        <div class="h-4 bg-dark-700 rounded animate-pulse w-5/6"></div>
        <div class="h-4 bg-dark-700 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'กำลังโหลดข้อมูล...'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  showSkeleton: {
    type: Boolean,
    default: false
  }
})
</script>
