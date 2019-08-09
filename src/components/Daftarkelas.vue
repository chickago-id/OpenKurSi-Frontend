<template>
  <div>
    <b-container>
      <b-card>
           <b-table striped hover :items="kelas" :fields="fields">
                <template slot="Action" slot-scope="kelas">
                        <b-button size="sm" variant="primary" v-model="kelas" type="submit" @click="submit"> Tambah</b-button>
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
      
    };
  },
  mounted(){
    this.getKelas()
  },
  methods:{
    getKelas(){
        axios.get(process.env.VUE_APP_ROOT_API+'/kelas')
        .then((res)=> {
            console.log(res)
            this.kelas = res.data.data

        })
      }
      
  }
};


</script>

