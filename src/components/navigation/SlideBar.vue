<template>
  <div class="flex flex-col border-r border-solid border-gray-300 p-4 h-screen">
    <ol>
      <li v-for="menu in menuItems" :key="menu.text" class="border-b p-5">
        <router-link :to="menu.url">{{ menu.text }}</router-link>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItems: [
        { text: 'Home Page', url: '/' },
        { text: 'Product', url: '/product' }
      ]
    }
  }
}
</script>
