<template>
	<b-container>
		<b-modal ref="my-modal" hide-footer>
      		<div class="d-block text-center">
        		<h3>Selamat Anda Sudah Absen</h3>
      		</div>
    		</b-modal>
		<b-card  header="Absen siswa" class="text-center">
        	Selamat Datang Siswa 
        	<!-- <b-card-text v-for="k in kelas">
        	</b-card-text> -->
        	<b-card>{{ nama.nama_lengkap }}</b-card>
        	 <b-button size="sm" variant="danger" type="submit" @click="showModal">Absen</b-button>
     	 </b-card>
	</b-container>
	
</template>

<script>
	import axios from 'axios';
	export default{
		data(){
			return{
			  absensiswa:{
			  	
			  },
			  kelas:[],
			  nama:'' 	
			}
		},
        mounted(){
          this.getKelas()
          this.getUser()
        },
       methods:{
       getKelas(){
         axios.get(process.env.VUE_APP_ROOT_API+'/kelas')
         .then((res)=> {
            // console.log(res)
            this.kelas = res.data.data
        })
      },
      getUser(){
      	const token = 'Bearer '+localStorage.getItem('token')
        const ndas = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
		axios.get(process.env.VUE_APP_ROOT_API+'/profil',{ headers: ndas })
         .then((res)=> {
            // console.log(res)
            let hmm = JSON.parse(res.data.data)
            this.nama = hmm
           
        })
      },
       showModal() {
      		this.$refs["my-modal"].show();
    	},
      
  }
	}
</script>