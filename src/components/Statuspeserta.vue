<template>
      <div>
          <b-container>
              <b-card>
                  <!-- <b-table :items="kelas">
                      
                  </b-table> -->

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
              kelas:[],
              kelaspst:[]
          }
       },
       methods:{  
          getKelaspst(){
              axios.get(process.env.VUE_APP_ROOT_API+'/kelaspeserta')
              .then((res)=> {
              console.log(res)
              this.kelaspst = res.data.data
              console.log(kelasp)
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
