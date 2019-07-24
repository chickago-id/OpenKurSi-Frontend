<template>
<b-container class="bv-example-row">
    <div >
          <h1>Absensi Siswa</h1>
    </div>
    <tr>
      <td>Nama Kelas : {{anu}}</td>
    </tr>
    <tr>
      <td>Kode Kelas : {{anu2}}</td>
    </tr>
  <div id="anu">
    <b-table striped hover :items="items">
    </b-table>  
  </div>
   <div class="text-right">
      <b-button  @click="print">Recap</b-button>
   </div>
</b-container>
  

</template>

<script>
  export default {
    data() {
      return {
        items: [
          { No: 1, Nama : 'Dickerson',Jam_Masuk : '15.00',Tanggal :'null', Status : 'Hadir' },
          { No: 2, Nama : 'Larsen',Jam_Masuk : '15.00',Tanggal :'null',  Status : 'Hadir' },
          { No: 3, Nama : 'Geneva',Jam_Masuk : '15.00',Tanggal :'null',  Status : 'Hadir' },
          { No: 4, Nama : 'Jami',Jam_Masuk : '15.00',Tanggal :'null',  Status : 'Hadir' }
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
