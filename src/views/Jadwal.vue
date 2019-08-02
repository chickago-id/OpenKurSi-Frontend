<template>
	<b-container>
		<b-card>
			<div>
    			<b-table striped hover :items="jadwal"></b-table>
 			 </div>
		</b-card>
	</b-container>
</template>

<script>
  export default {
    data() {
      return {
        jadwal: [
          { nama_kelas:'Office',id_kelas:'Off1',tanggal:'15-10-2019',jam_pilihan:'15.00' },
        ]
      }
    },
    }
</script>