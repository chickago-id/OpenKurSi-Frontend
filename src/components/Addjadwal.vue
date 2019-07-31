<template>
  <div>
    <b-container>
    <b-card>
          <b-table striped hover :items="jadwal" :fields="fields">
              <template slot="Action" >
                  <b-button size="sm" variant="warning">Edit</b-button>&nbsp;
                  <b-button size="sm" variant="danger">Hapus</b-button>
              </template>   
          </b-table>
    </b-card>
  </b-container>
  </div>
	
</template>

<script>
  export default {
    data() {
      return {
        fields: ['nama_kelas', 'id_kelas', 'tanggal', 'jam_pilihan', 'Action'],
        jadwal: [
          { nama_kelas:'Office',id_kelas:'Off1',tanggal:'15-10-2019',jam_pilihan:'15.00' },
        ]
      }
    },
    }
</script>