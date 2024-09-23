import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    passWord: '',
    avatar: '',
    token: ''
  }),
  actions: {
    setUser(data: any) {
      console.log('store:', data)
      this.name = data.name
      this.passWord = data.passWord
      this.avatar = data.avatar
      this.token = data.token
    }
  }
})
