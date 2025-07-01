<template>
  <div class="relative" @mouseenter="open = true" @mouseleave="open = false">
    <!-- Bell Icon -->
    <button class="relative p-2 rounded-full hover:bg-white/10 transition">
      <font-awesome-icon class="text-white" :icon="['fas', 'bell']" />
      <span
        v-if="unreadCount > 0"
        class="absolute text-white -top-1 -right-1 bg-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
      >
        {{ unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <transition name="fade">
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-96 bg-[#1f1f1f] border border-white/10 text-white rounded-xl shadow-xl z-50"
      >
        <div class="p-4 font-semibold border-b border-white/10 text-base">Thông báo</div>
        <ul class="max-h-80 overflow-y-auto divide-y divide-white/10">
          <li
            v-for="(notification, index) in notifications"
            :key="index"
            class="flex items-start gap-3 px-4 py-4 hover:bg-white/5 transition group"
          >
            <div class="flex-1">
              <div class="font-semibold text-md mb-2">{{ notification.title }}</div>
              <div class="text-gray-300 text-sm">{{ notification.content }}</div>
              <div class="text-gray-500 text-xs mt-1">
                {{ useTimeAgo(notification.created_at) }}
              </div>
            </div>
            <button
              v-if="!notification.is_read"
              @click="markAsRead(index)"
              class="text-xs text-blue-400 hover:underline shrink-0"
            >
              Đánh dấu đã đọc
            </button>
          </li>
          <li v-if="notifications.length === 0" class="p-4 text-center text-gray-400 text-sm">
            Không có thông báo nào
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import useSocket from '@/composables/useSocket'
import { useTimeAgo } from '@vueuse/core'
import { useStore } from '@/store'
import * as apiServices from '@/services'
// Dữ liệu mẫu

const { auth } = useStore()
const socket = useSocket()
const notifications = ref([])

const open = ref(false)

const unreadCount = computed(() => notifications.value.filter((n) => !n.is_read).length)

const markAsRead = async (index) => {
  await apiServices.markNotificationAsRead(notifications.value[index].id)
  notifications.value[index].is_read = true
}

const fetchNotifications = async () => {
  try {
    const res = await apiServices.getNotifications({ target_id: auth?.user?.id })
    notifications.value = res?.result?.data
    console.log(notifications.value)
  } catch (error) {
    console.error('Error fetching notifications:', error)
  }
}

onMounted(() => {
  fetchNotifications()

  socket.emit('joinRoom', 'broadcast')
  socket.on('notify', (notification) => {
    notifications.value.push(notification)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
