import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/afterlogin",
      name: "afterlogin",
      component: () => import("./views/Afterlogin.vue")
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
    },
    {
      path: "/jadwal",
      name: "jadwal",
      component: () => import("./views/Penjadwal.vue")
    },
    {
      path: "/materi",
      name: "materi",
      component: () => import("./views/Penmateri.vue")
    },
    {
      path: "/nilai",
      name: "nilai",
      component: () => import("./views/Pennilai.vue")
    },
    {
      path: "/absensi",
      name: "absensi",
      component: () => import("./views/Absensi.vue") 
    }
  ]
});
