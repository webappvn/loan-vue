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
