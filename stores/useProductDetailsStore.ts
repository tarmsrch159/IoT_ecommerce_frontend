import { defineStore } from 'pinia'
import axios from 'axios'
import { headersConfig } from '~/configs/apiConfig'
import { useAuthStore } from '~/stores/useAuthStore'

/* -------------------- Types -------------------- */

export interface ProductImage {
    id: number
    src: string
}

export interface Review {
    id: number
    title: string
    body: string
    rating: number
    user_id?: number
}

export interface Product {
    id: number
    name: string
    thumbnail: string
    reviews: Review[]
}

interface ReviewToUpdate {
    updating: boolean
    data: Review | null
}

interface ProductState {
    product: Product | null
    productThumbnail: string
    isLoading: boolean
    errorMessage: string
    reviewToUpdate: ReviewToUpdate
}

/* -------------------- Store -------------------- */

export const useProductDetailsStore = defineStore('product', {
    state: (): ProductState => ({
        product: null,
        productThumbnail: '',
        isLoading: false,
        errorMessage: '',
        reviewToUpdate: {
            updating: false,
            data: null
        }
    }),

    actions: {
        async fetchProduct(id: number) {
            const { public: { apiBaseUrl } } = useRuntimeConfig()
            this.isLoading = true

            try {
                const response = await axios.get(
                    `${apiBaseUrl}/api/products/${id}/show`,
                )

                const product = response.data.data

                this.product = product
                this.productThumbnail = product.thumbnail


            } catch (error) {
                console.error(error)
                this.errorMessage = 'Failed to load product'
            } finally {
                this.isLoading = false
            }
        },

    }
})
