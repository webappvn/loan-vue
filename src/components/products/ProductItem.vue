<template>
  <div class="bg-gray-100 p-8 flex-auto">
    <h1 class="text-3xl font-semibold text-center mb-6">Product Item</h1>
    <div class="max-w-[700px] m-auto flex gap-10">
      <div class="w-[300px]">
        <img :src="itemdata.image" class="w-[300px] h-[300px] mb-5" />
        <div>
          <label>Image url</label>
          <input
            v-model="itemdata.image"
            type="text"
            class="mt-4 w-full border-solid border p-2 rounded-md focus:outline-none"
            @change="onChangeData"
          />
        </div>
      </div>
      <div>
        <div class="mb-5">
          <div>
            <label>Name</label>
          </div>
          <div>
            <input
              v-model="itemdata.name"
              type="text"
              class="mt-3 w-full border-solid border p-2 rounded-md focus:outline-none"
              @change="onChangeData"
            />
          </div>
        </div>
        <div class="mb-5">
          <div>
            <label>Type</label>
          </div>
          <div>
            <select
              id="type"
              v-model="itemdata.type"
              name="type"
              class="mt-3 w-full border-solid border p-2 rounded-md focus:outline-none"
              @change="onChangeData"
            >
              <option value="facility">Facility</option>
              <option value="service">Service</option>
            </select>
          </div>
        </div>
        <div class="mb-5">
          <div>
            <label>Price</label>
          </div>
          <div>
            <input
              v-model="itemdata.price"
              type="text"
              class="mt-3 w-full border-solid border p-2 rounded-md focus:outline-none"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');"
              @input="onChangeData"
            />
          </div>
        </div>

        <div class="mb-5">
          <label>Description:</label>
          <textarea
            v-model="itemdata.description"
            type="text"
            class="mt-3 w-full border-solid border p-2 rounded-md focus:outline-none"
            @change="onChangeData"
          ></textarea>
        </div>
        <div class="flex gap-2">
          <!-- có dữ liệu -> có thể sửa xóa -->
          <template v-if="!isEmptyData">
            <template v-if="isEdited">
              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg" @click="handleEdit">
                Edit
              </button>
              <button class="bg-gray-500 text-white px-4 py-2 rounded-lg" @click="handleCancel">
                Cancel
              </button>
            </template>
            <button class="text-white px-4 py-2 rounded-lg bg-red-500" @click="handelDelete">
              Delete
            </button>
          </template>
          <!-- chỉ tạo mới do không có dữ liệu -->
          <button v-else class="bg-blue-500 text-white px-4 py-2 rounded-lg" @click="handleCreate">
            Create
          </button>
        </div>
      </div>
    </div>
    <NotiPopupDemo
      v-if="notification"
      v-model="notification"
      v-model:is-open="notification"
      :content="notificationContent"
      :is-close="closeNotification"
      @on-close-loan="closeNotification"
    />
    <!-- <NotificationPopup
      v-if="notification"
      v-model="notification"
      v-model:is-open="notification"
      :content="notificationContent"
      :close-notification="closeNotification"
      @on-close="closeNotification"
    >
      <template #title="slotProps">{{ slotProps.childName }} Thông báo! </template>
      <span>{{ notificationContent }}</span>
    </NotificationPopup> -->
  </div>
</template>
<script lang="ts" setup>
import type { ProductInterface } from '@/interface/interface'
import NotificationPopup from '../share/NotificationPopup.vue'
import NotiPopupDemo from '../share/NotiPopupDemo.vue'
import { createProduct, deleteProduct, getProduct, updateProduct } from '@/services/productService'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isEmptyObj } from '@/helper/utils'

const rootData = ref<ProductInterface>({})
const itemdata = ref<ProductInterface>({})
const isEdit = ref(false)

// hiển thị notification
const notification = ref(false)
const notificationContent = ref('')

function notity(content: string, timeout?: number) {
  notificationContent.value = content
  notification.value = true
  setTimeout(() => {
    notification.value = false
  }, timeout || 1000)
}
function closeNotification() {
  notification.value = false
  notificationContent.value = 'Thành công Demo'
}
// kieểm tra có dữ liệu product
const isEmptyData = computed(() => isEmptyObj(rootData.value))
// kiểm tra người dùng đã sửa dữ liệu
const isEdited = ref(false)

const handleCreate = async () => {
  try {
    const { data } = await createProduct(itemdata.value)
    if (data.newĐata.insertedCount === 1) {
      notification.value = true
      rootData.value = itemdata.value
      isEdited.value = true
    }
  } catch (error) {
    console.log('create false!!!')
  }
}
const handleEdit = async () => {
  try {
    const { data } = await updateProduct(itemdata.value)
    if (data.newĐata.matchedCount === 1) {
      notification.value = true
      rootData.value = itemdata.value
      isEdited.value = false
    }
  } catch (error) {
    console.log(error)
  }
}
function handleCancel() {
  isEdited.value = false
  itemdata.value = rootData.value
}
const handelDelete = async () => {
  console.log('id: ', useRoute())
  const { id } = useRoute().query

  try {
    const { data } = await deleteProduct(id)
    console.log(data)
  } catch (error) {
    console.log('loi')
  }
}
onBeforeMount(async () => {
  const { id } = useRoute().query
  if (id) {
    isEdit.value = true
    const { data } = await getProduct({ data: { id } })
    itemdata.value = data.data.items?.[0] || {}
    rootData.value = { ...itemdata.value }
    console.log('data', itemdata.value)

    if (isEmptyObj(itemdata.value)) {
      isEdit.value = false
      notity(`Product Id: ${id} không tồn tại`)
    }
  }
})
//
const onChangeData = () => {
  isEdited.value = true
}
</script>
