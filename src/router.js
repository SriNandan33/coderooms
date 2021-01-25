import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import RegisterUser from './views/RegisterUser.vue'
import LoginUser from './views/LoginUser.vue'
import Room from './views/Room.vue'
import ForgotPassword from './views/ForgotPassword'
import ResetPassword from './views/ResetPassword'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterUser
    },
    {
      path: '/login',
      name: 'login',
      component: LoginUser
    },
    {
      path: '/forgot_password',
      name: 'forgotpassword',
      component: ForgotPassword
    },
    {
      path: '/reset_password/:token',
      name: 'resetpassword',
      props: true,
      component: ResetPassword
    },
    {
      path: '/rooms/:roomId',
      name: 'room',
      component: Room,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  // if user already logged in prevent him going to login/register
  if ((to.name === 'login' || to.name === 'register') && loggedIn) {
    next({ name: 'dashboard' })
  }

  // if user is not logged in, redirect him to login page on protected routes
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next({ name: 'login' })
  }
  next()
})

export default router
