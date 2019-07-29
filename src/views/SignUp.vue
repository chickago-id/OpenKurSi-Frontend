<template>
<body class="anu">
  <div>
    <b-container style="text-center">
      <b-card class="tengah" header="Sign Up">
        <div role="group">
          <label for="input-live">Nama Lengkap</label>
          <b-form-input id="namalengkap" v-model="nama" placeholder="Masukkan Nama Anda"></b-form-input>
          <label for="input-live">Username</label>
          <b-form-input
            id="username"
            v-model="username"
            placeholder="Masukkan Username Yang diinginkan"
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
          <td text-allign="center">sudah punya akun?</td>
          <td>
            <loginreg />
          </td>
          <!-- </td> -->
        </tr>
      </b-card>
    </b-container>
  </div>
</body>
</template>

<script>
import loginreg from "@/components/Loginreg";

export default {
  components: {
    loginreg
  },
  data() {
    return {
      name: "",
      username: "",
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