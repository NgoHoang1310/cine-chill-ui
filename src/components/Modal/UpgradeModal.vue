<template>
  <ModalLayout
    :show-close-button="false"
    classes="!w-fit"
    :model-value="show"
    @update:model-value="show = $event"
  >
    <div class="bg-[#141414] text-white rounded-xl max-w-md w-full px-6 py-8 shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Nâng cấp tài khoản</h2>
      <p class="text-gray-300 mb-6">
        Tận hưởng trải nghiệm không giới hạn, không quảng cáo và chất lượng cao hơn khi nâng cấp tài
        khoản của bạn.
      </p>

      <div class="flex justify-end space-x-3">
        <button
          @click="show = false"
          class="px-4 py-2 rounded-md border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
        >
          Hủy
        </button>
        <router-link
          class="btn btn--primary px-6 py-2 !rounded-full text-white hover:bg-red-600/50 backdrop-blur-md border border-red-500/40 shadow-md transition"
          :to="routes.plan"
        >
          Nâng cấp
        </router-link>
      </div>
    </div>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from './ModalLayout.vue'
import useEmitter from '@/composables/useEmitter'
import { routes } from '@/helpers/constants'

const emitter = useEmitter()

const show = ref(false)

onMounted(() => {
  emitter.on('openUpgradeModal', () => {
    console.log('Upgrade modal opened')

    show.value = true
  })

  emitter.on('closeUpgradeModal', () => {
    show.value = false
  })
})

onBeforeUnmount(() => {
  emitter.off('openUpgradeModal')
  emitter.off('closeUpgradeModal')
})

onBeforeRouteLeave(() => {
  console.log('Leaving route, closing upgrade modal')
})
</script>
