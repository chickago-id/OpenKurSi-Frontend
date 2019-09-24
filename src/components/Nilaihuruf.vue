<template>
  <div>

    <b-container class="tengah">
      <b-card>
        <div class="materitengah">
          <h2>Nilai Huruf</h2>
          <div class="text-right">
              <b-button
              v-b-modal.modal-sm
              variant="primary"
              id_nilai_huruf="show-btn"
              @click="showModal"
              href="#"
            >Tambah</b-button>
              <b-modal
              variant="primary"
              title="Nillai Huruf"
              header-bg-variant="primary"
              ref="my-modal"
              hide-footer
              style="text-center"
              >
            <form @submit.prevent="setNilaihuruf">
            
              <!-- <b-form-input v-model="data_nilaihuruf.id_nilai_huruf" type="hidden"></b-form-input> -->
              <!-- <label>Nilai Huruf</label>
              <b-form-input v-model="data_nilaihuruf.nilai_huruf" ></b-form-input>
              <label >Kode Materi</label>
              <b-form-input v-model="data_nilaihuruf.batas_bawah" type="number"></b-form-input>
              <label>Jumlah Pertemuan</label>
              <b-form-input v-model="data_nilaihuruf.batas_atas" type="number" ></b-form-input> -->
              
              <div style="text-align:center;">
                <b-button variant="primary" class="mt-3 btn-sm asd" type="submit" block>Simpan</b-button>
              </div>
            </form> 
            </b-modal>
          </div>
          <br />
        </div>
            <b-table striped hover :items="nilaihuruf" :fields="fields"> 
              <template slot="index" slot-scope="nilaihuruf">
                {{ nilaihuruf.index + 1 }}
              </template>
              <template slot="Action" slot-scope="nilaihuruf">
                  <b-button size="sm" variant="warning" @click="editnilaihuruf(nilaihuruf)">Edit</b-button>&nbsp;
                  <b-button size="sm" variant="danger" @click="delnilaihuruf(nilaihuruf.index)">Delete</b-button>
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
          nilai_huruf:{
            label:'Nilai Huruf',
            sortable : true
          },
          batas_bawah:{
            label:'Batas Bawah',
            sortable : true
          },
          batas_atas:{
            label:'Batas Atas',
            sortable : true
          },
          Action:{
          }
      },
      data_nilai_huruf:{
          id_nilai_huruf : '',
          nilai_huruf :'',
          batas_bawah :'',
          batas_atas :''
        },
      nilaihuruf:[]
    }
  },
  mounted(){
    this.getNilaihuruf()
  },
  
  methods:{
    getNilaihuruf(){
      axios.get(process.env.VUE_APP_ROOT_API+'/nilaihuruf')
      .then((response) => {
        this.nilaihuruf = response.data.data;
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
    setNilaihuruf(){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      if(this.data_nilaihuruf.id_nilai_huruf != '')
      {
        axios.post(process.env.VUE_APP_ROOT_API+'/nilaihuruf/'+this.data_nilaihuruf.id_nilai_huruf, this.data_nilaihuruf, { headers: ndas })
        .then((response) => {
          // console.log(response, token)
          this.getMateri()
        })
      }else{ 
        axios.post(process.env.VUE_APP_ROOT_API+'/nilaihuruf', this.data_nilaihuruf, { headers: ndas })
          .then(({data}) => {
            console.log(data, token);
            data.data.forEach(item => {
              this.nilaihuruf.push(item)
            });
            this.data_nilaihuruf.nilai_huruf = '';
            this.data_nilaihuruf.batas_bawah = '';
            this.data_nilaihuruf.batas_atas = '';

          });
      }
      this.$refs["my-modal"].hide();
    },
    editnilaihuruf(nilaihuruf){
      this.data_nilaihuruf.id_nilai_huruf = nilaihuruf.item.id_nilai_huruf;
      this.data_nilaihuruf.nilai_huruf = nilaihuruf.item.nilai_huruf;
      this.data_nilaihuruf.batas_atas = nilaihuruf.item.batas_atas;
     
      this.$refs["my-modal"].show();
    },
    delnilaihuruf(index){
      if(confirm("Do you really want to delete?")){
        const token = 'Bearer '+localStorage.getItem('token')
        const ndas = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
        const id_nilai_huruf = this.nilaihuruf[index].id_nilai_huruf
        console.log(index, id_nilai_huruf)
        axios.delete(process.env.VUE_APP_ROOT_API+'/nilaihuruf/'+id_nilai_huruf, { headers: ndas })
        .then(res =>{
          console.log(res)
          this.nilaihuruf.splice(index, 1);
        })
      }
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