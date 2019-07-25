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
              <td>Nama Kelas : {{anu}}</td>
            </tr>
            <tr>
              <td>Id Kelas   : {{anu2}}</td>
            </tr>
          <div id="anu">
            <b-table striped hover :items="siswa">
            </b-table>  
          </div>
           <div class="text-right">
              <b-button  @click="print">Recap</b-button>
           </div>
      </b-tab>
      <b-tab title="Absensi Instruktur">
            <div >
                <h1>Absensi Instruktur</h1>
            </div>
            <tr>
              <td>Nama Kelas : {{anu}}</td>
            </tr>
            <tr>
              <td>Id Kelas : {{anu2}}</td>
            </tr>
          <div id="anu">
            <b-table striped hover :items="instruktur">
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
  export default {
    data() {
      return {
        siswa: [
          { No: 1, Nama : 'Surat',Jam_Masuk : '15.00',Tanggal :'null', Status : 'Hadir' },
          { No: 2, Nama : 'Paimen',Jam_Masuk : '15.00',Tanggal :'null',  Status : 'Hadir' },
          { No: 3, Nama : 'Sri',Jam_Masuk : '15.00',Tanggal :'null',  Status : 'Hadir' },
          { No: 4, Nama : 'Painem',Jam_Masuk : '15.00',Tanggal :'null',  Status : 'Hadir' }
        ], 
        instruktur: [
          { No: 1, Nama : 'Paijo',Materi : 'Office',Jam_Masuk : '15.00',Jam_Keluar :'null', Status : 'Hadir' },
          { No: 2, Nama : 'Slamet',Materi : 'Web',Jam_Masuk : '16.00',Jam_Keluar :'null',  Status : 'Hadir' },
          { No: 3, Nama : 'Tri',Materi : 'Desain',Jam_Masuk : '15.00',Jam_Keluar :'null',  Status : 'Hadir' },
          { No: 4, Nama : 'Dwi',Materi : 'Office',Jam_Masuk : '15.00',Jam_Keluar :'null',  Status : 'Hadir' }
        ], 


        anu: 'Office',

        anu2: 'Off01'
      }
    },
  methods: {
      print() {
         window.print();
      }
    }

  }

</script>
