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
                        <b-form-group label="Id Materi">
                          <b-form-select id="namamateri" :options="namamateriops" v-model="data_kelas.id_materi">
                             </b-form-select>
                        </b-form-group>

                        <b-form-group label="Jam Pilihan">
                             <b-form-input type="time" id="jam_pilihan" v-model='data_kelas.jam_pilihan'></b-form-input>
                        </b-form-group>

                        <b-form-group label="Tangal Mulai">
                          <b-form-input type="date" id="tgl_mulai" v-model='data_kelas.tgl_mulai'></b-form-input>
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
        statusop:[
            {value: null, text: 'Silakan Pilih', disabled: true},
            {value: 'aktif', text: 'Aktif'},
            {value: 'pending', text: 'Pending'},
                ],
        jkop:[
          { value: null, text: 'Silakan Pilih' ,  disabled: true},
          { value: 'reguler', text: 'Reguler' },
          { value: 'private', text: 'Private' },
          { value: 'enterprise', text: 'Enterprise'}
          ],
        data_kelas:{
            id:null,
            kode_kelas:'',
            id_materi:null,
            jam_pilihan:'',
            tgl_mulai:'',
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
      })
    },
    setKelas(){
        let isi = {
          'id_materi' : this.data_kelas.id_materi,
          'kode_kelas' : this.data_kelas.kode_kelas,
          'jam_pilihan' : this.data_kelas.jam_pilihan,
          'tgl_mulai' : this.data_kelas.tgl_mulai,
          'target_peserta' :  this.data_kelas.target_peserta,
          'jenis_kelas' : this.data_kelas.jenis_kelas,
          'biaya' : this.data_kelas.biaya,
          'jumlah_pertemuan' : this.data_kelas.jumlah_pertemuan,
          'status' : this.data_kelas.status,
          'kode_kelas' : this.data_kelas.id_materi +'.'+ this.data_kelas.jam_pilihan + '.' + this.data_kelas.tgl_mulai
        };
        console.log(isi)
        const token = 'Bearer '+localStorage.getItem('token')
        const ndas = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
         if(this.kelas.id != '')
          {
            axios.post(process.env.VUE_APP_ROOT_API+'/kelas/'+this.kelas.id, this.kelas, { headers: ndas })
            .then((response) => {
              // console.log(response, token)
              this.getKelas()
            })
          }else{
              axios.post(process.env.VUE_APP_ROOT_API+'/kelas', isi, { headers: ndas })
                .then(({data}) => {
                console.log(data, token);
                data.data.forEach(item => {
                this.kelas.push(item)
                });
                this.data_kelas.id='';
                this.data_kelas.id_materi='';
                this.data_kelas.kode_kelas='';
                this.data_kelas.jam_pilihan ='';
                this.data_kelas.tgl_mulai='';
                this.data_kelas.target_peserta='';
                this.data_kelas.jenis_kelas='';
                this.data_kelas.biaya='';
                this.data_kelas.jumlah_pertemuan='';
                this.data_kelas.status='';
            });
                this.$refs["my-modal"].hide();
          }
      },
      getKelas(){
        axios.get('http://localhost:8081/kelas')
        .then((res)=> {
            console.log(res)
            this.kelas = res.data

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
            const token = 'Bearer '+localStorage.getItem('token')
            const ndas = {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
          const id = this.kelas[index].id
          axios.delete(process.env.VUE_APP_ROOT_API+'/kelas/'+id, { headers: ndas })
        
      },    

    },

    mounted(){
       this.getMateri();  
       this.getKelas();
    },
  
}
</script>

