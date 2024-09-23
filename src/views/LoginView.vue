<template>
  <div class="flex justify-center items-center h-screen bg-green-200">
    <div class="h-96 w-96 p-8 bg-white shadow-lg rounded-md">
      <h1 class="text-2xl block text-center font-semibold">Login</h1>
      <div class="mt-4">
        <label class="block text-base mb-2">UserName</label>
        <input
          v-model="form.userName"
          type="text"
          class="border w-full text-base px-2 py-1 focus:outline-none"
          placeholder="UserName"
        />
      </div>
      <div class="mt-4">
        <label class="block text-base mb-2">Password</label>
        <input
          v-model="form.passWord"
          :type="typePassword"
          class="w-full border px-2 py-1 text-base focus:outline-none"
          placeholder="Password"
        />
      </div>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <input type="checkbox" @click="showPass" />
          <label class="ml-1">Show password</label>
        </div>
        <div>
          <router-link to="/forgot" class="text-indigo-800">Forget Password</router-link>
        </div>
      </div>
      <div class="mt-6">
        <button
          class="border-2 w-full border-blue-500 px-5 py-2 text-white text-center rounded bg-blue-500"
          @click="loginAction"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { TokenKey } from '@/const/const'
import apiClient from '@/helper/api'
import { saveToken } from '@/helper/utils'
import router from '@/router'
import { useUserStore } from '@/stores/user'

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        userName: 'test',
        passWord: 'test'
      },
      typePassword: 'password',
      userStore: useUserStore()
    }
  },
  computed: {},
  methods: {
    showPass() {
      return this.typePassword === 'password'
        ? (this.typePassword = 'text')
        : (this.typePassword = 'password')
    },
    async loginAction() {
      try {
        const data = { name: this.form.userName, password: this.form.passWord }
        const res = await apiClient.post('/users/authenticate', data)
        this.userStore.setUser(res.data)
        console.log('res.data', res.data.token)
        // save token to session
        saveToken(res.data.token)
        router.push({ path: '/' })
      } catch (error: any) {
        alert('Login False!!!: ' + error.message)
      }
    }
  }
}
</script>
