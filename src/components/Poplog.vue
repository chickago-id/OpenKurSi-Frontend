<template>
  <div>
    <!-- <b-button id="show-btn" variant="link" @click="showModal" href="#"> -->
      <b-link style="color: black" @click="showModal">Login</b-link>
    <!-- </b-button> -->
    <div class="asd">
      <b-modal
        ref="my-modal"
        body-bg-variant="light"
        hide-header
        hide-footer
        title="Login"
        style="body-radius: 5rem"
        id="modal"
        dialogClassName="border-radius-2"
      >
        <div>
          <button type="button" class="close mt-1 mr-1" aria-label="Close" @click="hideModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- <div class="modal-dialog"> -->
        <!-- <div class="modal-content"> -->
        <!-- <div class="modal-backdrop"> -->
        <h1>Masuk</h1>
        <form ref="form" variant="dark" @submit.prevent="login">
        <div class="d-block">
            <label>
              <input type="text" id="username" v-model="username" required />
              <div class="label-text">Username</div>
            </label>
            <br />
            <label>
              <input type="password" id="password" v-model="password" required />
              <div class="label-text">Password</div>
            </label>
        </div>
        <div class="text-center">
           <b-button type="submit" variant="info">
            <b-spinner  v-if="status=='loading'" small ></b-spinner>
                Login
            </b-button>
        </div>
        </form>
        <br />
        <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {

  data(){
    return{
      username:'',
      password:''
    }
  },
  computed:{
    status(){
      return this.$store.getters.authStatus;
    }
  },
  methods: {
    login(){
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', {username, password})
      .then(() => {
        this.$router.push('/fill')
        this.hideModal()
        })
      .catch(err => console.log(err))
    },


    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();

    },
    test(){
      this.$refs.Spinner.show();
      setTimeout(function () {
        this.$refs.Spinner.hide();
      }.bind(this), 5000);
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    }
  }
};
</script>
<style scoped>
.border-radius-2 div {
  border-radius: 2px !important;
}
.close {
  color: black;
}
.modal-content {
  -webkit-border-radius: 10px !important;
  -moz-border-radius: 10px !important;
  border-radius: 10px !important;
}
.modal {
  /* other stuff we already covered */

  width: 600px;
}
h1 {
  padding-left: 10px;
  text-align: center;
  color: black;
}
body {
  background-color: #333333;
  font-family: "Open Sans", Helvetica;
}

form {
  text-align: center;
}

label {
  display: block;
  letter-spacing: 4px;
  padding-top: 30px;
  text-align: center;
}
label .label-text {
  color: #000000;
  cursor: text;
  font-size: 10px;
  line-height: 10px;
  text-transform: uppercase;
  -moz-transform: translateY(-34px);
  -ms-transform: translateY(-34px);
  -webkit-transform: translateY(-34px);
  transform: translateY(-34px);
  transition: all 0.3s;
}
label input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid #4a4a4a;
  color: black;
  font-size: 26px;
  letter-spacing: -1px;
  outline: 0;
  padding: 5px 20px;
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
  -moz-transform: translateY(-74px);
  -ms-transform: translateY(-74px);
  -webkit-transform: translateY(-74px);
  transform: translateY(-74px);
}
label input:valid + .label-text {
  font-size: 13px;
  -moz-transform: translateY(-74px);
  -ms-transform: translateY(-74px);
  -webkit-transform: translateY(-74px);
  transform: translateY(-74px);
}

/*button {
  background-color: #333333;
  border: 2px solid white;
  border-radius: 27px;
  color: white;
  cursor: pointer;
  font-size: 20px;
  margin-top: 20px;
  padding: 15px 30px;
  text-transform: uppercase;
  transition: all 200ms;
}
button:hover,
button:focus {
  background-color: white;
  color: #333333;
  outline: 0;
}*/
p {
  color: white;
}
</style>