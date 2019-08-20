<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand :to="isLoggedIn?'/':'/'" >OpenKursi</b-navbar-brand>
           <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="isLoggedIn && userRole == 'Admin'">
          <!-- <b-nav-item to="/">Home</b-nav-item> -->
          <b-nav-item to="/admin/kelas">Kelas</b-nav-item>
          <!--<b-nav-item to="/admin/kelas">Kelas</b-nav-item>-->
           <b-nav-item to="/materi">Materi</b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav v-else-if="isLoggedIn && userRole == 'Peserta'">
          <!-- <b-nav-item to="/">Home</b-nav-item> -->
          <b-nav-item to="/afterlogin">Kelas</b-nav-item>

        </b-navbar-nav>
        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <!-- <b-nav-item href="#">Home</b-nav-item> -->
            <!-- <b-nav-item href="#"></b-nav-item> -->
          </b-navbar-nav>
          <b-nav-form>
            <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
          </b-nav-form>
          <b-navbar-nav>
            <b-nav-item-dropdown right v-if="isLoggedIn && userRole == 'Peserta'" >
                <template slot="button-content"><em>Siswa</em></template>
                <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown right v-else-if="isLoggedIn && userRole == 'Admin'" >
                <template slot="button-content"><em>Admin</em></template>
                <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
           <!-- <b-nav-item v-if="isLoggedIn" @click="logout">
              Logout
            </b-nav-item>-->
            <b-nav-item v-else>
              <Loginnav />
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
import Loginnav from "./Poplog";

export default {
  name: "App",
  components: {
    Loginnav
  },
  data(){
    return{
      roles: '',
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.isLoggedIn
    },
    userRole(){
      return this.$store.getters.authRole
    }
  },
  mounted(){
    this.getinfo()
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      .then(() => window.location = '/')
    },
    getinfo()
    {
      if(localStorage.getItem('token') != null)
      {
        const token = 'Bearer '+localStorage.getItem('token')
        const ndas = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
        axios.get(process.env.VUE_APP_ROOT_API + '/profil', { headers: ndas })
        .then(response =>{
            let lengkapi = JSON.parse(response.data.data)
            this.roles = lengkapi.user.role
            console.log(lengkapi, this.roles)
        })
      }else{
        this.roles = ''
      }
    }
  }
};
</script>

<style>
/* navbar {
  position: fixed;
} */
</style>