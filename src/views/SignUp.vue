<template>
<body class="anu">
  <div>
    <b-container style="text-center">
      <b-card class="tengah" header="Sign Up">
        <div role="group">
          <label for="input-live">Nama Lengkap</label>
          <b-form-input id="nama" v-model="nama" placeholder="Masukkan Nama Anda"></b-form-input>
          <label for="input-live">Username</label>
          <b-form-input
            id="username"
            v-model="username"
            placeholder="Masukkan Username Yang diinginkan"
          ></b-form-input>
          <label for="input-live">Email</label>
          <b-form-input
            id="email"
            v-model="email"
            placeholder="Masukkan Email Anda"
          ></b-form-input>
          <label for="input-live">Password</label>
          <b-form-input
            id="password"
            v-model="password"
            placeholder="Masukkan Password"
            type="password"
          ></b-form-input>
          <label for="input-live">Ulangi Password</label>
          <b-form-input
            id="password"
            v-model="password"
            placeholder="Ulangi Password"
            type="password"
          ></b-form-input>
        </div>
        <br />
        <b-button block variant="info">Sign Up</b-button>
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

export default {
  components: {
    loginnav
  },
  data() {
    return {
      nama: "",
      username: "",
      email:"",
      password: ""
    };
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
.body {
  color: red;
}
</style>