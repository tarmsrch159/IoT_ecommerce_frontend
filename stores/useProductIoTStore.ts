import { defineStore } from "pinia";
import axios from "axios";
interface Filter {
  param: string;
  value: string;
}

export const useProductIoTStore = defineStore("productsIOT", {
  state: () => ({
    products: [] as any[],
    recommendedProducts: [] as any[],
    categories: [] as string[],
    isLoading: false as boolean,
    filter: null as Filter | null,
  }),
  actions: {
    async fetchRecommendedProducts() {
      const {
        public: { apiBaseUrl },
      } = useRuntimeConfig();
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/products/recommended`,
        );
        this.recommendedProducts = response.data.data;
        this.isLoading = false;
      } catch (e) {
        console.error(e);
      }
    },
    async fetchAllProducts(): Promise<void> {
      const {
        public: { apiBaseUrl },
      } = useRuntimeConfig();
      console.log(apiBaseUrl);
      this.isLoading = true;
      try {
        const response = await axios.get(`${apiBaseUrl}/api/products`);
        this.products = response.data.data;
        this.categories = response.data.categories;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
    async filterProducts(
      param: string,
      value: string,
      search: boolean = false,
    ): Promise<void> {
      const {
        public: { apiBaseUrl },
      } = useRuntimeConfig();
      this.isLoading = true;
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/products/${value}/${param}`,
        );
        this.products = response.data.data;
        this.categories = response.data.categories;

        if (search) {
          this.filter = {
            param: "term",
            value,
          };
        } else {
          this.filter = {
            param,
            value: response.data.filter,
          };
        }

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
    clearFilters(): void {
      this.filter = null;
      void this.fetchAllProducts();
    },

    getByCategory(categoryId: number, excludeId?: number, limit = 4) {
      return this.products
        .filter((p) => p.category?.id === categoryId && p.id !== excludeId)
        .slice(0, limit);
    },
  },
});
