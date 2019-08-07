<template>
    
        <b-container>
            <b-card
            >
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
                          <b-form-select id="namamateri" :options="namamateriops" v-model="kelas.namamateri">
                             </b-form-select>
                        </b-form-group>

                        <b-form-group label="Jam Pilihan">
                             <b-form-input type="time" id="jam_pilihan" v-model='kelas.jam_pilihan'></b-form-input>
                        </b-form-group>

                        <b-form-group label="Tangal Mulai">
                          <b-form-input type="date" id="tgl_mulai" v-model='kelas.tgl_mulai'></b-form-input>
                        </b-form-group>

                        <b-form-group label="Target Peserta">
                          <b-form-input id="target" type="number" min="0" v-model="kelas.target_peserta"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Status">
                          <b-form-select id="status" type="text" :options="status" v-model="kelas.status"></b-form-select>
                        </b-form-group>
                        <div class="text-center">
                          <b-button type="submit" size="sm" variant="primary">Simpan</b-button>&nbsp;
                          <b-button to="/admin/kelas" size="sm" variant="danger">Kembali</b-button>
                        </div>
                      </b-form>
                        </b-modal>
                    </div>
                <b-table striped hover :items="items" :fields="fields">
                    <template slot="Action">
                        <b-button size="sm" variant="warning">Edit</b-button>&nbsp;
                        <b-button size="sm" variant="danger">Hapus</b-button>
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
        fields: ['kode', 'nama_materi', 'jam_pilihan', 'tanggal_mulai', 'target_peserta','status', 'Action'],
        items: [],
        status:['Aktif','Pending'],
        kelas:{
            namamateri:null,
            jam_pilihan:'',
            tgl_mulai:'',
            target_peserta :'',
            status:''
        },
        namamateriops:[{'text': 'Silakan Pilih', 'value':null}]
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
      })
    },
    setKelas(){
        const res = axios.post('http://192.168.43.117:3000/kelas', this.kelas); 
                console.log(res)
                this.kelas.namamateri='';
                this.kelas.jam_pilihan ='';
                this.kelas.tgl_mulai='';
                this.kelas.target_peserta='';
                this.kelas.status='';

            this.$refs["my-modal"].hide();
           
    },    

    },

    mounted(){
       this.getMateri();  
    },
  
}
</script>

