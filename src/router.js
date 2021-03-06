import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

// export default new Router({
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: Home
//     },
//     {
//       path: "/afterlogin",
//       name: "afterlogin",
//       component: () => import("./views/Afterlogin.vue")
//     },
//     {
//       path: '/admin/kelas',
//       name: 'kelas',
//       component: () => import('./views/Vkelas.vue')
//     },
//     {
//       path: '/admin/kelas/tambah',
//       name: 'tambah_kelas',
//       component: () => import('./views/Vnewkelas.vue')
//     },
//     {
//       path: "/jadwal",
//       name: "jadwal",
//       component: () => import("./views/Penjadwal.vue")
//     },
//     {
//       path: "/materi",
//       name: "materi",
//       component: () => import("./views/Penmateri.vue")
//     },
//     {
//       path: "/nilai",
//       name: "nilai",
//       component: () => import("./views/Pennilai.vue")
//     },
//     {
//       path: "/absensi",
//       name: "absensi",
//       component: () => import("./views/Absensi.vue") 
//     },
//     {
//       path: "/fill",
//       name: 'lengkapi',
//       component: () => import('./views/Vlengkapi.vue')
//     }
//   ]
// });

let router = new Router({
  mode: 'history',
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
      component: () => import("./views/Jadwal.vue")
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
    }
    ,
    {
      path:"/nilaihuruf",
      name:"nilaihuruf",
      component:() => import ("./views/Nilaihuruf.vue")
    },
    {
      path: "/absensi",
      name: "absensi",
      component: () => import("./views/Absensi.vue")
    },
    {
      path: "/fill",
      name: 'lengkapi',
      component: () => import('./views/Vlengkapi.vue')
    },
    {
      path: "/tes",
      name: 'tes',
      component: () => import('./views/Tes.vue')
    },
    {
      path: "/profile",
      name: 'profile',
      component: () => import('./views/Vprofile.vue')
    },
    {
      path: "/addjadwal",
      name: 'addjadwal',
      component: () => import('./views/Vaddjadwal.vue')
    },{
      path: "/absensiswa",
      name: 'ansensiswa',
      component: () => import('./views/AbsenSiswa.vue')
    },
    {
      path: "/statuspeserta/:id",
      name: 'statuspeserta',
      component: () => import('./views/Vstatuspeserta.vue')
    },
    {
      path: "/kategori-nilai",
      name: 'kategoriNilai',
      component: () => import('./views/KategoriNilai.vue')
    },
    {
      path: "/nilai-siswa",
      name: 'nilaiSiswa',
      component: () => import('./views/NilaiSiswa.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
