<template>
    
        <b-container>
            <b-card
                
            >
                <div slot="header">
                    <h3>Kelas</h3>
                </div>
                    <div class="text-right" style="padding: 5px;">
                        <b-button to="/admin/kelas/tambah" size="sm" variant="primary" class="justify-content-right">Tambah</b-button>
                    </div>
                <b-table striped hover :items="items" :fields="fields">
                    <template slot="Action">
                        <b-button size="sm" variant="warning">Edit</b-button>&nbsp;
                        <b-button size="sm" variant="danger">Hapus</b-button>
                    </template>
                </b-table>
            </b-card>
        </b-container>
</template>

<script>
export default {
    data() {
      return {
        fields: ['Kode', 'Kelas', 'Jam Pilihan', 'Tanggal Mulai', 'Target Peserta', 'Action'],
        items: [
          { Kode: 'OFF', Kelas: 'Office', 'Jam Pilihan': '18.00', 'Tanggal Mulai': '11-Agustus-2019', 'Target Peserta': '5' },
        ]
      }
    }
}
</script>

