<template>
<body class="anu">
  <div>
    <b-container style="text-center">
    <!-- <b-alert class="tengah" v-model="showDismissibleAlert" variant="danger" dismissible><p v-html="notif"></p></b-alert> -->
    <b-alert class="tengah" v-model="showAlertBerhasil" variant="success" dismissible><p>Pendaftaran Berhasil, Silakan Login</p></b-alert>
      <b-alert
        class="tengah"
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p v-html="notif"></p>
        <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
        <b-progress
          variant="warning"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>
      <b-card class="tengah" header="Sign Up">
        <div role="group" >
          <form @submit.prevent="save"> 
          <label for="input-live">Nama Lengkap</label>
          <b-form-input id="nama" v-model="akun.nama_lengkap" placeholder="Masukkan Nama Anda"></b-form-input>
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
        nama_lengkap: "",
        username: "",
        email:"",
        password: ""
      },
      showDismissibleAlert: false,
      showAlertBerhasil: false,
      user:[],
      notif: '',
      dismissSecs: 3,
      dismissCountDown: 0,
    }
  },
  methods: { 
    async save(event){
      try{

        const res = await axios.post(process.env.VUE_APP_ROOT_API+'/buat-akun', this.akun)
        if(res.data.status == "ok")
        {
          this.showAlertBerhasil = true
          // this.showDismissibleAlert = false
          this.user = res.data.data
          this.akun.nama_lengkap =''
          this.akun.username = ''
          this.akun.email = ''
          this.akun.password = ''
          this.password2 = ''
          event.target.reset();
        }else{
          // this.showDismissibleAlert = true
          this.showAlertBerhasil = false
          this.notif = res.data.message
          // this.pesangagal(this.notif)
          // this.$bvModal.show('bv-modal-example')
          this.showAlert()
        }
      }catch(e){
        console.log(e)
      }
     },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
      },
    showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    // async save(event){
    //     try{
    //       let obj = this;
    //       axios.post(process.env.VUE_APP_ROOT_API+'/buat-akun', this.akun).then(function(response){
    //         console.log(response.data)
    //         if(response.data.status == "ok"){
    //           obj.user = response.data.data
    //           obj.nama_lengkap =''
    //           obj.username = ''
    //           obj.email = ''
    //           obj.password = ''
    //           event.target.reset();
    //         }else{
    //           obj.showDismissibleAlert = true
    //           obj.notif = response.data.message

    //         }
    //       })
    //     }catch(e){
    //       console.log(e)
    //     }
    //   },
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