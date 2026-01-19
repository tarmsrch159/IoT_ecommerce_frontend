<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Navbar />
    <main class="">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
useHead({
  htmlAttrs: {
    lang: 'th'
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-dark-900;
}
::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-dark-700 rounded-full hover:bg-primary-500 transition-colors;
}
</style>
