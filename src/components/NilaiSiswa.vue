<template>
  <div>
    <b-container>
      <b-card>
        <div class="materitengah">
          <h2>Nilai Siswa</h2>
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
              title="Nilai Siswa"
              header-bg-variant="primary"
              ref="my-modal"
              hide-footer
              style="text-center"
              >
            <form @submit.prevent="setNilaiSiswa">
            
              <!--<b-form-input v-model="data_nilai_siswa.id" type="hidden"></b-form-input> -->
              <label>Siswa</label>
              <b-form-input v-model="data_nilai_siswa.user.id_user" type="number"></b-form-input>
              <label>Kategori</label>
              <!-- <b-form-input v-model="data_nilai_siswa.kategoriNilai.id_kategori_nilai" type="number"></b-form-input> -->
              <b-form-select :options="provinsiops" v-model="selectprov" required></b-form-select>
              <!-- <label >Materi</label>
              <b-form-input v-model="data_nilai_siswa.kategoriNilai.materi.nama_materi" ></b-form-input>
               -->
              <label>Bobot Nilai</label>
              <b-form-input disabled v-model="selectprov"></b-form-input>
              <label>Nilai Input</label>
              <b-form-input v-model="data_nilai_siswa.nilai_input" type="number"></b-form-input>
              <label>Nilai Hitung</label>
              <b-form-input v-model="data_nilai_siswa.nilai_hitung" type="number"></b-form-input>
              <div style="text-align:center;">
                <b-button variant="primary" class="mt-3 btn-sm asd" type="submit" block>Simpan Materi</b-button>
              </div>
            </form> 
            </b-modal>
          </div>
          <br />
        </div> 
        <b-table striped hover 
          :items="dataNilaiSiswa"
          :fields="fields"
        > 
          <template slot="index" slot-scope="dataNilaiSiswa">
            {{ dataNilaiSiswa.index+1 }}
          </template>
          <template slot="user" slot-scope="dataNilaiSiswa">
              {{dataNilaiSiswa.item.user.nama_lengkap}}
          </template>
          <template slot="materi" slot-scope="dataNilaiSiswa">
              {{dataNilaiSiswa.item.kategoriNilai.materi.nama_materi}}
          </template>
          <template slot="kategori" slot-scope="dataNilaiSiswa">
              {{dataNilaiSiswa.item.kategoriNilai.nama_kategori}}
          </template>
          <template slot="bobotNilai" slot-scope="dataNilaiSiswa">
              {{dataNilaiSiswa.item.kategoriNilai.bobot_nilai}}%
          </template>
          <template slot="nilaiInput" slot-scope="dataNilaiSiswa">
              {{dataNilaiSiswa.item.nilai_input}}
          </template>
          <template slot="nilaiHitung" slot-scope="dataNilaiSiswa">
              {{dataNilaiSiswa.item.kategoriNilai.bobot_nilai}}
          </template>
          <template slot="Action" slot-scope="dataNilaiSiswa">
              <b-button size="sm" variant="warning" @click="editNilaiSiswa(dataNilaiSiswa)">Edit</b-button>&nbsp;
              <b-button size="sm" variant="danger" @click="delNilaiSiswa(dataNilaiSiswa.item.id_nilai_siswa)">Hapus</b-button>
          </template>
        </b-table> 
      </b-card>
    </b-container>
   </div>
</template>


<script>
import axios from "axios";

export default {
    components: {

    },
    data(){
      return{
        provinsiops:[{'text': 'Silakan Pilih', 'value':'', 'bobot':''}],
        selectprov: '',
        user_id:'',
        dataNilaiSiswa:[],
        fields: {
          index:{
            label:'No',
            sortable: true
          },
          user:{
            label:'Nama Siswa',
            sortable : true
          },
          materi: {
            label:"Nama Materi",
            sortable: true            
          },
          kategori: {
            label: "Kategori",
            sortable: true
          },
          bobotNilai:{
            label:'Bobot Nilai',
            sortable : true
          },
          nilaiInput: {
            label: "Nilai Input"
          },
          nilaiHitung: {
            label: "Nilai Hitung"
          },
          Action: {}
        },
        data_nilai_siswa:{
          id_nilai_siswa : '',
          user:{},
          kategoriNilai: {},
          nilai_input: '',
          nilai_hitung: '',
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
      this.getKategori()
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
        this.data_nilai_siswa.id_nilai_siswa = ''
        this.data_nilai_siswa.user = {}
        this.data_nilai_siswa.kategoriNilai = {}
        this.data_nilai_siswa.nilai_input = ''
        this.data_nilai_siswa.nilai_hitung = ''
        this.data_nilai_siswa.created_by = ''
        this.data_nilai_siswa.created_date = ''
        this.data_nilai_siswa.updated_by = ''
        this.data_nilai_siswa.updated_date = ''
        this.showModal()
      },
      getData(){
        axios.get(process.env.VUE_APP_ROOT_API+'/nilai-siswa')
        .then((response) => {
          this.dataNilaiSiswa = response.data.data;
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
    setNilaiSiswa(){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      
      if(this.data_nilai_siswa.id_nilai_siswa != '') {
        this.data_nilai_siswa.updated_by = this.user_id
        axios.post(process.env.VUE_APP_ROOT_API+'/nilai-siswa/'+this.data_nilai_siswa.id_nilai_siswa,
          this.data_nilai_siswa, { headers: ndas })
          .then((response) => {
            console.log(response, token)
            //this.getData()
          })
      } else { 
        //this.data_nilai_siswa.created_by = this.user_id
        //this.data_nilai_siswa.updated_by = this.user_id
        axios.post(process.env.VUE_APP_ROOT_API+'/nilai-siswa', 
          this.data_nilai_siswa, { headers: ndas })
          .then((data) => {
            console.log(data, token);
            /* data.data.forEach(item => {
              this.dataNilaiSiswa.push(item)
            }); */
            this.getData()
          });
      }
        this.getData()
        this.$refs["my-modal"].hide();
        alert("data berhasil disimpan")
    },
    editNilaiSiswa(dataNilaiSiswa){
      this.data_nilai_siswa.id_nilai_siswa = dataNilaiSiswa.item.id_nilai_siswa
      this.data_nilai_siswa.user.id_user = dataNilaiSiswa.item.user.id_user
      this.data_nilai_siswa.kategoriNilai.id_kategori_nilai = dataNilaiSiswa.item.kategoriNilai.id_kategori_nilai
     // this.data_nilai_siswa.kategoriNilai.materi.nama_materi = dataNilaiSiswa.item.kategoriNilai.materi.nama_materi
      this.data_nilai_siswa.kategoriNilai.bobot_nilai = dataNilaiSiswa.item.kategoriNilai.bobot_nilai
      this.data_nilai_siswa.nilai_input = dataNilaiSiswa.item.nilai_input
      this.data_nilai_siswa.nilai_hitung = dataNilaiSiswa.item.nilai_hitung
      this.data_nilai_siswa.updated_by = this.user_id
      this.$refs["my-modal"].show();
    },
    delNilaiSiswa(index){
      if(confirm("Do you really want to delete?")){
        const token = 'Bearer '+localStorage.getItem('token')
        const ndas = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
        console.log(index)
        axios.delete(process.env.VUE_APP_ROOT_API+'/nilai-siswa/'+index, { headers: ndas })
        .then((res) =>{
        console.log(res)
        this.dataKategoriNilai.splice(index, 1)
        }, (error) => {
          console.log(error)
        }) 
      }
    },
    getKategori(){
        axios.get(process.env.VUE_APP_ROOT_API+'/kategori-nilai')
        .then((response) => {
            response.data.data.forEach(item => {
                this.provinsiops.push({
                    text: item.nama_kategori,
                    value: item.id_kategori_nilai,
                    bobot: item.bobot_nilai
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