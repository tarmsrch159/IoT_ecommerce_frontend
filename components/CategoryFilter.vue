<template>
  <div class="bg-dark-850 border border-dark-700 rounded-2xl p-6">
    <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      หมวดหมู่สินค้า
    </h3>

    <div class="space-y-2">
      <!-- ดูทั้งหมด -->
      <button @click="selectCategory('all')" :class="[
        'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left',
        modelValue === 'all'
          ? 'bg-primary-600 text-white shadow-glow'
          : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white'
      ]">
        <span class="font-medium">ดูทั้งหมด</span>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/20 text-white">
          {{ totalProducts }}
        </span>
      </button>
      <button v-for="category in categories" :key="category.id" @click="selectCategory(category.slug)" :class="[
        'w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left',
        modelValue === category.slug
          ? 'bg-primary-600 text-white shadow-glow'
          : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white'
      ]">
        <span class="font-medium">{{ category.name }}</span>
        <span :class="[
          'text-xs font-semibold px-2.5 py-1 rounded-lg',
          'bg-white/20 text-white'
        ]">
          {{ category.products_count }}
        </span>
      </button>

    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:modelValue'])


const selectCategory = (slug) => {
  emit('update:modelValue', slug)
}

const totalProducts = computed(() =>
  props.categories.reduce((sum, c) => sum + (c.products_count || 0), 0)
)
</script>
