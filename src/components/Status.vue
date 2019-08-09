<template>
  <div>
    <b-container>
            <b-card
                title="Status">
                <b-table striped hover :items="items" :fields="fields">
                    <template slot="Action" >
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
        fields: ['No', 'Kelas', 'Jadwal', 'Status', 'Action'],
        items: [
          { No: 1, Kelas: 'Office', Jadwal: '11-Agustus-2019', Status: 'Aktif' },
        ]
      }
    }
  }
</script>
