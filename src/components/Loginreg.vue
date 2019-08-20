<template>
<div>
            <b-link id="show-btn" @click="showModal" href="#"><b>Login</b></b-link>
            <b-modal ref="my-modal" hide-footer title="Login">
              <div class="d-block ">
                  <form ref="form" @submit.prevent="login">
                    <b-form-group
                      :state="nameState"
                      label="Username"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                    >
                      <b-form-input
                        id="username-input"
                        v-model="name"
                        :state="nameState"
                        required
                      ></b-form-input>
                    </b-form-group>
                  
                    <b-form-group
                      :state="passState"
                      label="Password"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                    >
                      <b-form-input
                        id="pass-input"
                        type ="password"
                        v-model="password"
                        :state="nameState"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-button class="mt-3" type="submit">Login</b-button>
                  </form>
              </div>
            </b-modal>
          </div>
</template>

<script>
  export default {
    data(){
      return{
        name : '',
        password : '', 
      }
    },
    methods: {
      login(){
        let email = this.name
        let password = this.password
        this.$store.dispatch('login', {email, password})
        .then(() => this.$router.push('/afterlogin'))
        .catch(err => console.log(err))
      },
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    }
  }
</script>

<style>

p {
  color: black;
}
  
</style>