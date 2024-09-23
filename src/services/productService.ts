import apiClient from '@/helper/api'

export const getProduct = (data: any) => {
  return apiClient.post('/get-product', data)
}
