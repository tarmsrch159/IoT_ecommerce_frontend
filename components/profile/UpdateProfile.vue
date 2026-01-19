<template>
  <Transition name="slide-fade">
    <div v-if="visible" ref="formRef" class="bg-dark-850 border border-dark-700 rounded-2xl p-6 animate-fade-in">
      <h2 class="text-xl font-bold text-white mb-4">
        {{ title }}
      </h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">ที่อยู่</label>
          <textarea ref="firstInput" v-model="form.address" class="input" rows="3" required />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">จังหวัด</label>
            <select v-model="form.province_id" class="input" required>
              <option value="" disabled>เลือกจังหวัด</option>
              <option v-for="province in provinces" :key="province.id" :value="province.id">
                {{ province.name_th }}
              </option>
            </select>
          </div>
          <div>
            <label class="label">เมือง / เขต</label>
            <input v-model="form.city" type="text" class="input" required />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label">รหัสไปรษณีย์</label>
            <input v-model="form.zip_code" type="text" class="input" required />
          </div>
          <!-- <div>
            <label class="label">ประเทศ</label>
            <input v-model="form.country" type="text" class="input" required  />
          </div> -->
        </div>

        <div>
          <label class="label">เบอร์โทรศัพท์</label>
          <input v-model="form.phone_number" type="text" class="input" required />
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50
                 text-white font-semibold py-3 rounded-xl transition-all
                 hover:shadow-glow active:scale-[0.98]">
          {{ loading ? 'กำลังบันทึก...' : submitText }}
        </button>
      </form>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, ref, watch, nextTick, onMounted } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'
import axios from 'axios'
import { headersConfig } from '~/configs/apiConfig'
import { useNuxtApp } from '#app'

const { $toast } = useNuxtApp()
const toast = $toast   
const props = defineProps({
  visible: { type: Boolean, default: true },
  title: { type: String, default: 'กรุณากรอกข้อมูลสำหรับจัดส่ง' },
  submitText: { type: String, default: 'บันทึกข้อมูล' },
})

const { public: { apiBaseUrl } } = useRuntimeConfig()

const emit = defineEmits(['success'])

const authStore = useAuthStore()
const loading = ref(false)
const provinces = ref([])

const formRef = ref(null)
const firstInput = ref(null)

const form = reactive({
  address: authStore.user?.address ?? '',
  province_id: authStore.user?.province_id ?? '',
  city: authStore.user?.city ?? '',
  zip_code: authStore.user?.zip_code ?? '',
  country: authStore.user?.country ?? '',
  phone_number: authStore.user?.phone_number ?? '',
})

onMounted(async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/locations/provinces`)
    provinces.value = response.data
  } catch (error) {
    console.error('Failed to fetch provinces', error)
  }
})

watch(
  () => props.visible,
  async (v) => {
    if (v) {
      await nextTick()
      formRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => firstInput.value?.focus(), 250)
    }
  }
)

const onSubmit = async () => {
  loading.value = true
  try {
    //ส่ง request ไปยัง backend ที่มาจาก user data
    const response = await axios.post(`${apiBaseUrl}/api/user/update/profile`,
      form, headersConfig(authStore.access_token)
    )
    //เก็บ response ไปยัง auth store
    authStore.user = response.data.data
    authStore.isLoading = false
    toast.success(response.data.message, {
      timeout: 2000
    })
    emit('success')
  } catch (error) {
    authStore.isLoading = false
    console.log(error)
  }
  loading.value = false
}
</script>

<style scoped>
.input {
  @apply w-full bg-dark-800 border border-dark-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-primary-500 transition;
}

.label {
  @apply block text-sm text-gray-400 mb-1;
}

/* transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.35s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.animate-fade-in {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
