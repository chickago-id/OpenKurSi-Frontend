import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/afterlogin',
      name: 'afterlogin',
      component: () => import('./views/Afterlogin.vue')
    },
    {
      path: '/jadwal',
      name: 'jadwal',
      component: () => import('./views/Jadwal.vue')
    },
    {
      path: '/admin/kelas',
      name: 'kelas',
      component: () => import('./views/Vkelas.vue')
    },
    {
      path: '/admin/kelas/tambah',
      name: 'tambah_kelas',
      component: () => import('./views/Vnewkelas.vue')
    }
  ]
})