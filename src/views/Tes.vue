<template>
<body>
  <div>
    <b-container class="mt-1">
      <b-card class="tengah" style="color:white;">
        <div role="group">
          <form>
            <div class="hsatu">
              <h1>Daftar</h1>
            </div>
            <br />
            <!-- <br /> -->
            <label>
              <input type="text" id="namalengkap" v-model="namalengkap" required />
              <div class="label-text">Nama Lengkap</div>
            </label>
            <label>
              <input type="text" id="username" v-model="username" required />
              <div class="label-text">username</div>
            </label>
            <label>
              <input type="password" id="password" v-model="massage" required />
              <div class="label-text">Password</div>
            </label>
            <label>
              <input type="password" id="ulangipass" v-model="password" required />
              <div class="label-text">Password</div>
            </label>
            <button>Sign Up</button>
          </form>
        </div>
        <br />
        <!-- <b-button block variant="info" >Sign Up</b-button> -->
        <div class="text-center textt">
          <tr>
            <!-- <td> -->
            <td>sudah punya akun?</td>
            <!-- <td></td> -->
            <!-- </td> -->
            <td>
              <poplog />
            </td>
          </tr>
        </div>
      </b-card>
    </b-container>
  </div>
</body>
</template>

<script>
import poplog from "@/components/Poplog.vue";

export default {
  components: {
    poplog
  }
};
</script>

<style scoped>
.textt {
  color: black !important;
}
template {
  background-color: grey;
}
h1 {
  color: rgb(0, 0, 0);
}
.hsatu {
  background: #007bff;
  border-radius: 3rem;
}
.tengah {
  margin: 0 auto;
  float: center;
  margin-bottom: 10px;
  max-width: 25rem;
  background-color: #007bff38;
  border-radius: 20px;
}
.body {
  color: red;
}
body {
  /* background-color: grey; */
  font-family: "Open Sans", Helvetica;
}

form {
  text-align: center;
}

label {
  display: block;
  letter-spacing: 4px;
  padding-top: 5px;
  text-align: center;
}
label .label-text {
  color: #000000;
  cursor: text;
  font-size: 9px;
  line-height: 14px;
  text-transform: uppercase;
  -moz-transform: translateY(-25px);
  -ms-transform: translateY(-25px);
  -webkit-transform: translateY(-25px);
  transform: translateY(-25px);
  transition: all 0.3s;
}
label input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid #4a4a4a;
  color: rgb(0, 0, 0);
  font-size: 26px;
  letter-spacing: -1px;
  outline: 0;
  padding: 5px 13px;
  text-align: center;
  transition: all 0.3s;
  width: 200px;
}
label input:focus {
  max-width: 100%;
  width: 210px;
}
label input:focus + .label-text {
  color: #007bff;
  font-size: 13px;
  -moz-transform: translateY(-54px);
  -ms-transform: translateY(-54px);
  -webkit-transform: translateY(-54px);
  transform: translateY(-54px);
}
label input:valid + .label-text {
  font-size: 10px;
  -moz-transform: translateY(-74px);
  -ms-transform: translateY(-74px);
  -webkit-transform: translateY(-74px);
  transform: translateY(-74px);
}

button {
  background-color: #333333;
  border: 2px solid white;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: 13px;
  margin-top: 20px;
  padding: 5px 50px;
  text-transform: uppercase;
  transition: all 200ms;
}
button:hover,
button:focus {
  background-color: white;
  color: #333333;
  outline: 0;
}
</style>