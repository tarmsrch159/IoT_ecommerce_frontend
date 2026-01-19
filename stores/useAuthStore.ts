import { defineStore } from "pinia";

export interface ValidationErrors {
  [key: string]: string[];
}

export const useAuthStore = defineStore("authIoTShopStore", {
  // ✅ state ล้วน ๆ (serialize ได้)
  state: () => ({
    isLoggedIn: false as boolean,
    user: null as any | null,
    access_token: null as string | null,

    validationErrors: null as any,
    isLoading: false,
  }),

  actions: {
    //setIsloggedIn
    //ตั้งค่าการเข้าสู่ระบบ
    setIsloggedIn() {
      this.isLoggedIn = true;
    },
    //setUser
    //รับ user จากการ login
    setUser(user: any) {
      this.user = user;
    },
    //setToken
    //ตั้งค่า token
    setToken(token: string) {
      this.access_token = token;
    },
    //clearAuthData
    //ล้างข้อมูล
    clearAuthData() {
      this.isLoggedIn = false;
      this.user = null;
      this.access_token = null;
    },
    //setValidationErrors
    //ตรวจสอบ error
    setValidationErrors(errors: ValidationErrors) {
      this.validationErrors = errors;
    },
    //clearValidationErrors
    //ล้าง error
    clearValidationErrors() {
      this.validationErrors = null;
    },
    // logout
    async logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.access_token = null;
      // ถ้ามี API logout ก็ใส่ตรงนี้
    },
    forceLogout() {
      this.isLoggedIn = false
      this.user = null
      this.access_token = null
      this.validationErrors = null
      this.isLoading = false

      // ถ้าใช้ persist
      localStorage.removeItem('auth')
      localStorage.removeItem('access_token')
    },
  },
  persist: true
});
