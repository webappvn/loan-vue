import apiClient from '@/helper/api'
import type { ProductInterface } from '@/interface/interface'

export const getProduct = (data: any) => {
  return apiClient.post('/get-product', data)
}

export const createProduct = (data: any) => {
  return apiClient.post('/create-product', { items: [data] })
}
export const deleteProduct = (id: any) => {
  return apiClient.delete('/delete-product', {
    data: {
      filter: {
        id
      }
    }
  })
}
export const updateProduct = (data: ProductInterface) => {
  const { id, ...rest } = data
  return apiClient.put('/update-product', {
    filter: {
      id
    },
    updateData: rest
  })
}
