<template>
  <div>

    <b-container class="tengah">
      <b-card>
        <div class="materitengah">
          <h2>Materi</h2>
          <div class="text-right">
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
            <form @submit.prevent="setMateri">
            
              <!-- <b-form-input v-model="data_materi.id" type="hidden"></b-form-input> -->
              <label>Nama Materi</label>
              <b-form-input v-model="data_materi.nama_materi" class="col-8"></b-form-input>
              <label for="input-with-list">Kode Materi</label>
              <b-form-input v-model="data_materi.kode_materi" class="col-5"></b-form-input>
              <div style="text-align:center;">
                <b-button variant="primary" class="mt-3 btn-sm asd" type="submit" block>Simpan Materi</b-button>
              </div>
            </form> 
            </b-modal>
          </div>
          <br />
        </div>
            <b-table striped hover :items="materi" :fields="fields"> 
              <template slot="index" slot-scope="materi">
                {{ materi.index + 1 }}
              </template>
              <template slot="Action" slot-scope="materi">
                  <b-button size="sm" variant="warning" @click="editmateri(materi)">Edit</b-button>&nbsp;
                  <b-button size="sm" variant="danger" @click="delmateri(materi.index)">Hapus</b-button>
              </template>
            </b-table>  
      </b-card>
    </b-container>
  </div>
</template>


<script>
import axios from "axios";
import { constants } from 'crypto';
export default {
  components: {
   
  },
  data(){
    return{
      fields:{
          index:{
            label:'No',
            sortable : true
          },
          kode_materi:{
            label:'Kode Materi',
            sortable : true
          },
          nama_materi:{
            label:'Nama Materi',
            sortable : true
          },
          Action:{
          }
      },
      data_materi:{
          id : '',
          nama_materi :'',
          kode_materi :''
        },
      materi:[]
    }
  },
  mounted(){
    this.getMateri()
  },
  
  methods:{
    getMateri(){
      axios.get(process.env.VUE_APP_ROOT_API+'/materi')
      .then((response) => {
        this.materi = response.data.data;
        // console.log(response)
      })
    },
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
    setMateri(){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      if(this.data_materi.id != '')
      {
        axios.post(process.env.VUE_APP_ROOT_API+'/materi/'+this.data_materi.id, this.data_materi, { headers: ndas })
        .then((response) => {
          // console.log(response, token)
          this.getMateri()
        })
      }else{ 
        axios.post(process.env.VUE_APP_ROOT_API+'/materi', this.data_materi, { headers: ndas })
          .then(({data}) => {
            console.log(data, token);
            data.data.forEach(item => {
              this.materi.push(item)
            });
            this.data_materi.nama_materi = '';
            this.data_materi.kode_materi = '';
          });
      }
      this.$refs["my-modal"].hide();
    },
    editmateri(materi){
      this.data_materi.id = materi.item.id;
      this.data_materi.nama_materi = materi.item.nama_materi;
      this.data_materi.kode_materi = materi.item.kode_materi;
      this.$refs["my-modal"].show();
    },
    delmateri(index){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      const id = this.materi[index].id
      console.log(index, id)
      axios.delete(process.env.VUE_APP_ROOT_API+'/materi/'+id, { headers: ndas })
      .then(res =>{
        console.log(res)
        this.materi.splice(index, 1);
      })
    }
  }
};
</script>



<style>
.tengah {
  max-width: 60rem;
  float: center;
}
.materitengah {
  text-align: center;
}
</style>