import { TokenKey } from '@/const/const'

export const saveToken = (token: string) => {
  sessionStorage.setItem(TokenKey, token)
}

export const removeToken = () => {
  sessionStorage.removeItem(TokenKey)
}

export const getToken = () => {
  return sessionStorage.getItem(TokenKey)
}

export const isEmptyObj = (obj: any) => {
  return Object.keys(obj).length === 0
}
