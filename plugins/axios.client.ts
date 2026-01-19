import axios from 'axios'
import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtPlugin((nuxtApp) => {
  axios.interceptors.response.use(
    res => res,
    error => {
      if (error.response?.status === 401) {
        const authStore = useAuthStore()

       
        authStore.user = null

        navigateTo('/login')
      }

      return Promise.reject(error)
    }
  )
})
