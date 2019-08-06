<template>
  <container>
    <div>
      <b-button
        v-b-modal.modal-sm
        variant="primary"
        id="show-btn"
        @click="showModal"
        href="#"
      >Tambah</b-button>
    
        <b-modal
        variant="primary"
        title="Materi"
        header-bg-variant="warning"
        size="sm"
        ref="my-modal"
        hide-footer
        style="text-center"
      >
      <form @submit.prevent="setMateri" >
        <label>Nama Materi</label>
        <b-form-input v-model="data_materi.nama_materi" class="col-8"></b-form-input>
        <label for="input-with-list">Kode Materi</label>
        <b-form-input v-model="data_materi.kode_materi" class="col-5"></b-form-input>
        <div style="text-align:center;">
          <b-button variant="primary" class="mt-3 btn-sm asd" type="submit" block>Tambah Materi</b-button>
        </div>
      </form> 
      </b-modal>
 
      
    </div>
  </container>
</template>

<script>
import axios from 'axios';
export default {
   data(){
      return{
        data_materi:{
          nama_materi :'',
          kode_materi :''
        },
        materi:[]
      }
   },

  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    setMateri(event){
      const res = axios.post(process.env.VUE_APP_ROOT_API+'/materi' ,this.data_materi)
      this.materi = res.data
      this.kode_materi = ''
      this.nama_materi =''
      event.target.reset();
      this.$refs["my-modal"].hide();

    },
  }
};
</script>

<style scoped>
.block {
  max-width: 20rem;
  float: center;
}
p {
  color: black;
}
label {
  color: grey;
}
title {
  text-align: center;
}
.asd {
  max-width: 7rem;
  margin-left: 30%;
}
form {
  width: 90%;
  background-color: #c0d7f8;
}
</style>