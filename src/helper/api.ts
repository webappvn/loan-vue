import axios, { type AxiosProxyConfig, type InternalAxiosRequestConfig } from 'axios'
import { getToken } from './utils'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: { 'Content-Type': 'application/json' }
})

// chèn thêm token vào header trước khi gửi mỗi request
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const localToken = getToken()
  if (config?.headers?.Authorization === undefined) {
    config.headers['Authorization'] = `Bearer ${localToken}`
    // config.headers['loan'] = `Bearer ${localToken}`
  }
  return config
})

export default apiClient
