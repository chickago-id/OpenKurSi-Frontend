<template>
<body class="anu">
  <div>
    <b-container style="text-center">
      <b-card class="tengah" header="Sign Up">
        <div role="group" >
          <form @submit.prevent="save"> 
          <label for="input-live">Nama Lengkap</label>
          <b-form-input id="nama" v-model="akun.nama" placeholder="Masukkan Nama Anda"></b-form-input>
          <label for="input-live">Username</label>
          <b-form-input
            id="username"
            v-model="akun.username"
            placeholder="Masukkan Username Yang diinginkan"
          ></b-form-input>
          <label for="input-live">Email</label>
          <b-form-input
            id="email"
            v-model="akun.email"
            type="email"
            placeholder="Masukkan Email Anda"
          ></b-form-input>
          <label for="input-live">Password</label>
          <b-form-input
            id="password"
            v-model="akun.password"
            placeholder="Masukkan Password"
            type="password"
          ></b-form-input>
          <label for="input-live">Ulangi Password</label>
          <b-form-input
            id="password2"
            v-model="password2"
            placeholder="Ulangi Password"
            type="password"
          ></b-form-input>
          <br />
        <b-button block variant="info" type="submit">Sign Up</b-button>
          </form>
        </div>

        <tr>
          <!-- <td> -->
          <td text-allign="center">sudah punya akun?&nbsp; </td>
          <td>
            <loginnav />
          </td>
          <!-- </td> -->
        </tr>
      </b-card>
    </b-container>
  </div>
</body>
</template>

<script>
import loginnav from "@/components/Poplog";
import axios from 'axios';

export default {

  components: {
    loginnav
  },
  data() {
    return {
      password2:"",
      akun :{
        nama: "",
        username: "",
        email:"",
        password: ""
      },
      user:[]
    }
  },
  methods: { 
    async save(event){
      try{
        const res = await axios.post('http://167.71.203.32:8081/buat-akun', this.akun)
        this.user = res.data
        this.nama =''
        this.username = ''
        this.email = ''
        this.password = ''
        event.target.reset();
      }catch(e){
        console.log(e)
      }
     },
    }
  };
</script>

<style scoped>
.tengah {
  margin: 0 auto;
  float: center;
  margin-bottom: 10px;
  max-width: 25rem;
}
</style>