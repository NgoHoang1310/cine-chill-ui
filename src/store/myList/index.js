// stores/useMyListStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import useAuthStore from '@/store/auth/authStore'
import * as apiServices from '@/services'

export const useMyListStore = defineStore('myList', () => {
  const myList = ref([])
  const { user } = useAuthStore()

  const setMyList = (payload) => {
    myList.value = payload
  }

  const addToMyList = async (payload) => {
    let response = await apiServices.addToList({
      user_uuid: user?.uuid,
      target_id: payload.id,
      target_type: payload.type,
    })
    if (!response?.success) return
    setMyList([payload, ...myList.value])
  }

  const removeFromMyList = async (payload) => {
    await apiServices.removeFromList({
      target_id: payload.id,
      target_type: payload.type,
    })
    setMyList(myList.value.filter(({ id }) => id !== payload.id))
  }

  const isInMyList = (movie) => {
    return myListGetter.value.some((item) => item.id === movie.id)
  }

  const fetchMyList = async () => {
    try {
      const res = await apiServices.getMyList()
      setMyList(res.result.data)
    } catch (error) {
      console.error('Failed to fetch list:', error)
    }
  }

  const myListGetter = computed(() => myList.value)

  return {
    myList,
    myListGetter,
    setMyList,
    addToMyList,
    removeFromMyList,
    isInMyList,
    fetchMyList
  }
})
