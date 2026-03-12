import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginDataStore = defineStore(
  'loginData',
  () => {
    const token = ref('')

    const setToken = (newToken: string) => {
      token.value = newToken
    }
    const clearToken = () => {
      token.value = ''
    }

    return {
      token,
      setToken,
      clearToken,
    }
  },
  {
    persist: {
      key: 'loginData',
      storage: localStorage,
    },
  },
)
