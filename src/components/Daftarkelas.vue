<template>
  <div>
    <b-container>
            <b-card
                title="Status">
                <b-table striped hover :items="items2" :fields="fields2">
                    <template slot="Action" slot-scope="items2">
                        <b-button size="sm" variant="danger" @click="delklsp(items2.index)">Hapus</b-button>
                    </template>
                </b-table>
            </b-card>
    </b-container>
    <br>
    <b-container>
      <b-card>
           <b-table striped hover :items="kelas" :fields="fields">
                <template slot="Action" slot-scope="kelas">
                        <b-button size="sm" variant="primary" @click="kelasbaru(kelas.index)"> Tambah</b-button>
                </template>
           </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {  
      fields:{
        'materi.nama_materi':{
            label:'Kelas',
            sortable : true
        },
        tanggal_mulai:{
            label:'Tanggal',
            sortable : true
        },
        jam_pilihan:{
            label : 'Jam',
            sortable : true
        },
        target_peserta:{
            label:'Kuota',
            sortable : true
        },
        Action:{

        }
      },
      kelas:[],
      fields2: ['No', 'Kelas', 'Jadwal', 'Status', 'Action'],
      items2: [
        // { No: 1, Kelas: 'Office', Jadwal: '11-Agustus-2019', Status: 'Aktif' },
      ],
      user_id: ''
    };
  },
  mounted(){
    this.profil(),
    this.kelaspeserta(),
    this.getkelas()
  },
  methods:{
    profil(){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
      }
      axios.get(process.env.VUE_APP_ROOT_API + '/profil', { headers: ndas })
      .then(prof => {
        const datadiri = JSON.parse(prof.data.data)
        // console.log(JSON.parse(prof.data.data), datadiri.user.id)
        this.user_id = datadiri.user.id
      })
    },
    kelaspeserta(){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
      }
      axios.get(process.env.VUE_APP_ROOT_API + '/kelaspeserta')
      .then(klspst => {
        console.log(klspst)
        klspst.data.data.forEach(klas => {
          if(klas.id_user == this.user_id)
          {
            this.items2.push({
              id : klas.id,
              kelas_id : klas.kelas.id,
              Kelas : klas.kelas.materi.nama_materi,
              Jadwal : klas.kelas.tanggal_mulai,
              Status : klas.kelas.status
            })
          }
        });
        // klspst.data.forEach(klas => {
        //   console.log(klas)
        //   kelas.forEach(kls1 =>{
        //     console.log(kls1)
        //     if(kls1.id == klas.id_kelas)
        //     {
        //       this.items2.push({
        //         'no' : '',
        //         'kelas' : kls1.materi.nama_materi,
        //         'jadwal' : kls1.tanggal_mulai,
        //         'status' : kls1.status
        //       })
        //     }
        //   })
        // });
      })
    },
    getkelas(){
      axios.get(process.env.VUE_APP_ROOT_API+'/kelas')
        .then((res)=> {
            // console.log(res)
            // this.kelas = res.data.data
            res.data.data.forEach(klss =>{
              this.kelas.push(klss)
            })
        })
    },
    kelasbaru(index){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
      }
      // axios.get(process.env.VUE_APP_ROOT_API + '/profil', { headers: ndas })
      // .then(prof => {
      //   const datadiri = JSON.parse(prof.data.data)
      // console.log(JSON.parse(prof.data.data), datadiri.user.id)
      //   this.user_id = datadiri.user.id
      // })
        let isi = {
          'id_kelas' : this.kelas[index].id,
          'id_user' : this.user_id,
          'nilai' : '-',
          'nis' : this.user_id,
          'nomor_sertifikat' : '-',
          'status' : 'Aktif'
        }
      axios.post(process.env.VUE_APP_ROOT_API + '/kelaspeserta', isi, { headers : ndas })
      .then(kls => {
        // console.log(kls)
        // this.items2.push({
        //   id : kls.id,
        //   kelas_id : kls.kelas.id,
        //   Kelas : this.kelas[index].materi.nama_materi,
        //   Jadwal : this.kelas[index].tanggal_mulai,
        //   Status : this.kelas[index].status
        // })
        // this.kelas.splice(index, 1)
        this.items2 = []
        this.kelaspeserta()

      })
    },
    delklsp(index){
      const token = 'Bearer '+localStorage.getItem('token')
      const ndas = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
      }
      const idnya = this.items2[index].id
      console.log(idnya)
      axios.delete(process.env.VUE_APP_ROOT_API + '/kelaspeserta/' + idnya, { headers : ndas })
      .then(response => {
        this.items2 = []
        this.kelaspeserta()
      })
    }
      
  }
};


</script>

