<template>
  <MainNav v-if="!$route.meta.hideNavbar" />
  <div :class="{ flex: !$route.meta.hideNavbar }">
    <SlideBar v-if="!$route.meta.hideNavbar" />
    <RouterView />
  </div>
</template>

<script>
import MainNav from './components/navigation/MainNav.vue'
import SlideBar from './components/navigation/SlideBar.vue'
export default {
  components: {
    MainNav,
    SlideBar
  }
}
</script>
<style scoped></style>
