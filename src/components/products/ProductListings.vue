<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th v-for="item in columns" :key="item.key" scope="col" class="px-6 py-3">
              {{ item.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in products"
            :key="item.id"
            class="bg-white border-b hover:bg-gray-50"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                {{ index + 1 }}
              </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ item.name }}
            </th>
            <td class="px-6 py-4">{{ item.description }}</td>
            <td class="px-6 py-4"><img :src="item.image" /></td>
            <td class="px-6 py-4">{{ item.price }}</td>
            <td class="px-6 py-4">{{ item.type }}</td>
            <td class="flex items-center px-6 py-4">
              <button class="font-medium text-blue-600 hover:underline" @click="handleEdit(item)">
                Edit
              </button>
              <button
                class="font-medium text-red-600 hover:underline ms-3"
                @click="handleDelete(item)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-end mt-10">
      <PaginationPage />
    </div>
  </div>
</template>

<script>
import { deleteProduct, getProduct } from '@/services/productService'
import PaginationPage from '../navigation/PaginationPage.vue'
import router from '@/router'
export function debounce(func, wait) {
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
export default {
  components: {
    PaginationPage
  },
  data() {
    return {
      nameFill: '',
      typeFill: 'all',
      pagination: {
        current: 1,
        pageSize: 100,
        total: 0,
        onChange: async (page, size) => {
          getData(page, size)
        }
      },
      columns: [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
          width: 60
        },
        {
          title: 'Product name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image'
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price'
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: 'Action',
          key: 'action'
        }
      ],
      products: []
    }
  },
  // computed: {
  //   currentQuery() {
  //     return {
  //       name: this.$route.query.name,
  //       type: this.$route.query.type
  //     }
  //   }
  // },
  watch: {
    '$route.query': {
      handler: function (search) {
        this.getData({
          page: 0,
          size: 10,
          data: {
            name: this.$route.query.name,
            type: this.$route.query.type
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  // created() {
  //   this.getData = debounce(this.getDataRoot, 500)
  // },
  beforeMount() {
    this.getData({
      page: 0,
      size: 10,
      data: {
        name: this.$route.query.name,
        type: this.$route.query.type
      }
    })
  },
  methods: {
    async getData(passData) {
      const { data } = await getProduct(passData)
      this.products = data.data.items
    },
    async handleDelete(item) {
      try {
        deleteProduct(item.id)
        this.getData({
          page: 0,
          size: 10,
          data: {
            name: this.$route.query.name,
            type: this.$route.query.type
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    handleEdit(item) {
      router.push({ path: '/product', query: { id: `${item.id}` } })
    }
  }
}
</script>
