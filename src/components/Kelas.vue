<template>
        <b-container>
            <b-card>
                <div slot="header">
                    <h3>Kelas</h3>
                </div>
                    <div class="text-right" style="padding: 5px;" >
                        <b-button
                              v-b-modal.modal-sm
                              variant="primary"
                              id="show-btn"
                              @click="showModal"
                              href="#"
                            >Tambah</b-button>
                        <b-modal
                            variant="primary"
                              title="Tambah Kelas"
                              header-bg-variant="primary"
                              
                              ref="my-modal"
                              hide-footer
                              style="text-center"
                        >
                      <b-form @submit.prevent="setKelas">
                        <b-form-group label="Nama Materi">
                          <b-form-select id="namamateri" :options="namamateriops" v-model="data_kelas.id_materi">
                             </b-form-select>
                        </b-form-group>

                        <b-form-group label="Jam Pilihan">
                             <b-form-input type="time" id="jam_pilihan" v-model='data_kelas.jam_pilihan'></b-form-input>
                        </b-form-group>

                        <b-form-group label="Tangal Mulai">
                          <b-form-input type="date" id="tgl_mulai" v-model='data_kelas.tanggal_mulai'></b-form-input>
                        </b-form-group>

                        <b-form-group label="Target Peserta">
                          <b-form-input id="target" type="number" min="0" v-model="data_kelas.target_peserta"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Jumlah Pertemuan">
                          <b-form-input id="jumlah_pertemuan" type="number" min="0" v-model="data_kelas.jumlah_pertemuan"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Biaya">
                          <b-form-input id="biaya" type="number" min="0" v-model="data_kelas.biaya"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Jenis Kelas">
                            <b-form-select id="status" type="text" :options="jkop" v-model="data_kelas.jenis_kelas"></b-form-select>  
                        </b-form-group>

                        <b-form-group label="Status">
                          <b-form-select id="status" type="text" :options="statusop" v-model="data_kelas.status"></b-form-select>
                        </b-form-group>

                        <div class="text-center">
                          <b-button type="submit" size="sm" variant="primary">Simpan</b-button>&nbsp;
                          <b-button to="/admin/kelas" size="sm" variant="danger">Kembali</b-button>
                        </div>
                      </b-form>
                        </b-modal>
                    </div>
                <b-table striped hover :items="kelas" :fields="fields">
                    <template slot="show_details" slot-scope="row">
                        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                        </b-button>
                     </template>
                    <template slot="row-details" slot-scope="row">
                        <b-card>
                          <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Kode Kelas :</b></b-col>
                            <b-col>{{ row.item.kode_kelas }}</b-col>
                          </b-row>
  
                          <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Jam Pilihan :</b></b-col>
                            <b-col>{{ row.item.jam_pilihan }}</b-col>
                          </b-row>
                          <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Biaya :</b></b-col>
                            <b-col>{{ row.item.biaya }}</b-col>
                          </b-row>
                          <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Jumlah Pertemuan :</b></b-col>
                            <b-col>{{ row.item.jumlah_pertemuan }}</b-col>
                          </b-row>

                          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                        </b-card>
                      </template>

                    <template slot="Action" slot-scope="kelas">
                        <b-button size="sm" variant="info" @click="topeserta(kelas.index)">Peserta</b-button>&nbsp;
                        <b-button size="sm" variant="warning" @click="editKelas(kelas)">Edit</b-button>&nbsp;
                        <b-button size="sm" variant="danger" @click="delKelas(kelas.index)">Hapus</b-button>
                    </template>
                </b-table>
            </b-card>
        </b-container>
</template>

<script>
import axios from 'axios'

export default {
    
    data() {
      return {
        fields: {
          'materi.nama_materi':{
            label:'Nama Kelas',
            sortable : true
          },
          tanggal_mulai:{
            label:'Tanggal Mulai',
            sortable : true
          },
          target_peserta:{
            label:'Target Peserta',
            sortable : true
          },
          // jenis_kelas:{
          //   label:'Jenis Kelas',
          //   sortable : true
          // },
          status:{
            lable:'Status'
          },
          show_details:{
            label:'Show Details',
          },
         
          
          Action:{
          }
        },
        statusop:[
            {value: null, text: 'Silakan Pilih', disabled: true},
            {value: 'aktif', text: 'Aktif'},
            {value: 'pending', text: 'Pending'},
                ],
        jkop:[
          { value: null, text: 'Silakan Pilih' ,  disabled: true},
          { value: 'profesi', text: 'Profesi' },
          { value: 'private', text: 'Private' },
          { value: 'intensif', text: 'Intensif'}
          ],
        data_kelas:{
            id:'',
            kode_kelas:'',
            id_materi:null,
            jam_pilihan:'',
            tanggal_mulai:'',
            target_peserta :'',
            jenis_kelas:null,
            biaya:'',
            jumlah_pertemuan:'',
            status:null
        },
        namamateriops:[{'text': 'Silakan Pilih', 'value':null ,  disabled: true}],
        kelas:[]
      }
    },
    methods:{
    showModal() {
      this.$refs["my-modal"].show();
    },
    
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    getMateri(){
    axios.get(process.env.VUE_APP_ROOT_API+'/materi')
      .then((response) => {
        // this.namamateri = response.data.data;
        // console.log(response)
        response.data.data.forEach(materi => {
            this.namamateriops.push({'text' : materi.nama_materi,
                'value' : materi.id
            })
        })
        console.log(response)
      })

    },
    setKelas(){
        let isi = {
          'id_materi' : this.data_kelas.id_materi,
          'kode_kelas' : this.data_kelas.kode_kelas,
          'jam_pilihan' : this.data_kelas.jam_pilihan,
          'tanggal_mulai' : this.data_kelas.tanggal_mulai,
          'target_peserta' :  this.data_kelas.target_peserta,
          'jenis_kelas' : this.data_kelas.jenis_kelas,
          'biaya' : this.data_kelas.biaya,
          'jumlah_pertemuan' : this.data_kelas.jumlah_pertemuan,
          'status' : this.data_kelas.status,
          'kode_kelas' : this.data_kelas.id_materi +'.'+ this.data_kelas.jam_pilihan + '.' + this.data_kelas.tanggal_mulai
        };
        console.log(isi)
        const token = 'Bearer '+localStorage.getItem('token')
        const ndas = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
         if(this.data_kelas.id != '')
          {
            console.log('masuk atas')
            axios.post(process.env.VUE_APP_ROOT_API+'/kelas/'+this.data_kelas.id, this.data_kelas, { headers: ndas })
            .then((response) => {
              // console.log(response, token)
              this.getKelas()
              this.$refs["my-modal"].hide();
            })
          }else{
              axios.post(process.env.VUE_APP_ROOT_API+'/kelas', isi, { headers: ndas })
                .then(({data}) => {
                console.log(data, token);
                // data.data.forEach(item => {
                // this.kelas.push(item)
                // });
                this.data_kelas.id='';
                this.data_kelas.id_materi='';
                this.data_kelas.kode_kelas='';
                this.data_kelas.jam_pilihan ='';
                this.data_kelas.tanggal_mulai='';
                this.data_kelas.target_peserta='';
                this.data_kelas.jenis_kelas='';
                this.data_kelas.biaya='';
                this.data_kelas.jumlah_pertemuan='';
                this.data_kelas.status='';
            });
                this.$refs["my-modal"].hide();
          }
          this.getKelas()
      },
      getKelas(){
        axios.get(process.env.VUE_APP_ROOT_API+'/kelas')
        .then((res)=> {
            console.log(res)
            this.kelas = res.data.data

        })
      },
      editKelas(kelas){
            this.data_kelas.id = kelas.item.id;
            this.data_kelas.id_materi = kelas.item.id_materi;
            this.data_kelas.kode_kelas = kelas.item.kode_kelas;
            this.data_kelas.jam_pilihan = kelas.item.jam_pilihan;
            this.data_kelas.tgl_mulai = kelas.item.tgl_mulai;
            this.data_kelas.target_peserta =kelas.item.target_peserta;
            this.data_kelas.jenis_kelas =kelas.item.jenis_kelas;
            this.data_kelas.biaya =kelas.item.biaya;
            this.data_kelas.jumlah_pertemuan =kelas.item.jumlah_pertemuan;
            this.data_kelas.status = kelas.item.status;
          
          this.$refs["my-modal"].show();
      },
      delKelas(index){
        if(confirm("Do you really want to delete?")){
            const token = 'Bearer '+localStorage.getItem('token')
            const ndas = {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
          const id = this.kelas[index].id
          axios.delete(process.env.VUE_APP_ROOT_API+'/kelas/'+id, { headers: ndas })
            .then(res =>{
            console.log(res)
            this.kelas.splice(index, 1);
        })
      }
      },    
      topeserta(index){
        const idnya_kelas = this.kelas[index].id
        this.$router.push('/statuspeserta/' + idnya_kelas)
      }
    },

    mounted(){
       this.getMateri();  
       this.getKelas();
    },
  
}
</script>

