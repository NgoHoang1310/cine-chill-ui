<!-- PaymentResult.vue -->
<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center px-4">
    <div class="bg-[#141414] p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
      <!-- Icon trạng thái -->
      <div class="mb-6">
        <svg
          v-if="paymentStatus === 'success'"
          class="w-20 h-20 mx-auto text-green-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" />
        </svg>

        <svg
          v-else
          class="w-20 h-20 mx-auto text-red-600 animate-pulse"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" />
        </svg>

        <h1 class="text-3xl font-bold mt-4">
          {{ paymentStatus === 'success' ? 'Thanh toán thành công' : 'Thanh toán thất bại' }}
        </h1>
        <p class="text-gray-400 mt-2">
          {{
            paymentStatus === 'success'
              ? 'Cảm ơn bạn đã đăng ký. Chúc bạn xem phim vui vẻ!'
              : 'Thanh toán không thành công. Vui lòng thử lại hoặc liên hệ hỗ trợ.'
          }}
        </p>
      </div>

      <!-- Thông tin giao dịch -->
      <div class="bg-[#1f1f1f] p-4 rounded-xl text-left text-sm">
        <div class="flex justify-between py-1 border-b border-gray-700">
          <span class="text-gray-400">Gói mua:</span>
          <span>{{ paymentInfo.plan }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-gray-700">
          <span class="text-gray-400">Số tiền:</span>
          <span>{{ formatCurrency(paymentInfo.amount / 100) }}</span>
        </div>
        <div class="flex justify-between py-1 border-b border-gray-700">
          <span class="text-gray-400">Thời gian:</span>
          <span>{{ formatDateTime(paymentInfo.date) }}</span>
        </div>
        <div class="flex justify-between py-1">
          <span class="text-gray-400">Mã giao dịch:</span>
          <span>{{ paymentInfo.transactionId }}</span>
        </div>
      </div>

      <!-- Nút điều hướng -->
      <div class="mt-6 space-y-3">
        <button
          v-if="paymentStatus === 'success'"
          class="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-2 px-4 rounded-full"
          @click="goTo('/home')"
        >
          Bắt đầu xem phim
        </button>
        <button
          v-else
          class="w-full border border-gray-600 hover:bg-gray-800 transition text-gray-300 font-medium py-2 px-4 rounded-full"
          @click="goTo('/plans')"
        >
          Quay lại chọn gói
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatCurrency, formatDateTime } from '@/helpers/commons'

const route = useRoute()

// Dữ liệu giả lập từ API
const paymentStatus = computed(() => {
  return route.query.vnp_ResponseCode === '00' ? 'success' : 'fail'
})

const paymentInfo = ref({
  plan: route.query.vnp_OrderInfo || 'Gói không xác định',
  amount: route.query.vnp_Amount || 0,
  date: route.query.vnp_PayDate || new Date().toISOString(),
  transactionId: route.query.vnp_TxnRef,
})

const goTo = (path) => {
  window.location.href = path
}
</script>
