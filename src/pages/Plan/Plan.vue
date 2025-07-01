<template>
  <div class="min-h-screen px-4 py-20 flex flex-col items-center">
    <h1 class="text-4xl font-bold mb-10 text-center">Chọn gói xem phim phù hợp với bạn</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
      <div
        v-for="(plan, index) in plans"
        :key="index"
        class="bg-[#1f1f1f] min-h-[420px] flex flex-col rounded-2xl p-6 border border-gray-700 hover:border-red-600 transition"
      >
        <h2 class="text-2xl font-semibold mb-2">{{ plan?.name }}</h2>
        <p class="text-red-500 text-xl font-bold mb-4">
          {{ formatCurrency(plan?.price) }} / {{ plan?.duration_days }} ngày
        </p>
        <div v-html="plan?.description" class="flex-1 text-sm text-white space-y-2 mb-6"></div>
        <div v-if="plan?.vouchers?.length" class="mb-4">
          <h3 class="text font-semibold mb-2">Ưu đãi</h3>
          <ul class="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li v-for="(voucher, index) in plan?.vouchers" :key="index">
              {{ voucher?.code }} - Giảm
              {{ voucher?.type == 1 ? formatCurrency(voucher?.value) : voucher?.value + '%' }}
              <small class=" ">(Thông tin thêm)</small>
            </li>
          </ul>
        </div>
        <button
          @click="emitter.emit('openPlanConfirmModal', plan)"
          class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full font-semibold transition"
          :class="{
            'opacity-50 pointer-events-none':
              auth?.user?.subscription?.plan_id == plan?.id &&
              auth?.user?.subscription?.status == 1,
          }"
        >
          {{
            auth?.user?.subscription?.plan_id == plan?.id && auth?.user?.subscription?.status == 1
              ? 'Đang sử dụng'
              : 'Mua ngay'
          }}
        </button>
      </div>
    </div>

    <!-- Ghi chú -->
    <p class="text-sm text-gray-500 mt-10 text-center">
      * Giá đã bao gồm VAT. Bạn có thể hủy bất kỳ lúc nào.
    </p>
  </div>
</template>

<script setup>
import * as apiService from '@/services'
import { formatCurrency } from '@/helpers/commons'
import { useStore } from '@/store'
import useEmitter from '@/composables/useEmitter'

const { auth } = useStore()
const emitter = useEmitter()
const { y: scrollTop } = useScroll(window)
const scrollToTop = () => {
  scrollTop.value = 0
}
const plans = ref([])

onMounted(async () => {
  try {
    const response = await apiService.getPlans({ user_uuid: auth?.user?.uuid })
    plans.value = response.result.data
  } catch (error) {
    console.error('Error fetching plans:', error)
  }
})

onMounted(() => scrollToTop())
</script>
