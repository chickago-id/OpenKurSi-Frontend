<template>
      <div>
          <b-container>
              <b-card>
                  <b-table :items="kelaspst">
                      
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
            //   console.log(res)
            //   this.kelaspst = res.data.data
            //   console.log(kelasp)
                res.data.data.forEach(peserta => {
                    if(peserta.id_kelas == this.$route.params.id)
                    {
                        this.kelaspst.push(peserta)
                    }
                });
          })
        },
        //  getKelas(){
        //       axios.get(process.env.VUE_APP_ROOT_API+'/kelas')
        //       .then((res)=> {
        //       console.log(res)
        //       this.kelas = res.data.data
             
        //   })
        // },

        
       },
       mounted(){
            //this.getKelas()
            this.getKelaspst()
        } 
    }
</script>
