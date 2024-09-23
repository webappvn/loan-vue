<template>
  <MainNav v-if="!$route.meta.hideNavbar" />
  <RouterView />
</template>

<script>
import MainNav from './components/navigation/MainNav.vue'
export default {
  components: {
    MainNav
  }
}
</script>
<style scoped></style>
