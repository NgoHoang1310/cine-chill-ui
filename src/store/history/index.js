// stores/useMyListStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as apiServices from '@/services'

export const useHistoryStore = defineStore('history', () => {
  const histories = ref([])

  const setHistory = (payload) => {
    histories.value = payload
  }

  const isInMyHistory = (movie) => {
    return histories.value.some((item) => item.id === movie.id)
  }

  const fetchMyHistory = async () => {
    try {
      const res = await apiServices.getMyWatchHistory()
      setHistory(res.result.data)
    } catch (error) {
      console.error('Failed to fetch list:', error)
    }
  }

  const historyGetter = computed(() => histories.value)

  return {
    histories,
    historyGetter,
    setHistory,
    isInMyHistory,
    fetchMyHistory
  }
})
