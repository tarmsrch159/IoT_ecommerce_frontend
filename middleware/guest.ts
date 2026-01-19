export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const token = useCookie("authIoTShopStore");
  const router = useRouter();

  if (authStore.access_token) {
    return (window.location.href = "/");
  }
});
