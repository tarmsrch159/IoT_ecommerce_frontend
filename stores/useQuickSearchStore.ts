import { defineStore } from 'pinia'
import axios from 'axios'

export const useQuickSearchStore = defineStore('quickSearch', {
  state: () => ({
    results: [] as any[],
    isLoading: false,
    keyword: ''
  }),

  actions: {
    async search(term: string) {
      const { public: { apiBaseUrl } } = useRuntimeConfig()

      if (!term || term.length < 2) {
        this.results = []
        return
      }

      this.keyword = term
      this.isLoading = true

      try {
        const res = await axios.get(
          `${apiBaseUrl}/api/search/products?q=${encodeURIComponent(term)}`
        )
        this.results = res.data
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },

    clear() {
      this.results = []
      this.keyword = ''
    }
  }
})
