import { auth } from '@/config/firebaseConfig'
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import * as apiServices from '@/services'

const useAuthStore = defineStore('auth', () => {
  const { shared } = useStore()
  const user: Ref<object | null> = ref(null)
  const loading: Ref<boolean> = ref(true)
  const token: Ref<object | null> = ref(null)

  const loginWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: unknown) {
      loading.value = false
      shared.setError((error as FirebaseError).code)
    }
  }

  const loginWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error: unknown) {
      loading.value = false
      shared.setError((error as FirebaseError).code)
    }
  }

  const registerWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error: unknown) {
      loading.value = false
      shared.setError((error as FirebaseError).code)
    }
  }

  const logout = async (): Promise<void> => {
    await signOut(auth)
  }

  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      loading.value = false
      return
    }
    token.value = {
      accessToken: await currentUser.getIdToken(),
      refreshToken: currentUser.refreshToken,
    }

    try {
      const response = await apiServices.login({
        uuid: currentUser.uid,
        email: currentUser.email,
        user_name: currentUser.displayName,
        phone_number: currentUser.phoneNumber,
        provider: currentUser.providerData[0]?.providerId,
        avatar_link: currentUser.photoURL,
        last_login: currentUser.metadata?.lastSignInTime,
      })
      loading.value = false
      user.value = { ...response.data, photoURL: currentUser.photoURL }
    } catch (error) {
      console.error('Error fetching user data:', error)
      user.value = null
      token.value = null
      loading.value = false
    }
  })

  return {
    user,
    token,
    loading,
    loginWithEmailAndPassword,
    loginWithGoogle,
    registerWithEmailAndPassword,
    logout,
  }
})

export default useAuthStore
