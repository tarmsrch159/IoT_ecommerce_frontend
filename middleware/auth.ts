export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();


  if (!authStore.access_token) {
    return navigateTo('/login')
  }


  if (!authStore.user) {
    return navigateTo('/login')
  }
});
