import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isLoading: false,
  }),

  persist: {
    storage: persistedState.localStorage,
  },

  getters: {
    // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    // คำนวณราคารวมทั้งหมด
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    // ตรวจสอบว่าสินค้ามีในตะกร้าหรือไม่
    isInCart: (state) => (productId) => {
      return state.items.some(item => item.id === productId)
    },

    // หาจำนวนสินค้าเฉพาะ
    getItemQuantity: (state) => (productId) => {
      const item = state.items.find(item => item.id === productId)
      return item ? item.quantity : 0
    }
  },

  actions: {
    // เพิ่มสินค้าลงตะกร้า
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      console.log('Adding to cart:', product)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          thumbnail: product.thumbnail,
          sku: product.sku,
          quantity: 1
        })
      }
    },

    // ลบสินค้าออกจากตะกร้า
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    // อัพเดทจำนวนสินค้า
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    // เพิ่มจำนวนสินค้า
    incrementQuantity(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity++
      }
    },

    // ลดจำนวนสินค้า
    decrementQuantity(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          this.removeFromCart(productId)
        }
      }
    },

    // ล้างตะกร้าสินค้า
    clearCart() {
      this.items = []
    }
  }
})

