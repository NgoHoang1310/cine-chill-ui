<template>
  <ModalLayout :show-close-button="false" :model-value="show" @update:model-value="show = $event">
    <div class="bg-zinc-900 w-full rounded-2xl shadow-2xl overflow-hidden">
      <div class="p-6 space-y-5">
        <h2 class="text-2xl font-bold text-center">Xác nhận thanh toán</h2>

        <!-- Gói cước -->
        <div class="bg-zinc-800 p-4 rounded-lg">
          <h3 class="text-2xl font-semibold">Gói {{ plan?.name }}</h3>
          <p class="text-lg text-gray-400">Thời hạn: {{ plan?.duration_days }} ngày</p>
          <p class="text-lg text-gray-400">
            Giá gốc:
            <span class="text-red-400" :class="plan?.vouchers.length ? 'line-through' : ''">{{
              formatCurrency(plan?.price)
            }}</span>
          </p>
        </div>

        <!-- Danh sách mã giảm giá -->
        <div v-if="plan?.vouchers.length" class="bg-green-800 px-3 py-4 rounded-lg space-y-2">
          <p class="text-sm text-white font-semibold">
            Mã giảm giá đã áp dụng: {{ plan?.vouchers?.length }}
          </p>
          <div v-for="voucher in plan?.vouchers" :key="voucher.id" class="text-sm">
            - <strong>{{ voucher.code }}</strong
            >:
            <span v-if="voucher.type != 1"> giảm {{ voucher.value }}% </span>
            <span v-else> giảm {{ formatCurrency(voucher.value) }} </span>
          </div>
        </div>

        <!-- Tổng tiền sau giảm -->
        <div class="text-center text-xl font-bold">
          Tổng cộng:
          <span class="text-green-400">{{ formatCurrency(finalPrice) }}</span>
        </div>

        <!-- Nút xác nhận -->
        <button
          @click="handleBuyPlan(plan)"
          class="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-lg transition"
        >
          Xác nhận
        </button>
      </div>
    </div>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from './ModalLayout.vue'
import useEmitter from '@/composables/useEmitter'
import { useStore } from '@/store'
import { formatCurrency } from '@/helpers/commons'
import * as apiService from '@/services'

const { auth } = useStore()
const emitter = useEmitter()
const show = ref(false)
const plan = ref(null)

const finalPrice = computed(() => {
  let total = plan.value?.price

  plan.value?.vouchers.forEach((voucher) => {
    if (voucher.type !== 1) {
      total -= total * (voucher.value / 100)
    } else {
      total -= voucher.value
    }
  })

  return Math.max(Math.round(total), 0)
})

const handleBuyPlan = async (plan) => {
  try {
    const response = await apiService.createPayment({
      amount: finalPrice.value,
      order_name: plan.name,
      plan_id: plan.id,
      user_id: auth.user?.id,
      vouchers: plan.vouchers.reduce((acc, v) => {
        acc[v.id] = v.type === 1 ? v.value : (v.value * plan.price) / 100
        return acc
      }, {}),
      duration_days: plan.duration_days,
    })
    if (response.success) {
      // Redirect to payment page or show success message
      console.log('Subscription created successfully:', response)
      if (!response?.result?.url) {
        console.error('No payment URL returned from the API')
        return
      }
      window.location.href = response.result.url
    } else {
      console.error('Failed to create subscription:', response.message)
    }
  } catch (error) {
    console.error('Error creating subscription:', error)
  }
}

onMounted(() => {
  emitter.on('openPlanConfirmModal', (value) => {
    show.value = true
    plan.value = value
  })

  emitter.on('closePlanConfirmModal', () => {
    show.value = false
  })
})

onBeforeUnmount(() => {
  emitter.off('openPlanConfirmModal')
  emitter.off('closePlanConfirmModal')
})
</script>
