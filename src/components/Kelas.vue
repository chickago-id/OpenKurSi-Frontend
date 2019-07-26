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
                <!-- <table class="table table-responsive table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Kode</th>
                            <th>Kelas</th>
                            <th>Jam Pilihan</th>
                            <th>Tanggal Mulai</th>
                            <th>Target Peserta</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-for="">
                        <tr>
                            
                        </tr>   
                </table> -->
            </b-card>
        </b-container>
</template>

<script>
import axios from 'axios'

export default {
    data() {
      return {
        fields: ['kode', 'kelas', 'jam_pilihan', 'tanggal_mulai', 'target_peserta', 'Action'],
        items: []
      }
    },
    mounted(){
        axios.get('https://api.myjson.com/bins/1hf6wh')
        .then((response)=> {
            this.items = response.data.kelas;
            console.log(response)
        })
        
    }
    // data(){
    //     return{
    //         item: null
    //     }
    // }
}
</script>

