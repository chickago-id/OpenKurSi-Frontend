<template>
  <div>
    <b-container>
      <b-card>
        <div class="materitengah">
          <h2>Kategori Nilai</h2>
          <div class="text-right">
              <b-button
              v-b-modal.modal-sm
              variant="primary"
              id="show-btn"
              @click="clear"
              href="#"
            >Tambah</b-button>
              <b-modal
              variant="primary"
              title="Kategori Nilai"
              header-bg-variant="primary"
              ref="my-modal"
              hide-footer
              style="text-center"
              >
            <form @submit.prevent="setKategoriNilai">
            
              <!--<b-form-input v-model="data_kategori_nilai.id" type="hidden"></b-form-input> -->
              <label>Nama Kategori</label>
              <b-form-input v-model="data_kategori_nilai.nama_kategori" ></b-form-input>
              <label >Materi</label>
              <b-form-select :options="provinsiops" v-model="data_kategori_nilai.materi.id" required></b-form-select>
              <!-- <b-form-input v-model="data_kategori_nilai.materi.id" ></b-form-input> -->
              <label>Bobot Nilai</label>
              <b-form-input min="0" max="100" v-model="data_kategori_nilai.bobot_nilai" type="number" ></b-form-input>
              <label>Created By</label>
              <b-form-input disabled v-model="data_kategori_nilai.created_by" type="number" ></b-form-input>
              <div style="text-align:center;">
                <b-button variant="primary" class="mt-3 btn-sm asd" type="submit" block>Simpan Materi</b-button>
              </div>
            </form> 
            </b-modal>
          </div>
          <br />
        </div>
        <b-table striped hover 
          :items="dataKategoriNilai"
          :fields="fields"
          :groupOptions="{
            enabled: true
          }"
        > 
          <template slot="index" slot-scope="dataKategoriNilai">
            {{ dataKategoriNilai.index+1 }}
          </template>
          
          <template slot="id" slot-scope="dataKategoriNilai">
            {{ dataKategoriNilai.item.id_kategori_nilai }}
          </template>
          <template slot="namaKategori" slot-scope="dataKategoriNilai">
            {{ dataKategoriNilai.item.nama_kategori }}
          </template> 
          <template slot="materi" slot-scope="dataKategoriNilai">
            {{ dataKategoriNilai.item.materi.nama_materi }}
          </template>
          <template slot="bobotNilai" slot-scope="dataKategoriNilai">
            {{ dataKategoriNilai.item.bobot_nilai }}
          </template>
          <template slot="Action" slot-scope="dataKategoriNilai">
              <b-button size="sm" variant="warning" @click="editKategori(dataKategoriNilai)">Edit</b-button>&nbsp;
              <b-button size="sm" variant="danger" @click="delKategori(dataKategoriNilai.item.id_kategori_nilai)">Hapus</b-button>
          </template>
        </b-table>
         
      
      <!-- <div v-for="(index, item) in dataKategoriNilai" :key="item.id_kategori_nilai">
          <ul> {{ index }}   </ul>

      </div> -->
            
      <p>Total Bobot Nilai {{total}} (In progress)</p>
      
      
      </b-card>
    </b-container>
   </div>
</template>


<script>
import axios from "axios";
export default {
    components: {

    },
    computed: {
      /* groupBy: function() {
      const map = new Map();
      this.dataKategoriNilai.forEach((item) => {
        const materi = keyGetter(item);
        if (!map.has(materi)) {
            map.set(materi, [item]);
        } else {
            map.get(materi).push(item);
        }
      });
    return map;
    }, */
      group: function() {
        console.log(this.dataKategoriNilai);
        return this.dataKategoriNilai.map()
      },
      total: function(){
        console.log(this.dataKategoriNilai);
        return this.dataKategoriNilai.reduce(function(total, item){

          return total + item.bobot_nilai; 
        },0);
      },
      
    },
    data(){
      return{
        user_id:'',
        dataKategoriNilai:[],
        selectprov: '',
        provinsiops:[{'text': 'Silakan Pilih', 'value':''}],
        fields: {
          index:{
            label:'No',
            sortable: true
          },
          namaKategori:{
            label:'Nama Kategori',
            sortable : true
          },
          materi: {
            nama_materi: {
              label:"Nama Materi",
              sortable: true
              }            
          },
          bobotNilai:{
            label:'Bobot nilai',
            sortable : true
          },
          Action: {}
        },
        data_kategori_nilai:{
          id_kategori_nilai : '',
          nama_kategori :'',
          materi : {},
          bobot_nilai :'',
          created_by :'',
          created_date: '',
          updated_by: '',
          updated_date: ''       
        }, 
      }
    },
    mounted(){
      this.getData()
      this.getinfo()
      this.getMateri()
    },
    methods:{
      getinfo() {
        if(localStorage.getItem('token') != null) {
          const token = 'Bearer '+localStorage.getItem('token')
          const ndas = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          }
          axios.get(process.env.VUE_APP_ROOT_API + '/profil', { headers: ndas })
          .then(response =>{
            let lengkapi = JSON.parse(response.data.data)
            this.user_id = lengkapi.user.id
            console.log(lengkapi, this.roles)
          })
        }else{
          this.roles = ''
        }
      },
      clear() {
        this.data_kategori_nilai.id_kategori_nilai=''
        this.data_kategori_nilai.nama_kategori =''
        this.data_kategori_nilai.materi.id = '' 
        this.data_kategori_nilai.bobot_nilai =''
        this.data_kategori_nilai.created_by =''
        this.data_kategori_nilai.created_date= ''
        this.data_kategori_nilai.updated_by= ''
        this.data_kategori_nilai.updated_date= ''
        this.showModal()
      },
      getData(){
        axios.get(process.env.VUE_APP_ROOT_API+'/kategori-nilai')
        .then((response) => {
          this.dataKategoriNilai = response.data.data;
        })
      },
      showModal() {
        this.data_kategori_nilai.created_by = this.user_id
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
    setKategoriNilai(){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      
      if(this.data_kategori_nilai.id_kategori_nilai != '') {
        this.data_kategori_nilai.updated_by = this.user_id
        axios.post(process.env.VUE_APP_ROOT_API+'/kategori-nilai/'+this.data_kategori_nilai.id_kategori_nilai,
          this.data_kategori_nilai, { headers: ndas })
          .then((response) => {
            console.log(response, token)
            //this.getData()
          })
      } else { 
        this.data_kategori_nilai.created_by = this.user_id
        this.data_kategori_nilai.updated_by = this.user_id
        axios.post(process.env.VUE_APP_ROOT_API+'/kategori-nilai', 
          this.data_kategori_nilai, { headers: ndas })
          .then((data) => {
            console.log(data, token);
            /* data.data.forEach(item => {
              this.dataKategoriNilai.push(item)
            }); */
            //this.getData()
          });
      }
        this.getData()
        this.$refs["my-modal"].hide();
        alert("data berhasil disimpan")
        location.reload()
    },
    editKategori(dataKategoriNilai){
      this.data_kategori_nilai.id_kategori_nilai = dataKategoriNilai.item.id_kategori_nilai
      this.data_kategori_nilai.nama_kategori = dataKategoriNilai.item.nama_kategori
      this.data_kategori_nilai.materi.id = dataKategoriNilai.item.materi.id
      this.data_kategori_nilai.bobot_nilai = dataKategoriNilai.item.bobot_nilai
      this.data_kategori_nilai.created_by = dataKategoriNilai.item.created_by
      this.$refs["my-modal"].show();
    },
    delKategori(index){
      if(confirm("Do you really want to delete?")){
        const token = 'Bearer '+localStorage.getItem('token')
        const ndas = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
        //const id_kategori_nilai = this.dataKategoriNilai[index].id_kategori_nilai
        console.log(index)
        axios.delete(process.env.VUE_APP_ROOT_API+'/kategori-nilai/'+index, { headers: ndas })
        .then((res) =>{
        console.log(res)
        this.dataKategoriNilai.splice(index, 1)
        }, (error) => {
          console.log(error)
        }) 
      } 
      this.getData()
      location.reload()
    },
    getMateri(){
        axios.get(process.env.VUE_APP_ROOT_API+'/materi')
        .then((response) => {
            response.data.data.forEach(item => {
                this.provinsiops.push({
                    text: item.nama_materi,
                    value: item.id
                })
            });
        })
     },    
  }
}

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