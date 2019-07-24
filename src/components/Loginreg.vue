<template>
<div>
            <b-button variant="link" id="show-btn" @click="showModal" href="#"><b><p>Login.</p></b></b-button>
            <b-modal ref="my-modal" hide-footer title="Login">
              <div class="d-block ">
                  <form ref="form" @submit.stop.prevent="handleSubmit">
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
                  </form>
                  <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                      :state="nameState"
                      label="Password"
                      label-for="name-input"
                      invalid-feedback="Name is required"
                    >
                      <b-form-input
                        id="pass-input"
                        type ="password"
                        v-model="name"
                        :state="nameState"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </form>
              </div>
            <b-button class="mt-3" block @click="hideModal">Login</b-button>
            </b-modal>
          </div>
</template>

<script>
  export default {
    methods: {
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