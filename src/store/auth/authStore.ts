import { auth } from '@/config/firebaseConfig'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const loading: Ref<boolean> = ref(true)

  const loginWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logout = async (): Promise<void> => {
    return signOut(auth)
  }

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser

    loading.value = false
  })

  return {
    user,
    loading,
    loginWithGoogle,
    logout,
  }
})

export default useAuthStore
