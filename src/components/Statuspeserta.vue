<template>
      <div>
          <b-container>
              <b-card :title="kelaspst[0].kelas.materi.nama_materi">
                  <b-table :items="kelaspst" :fields="fields">
                      <template slot="Action" slot-scope="kelaspst">
                        <b-button size="sm" variant="warning">Edit</b-button>&nbsp;
                        <b-button size="sm" variant="danger" >Hapus</b-button>
                    </template>
                  </b-table>
              </b-card>
          </b-container>
      </div>
</template>

<script>
    import axios from 'axios'
    export default{
       data(){
          return{
              fields: {
                  nis:{
                      label : 'NIS',
                      sortable : true
                  },
                  'user.username':{
                      label : 'Nama',
                      sortable : true
                  },
                  'kelas.materi.nama_materi':{
                      label : 'Kelas',
                      sortable : true
                  },
                  nomor_sertifikat:{
                      label : 'No Sertifikat',
                      sortable : true
                  },
                  nilai:{
                      label : 'Nilai',
                      sortable : true   
                  },
                  status:{
                      label : 'Status',
                      sortable : true
                  },
                  Action:{}
              },
              kelas:[],
              kelaspst:[]
          }
       },
       methods:{  
          getKelaspst(){
              axios.get(process.env.VUE_APP_ROOT_API+'/kelaspeserta')
              .then((res)=> {
           
                res.data.data.forEach(peserta => {
                    if(peserta.id_kelas == this.$route.params.id)
                    {
                        this.kelaspst.push(peserta)
                    }
                });
          })
        },
      
        
       },
       mounted(){
            //this.getKelas()
            this.getKelaspst()
        } 
    }
</script>
