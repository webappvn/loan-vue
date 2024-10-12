import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ForgotPassWord from '@/views/ForgotPassWord.vue'
import ProductItem from '@/components/products/ProductItem.vue'
import { getToken } from '@/helper/utils'
import { useUserStore } from '@/stores/user'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      hideNavbar: true
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotPassWord
  },
  {
    path: '/product',
    name: 'product',
    component: ProductItem
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, _from, next) => {
  const token = getToken()
  const userStore = useUserStore()
  next()
  return

  // console.log('to: ', to)
  // login page
  if (to.name === 'login') {
    if (token) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
