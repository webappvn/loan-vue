<template>
  <div class="flex flex-nowrap gap-5">
    <div>
      <label class="mr-2">Name:</label>
      <input
        v-model="nameFill"
        type="text"
        class="border-solid border p-2 rounded-md focus:outline-none"
        @input="handleInputName"
      />
    </div>
    <div>
      <label class="mr-2">type:</label>
      <select
        id="type"
        v-model="typeFill"
        name="type"
        class="border-solid border p-2 rounded-md focus:outline-none"
        @change="handleChangeType"
      >
        <option value="all">All</option>
        <option value="facility">facility</option>
        <option value="service">service</option>
      </select>
    </div>
    <button
      class="border rounded-lg px-5 text-red-500 border-red-400 hover:bg-red-500 hover:text-white"
      @click="resetFill"
    >
      Reset
    </button>
    <button class="ml-auto border px-5 rounded-lg bg-blue-500 text-white py-2">Add product</button>
  </div>
</template>
<script>
import router from '@/router'

export default {
  data() {
    return {
      nameFill: router.currentRoute.value.query.name || '',
      typeFill: router.currentRoute.value.query.type || ''
    }
  },
  methods: {
    handleInputName(e) {
      router.replace({
        path: '/',
        query: {
          ...router.currentRoute.value.query,
          name: this.nameFill // e.target.value
        }
      })
    },
    handleChangeType() {
      router.replace({
        path: '/',
        query: {
          ...router.currentRoute.value.query,
          type: this.typeFill
        }
      })
    },
    resetFill() {
      ;(this.nameFill = ''),
        (this.typeFill = ''),
        router.replace({
          path: '/',
          query: {}
        })
    }
  }
}
</script>
