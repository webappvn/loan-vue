<template>
  <header>
    <div class="mx-auto flex flex-nowrap justify-between p-3 border-solid border-b">
      <button>menu</button>
      <h2 class="text-xl font-semibold">{{ company }}</h2>
      <div class="items-center flex gap-2">
        <img :src="imageLink" class="w-8 h-8 rounded-3xl object-contain" />
        <ActionButton class="font-bold cursor-pointer hover:text-red-500" @click="handleLogout"
          >logout</ActionButton
        >
      </div>
    </div>
  </header>
</template>
<script>
import { removeToken } from '@/helper/utils'
import ActionButton from '../share/ActionButton.vue'
import router from '@/router'

export default {
  components: {
    ActionButton
  },
  data() {
    return {
      company: 'Mini Project VueJs',
      imageLink: '/src/assets/user.png'
    }
  },
  methods: {
    handleLogout() {
      console.log('handleLogout')
      removeToken()
      router.replace({
        path: '/login'
      })
    }
  }
}
</script>
