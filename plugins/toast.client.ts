import { defineNuxtPlugin } from '#app'
import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast)

  const toast = useToast()

  // 👇 inject ให้เรียกผ่าน nuxtApp.$toast
  nuxtApp.provide('toast', toast)
})
