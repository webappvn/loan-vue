<template>
  <main>
    <div class="flex flex-row">
      <SlideBar />
      <div class="bg-gray-100 p-8 flex-auto">
        <div class="bg-white h-full p-5">
          <h1 class="text-3xl font-semibold text-center mb-6">Product List</h1>
          <ProductFilter />
          <ProductListings />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import SlideBar from '@/components/navigation/SlideBar.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductListings from '@/components/products/ProductListings.vue'
</script>
