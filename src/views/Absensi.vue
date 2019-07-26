<template>
  <div>
  <b-container>
    <b-card no-body >
    <b-tabs pills card>
      <b-tab title="Absensi Siswa" active>
            <div >
                <h1>Absensi Siswa</h1>
            </div>
            <tr>
              <td>Nama Kelas : </td>
            </tr>
            <tr>
              <td>Id Kelas   : </td>
            </tr>
          <div> 
                  <b-table striped hover :items="siswa">             
            </b-table>  
          </div>
           <div class="text-right">
              <b-button  @click="print">Recap</b-button>
           </div>
      </b-tab>
      <b-tab title="Absensi Instruktur">
            <div >

                <h1 ></h1>
            </div>
            <tr>
              <td>Nama Kelas : </td>
            </tr>
            <tr>
              <td>Id Kelas : </td>
            </tr>
          <div>
            <b-table striped hover :items="siswa" :fields="fields">             
            </b-table>  
          </div>
           <div class="text-right">
              <b-button  @click="print">Recap</b-button>
           </div>
        

      </b-tab>
    </b-tabs>
  </b-card>
  </b-container>
    

</div>

</template>

  
<script>
 import axios from 'axios';
  export default {
    data() {
      return {
      siswa: [],
      fields:['nama']
    }
    },
    mounted(){
      this.getSiswa()
    },
  methods: {
    print(){
        window.print();
    },
      getSiswa(){
      axios.get("https://api.myjson.com/bins/18w9ip")
      .then((response)  =>  {
        this.siswa = response.data.siswa;
        console.log(response)
      })
    }

  }
}
</script>
