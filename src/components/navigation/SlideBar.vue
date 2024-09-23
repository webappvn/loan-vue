<template>
  <div class="flex flex-col border-r border-solid border-gray-300 p-4 w-60 h-screen">
    <ol>
      <li v-for="menu in menuItems" :key="menu.text" class="border-b p-5">{{ menu.text }}</li>
    </ol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItems: [
        { text: 'Home Page', url: '/' },
        { text: 'Product', url: '/' }
      ]
    }
  }
}
</script>
