<template>
    <b-container>
        <b-card>
            <h5 slot="header">Lengkapi Data Diri</h5>
            <form @submit.prevent="save">
                <table class="col-md-12">
                    <tr v-if="error.length">
                        <td colspan="3" align="center" v-for="ev in error" :key="ev">{{ ev }}</td>
                    </tr>
                    <tr valign="top">
                        <td>
                            <b-form-group label="Tempat Lahir">
                                <b-form-input type="text" id="tempat_lahir" v-model="form.tempat_lahir"></b-form-input>
                                
                            </b-form-group>

                            <b-form-group label="Tanggal Lahir">
                                <b-form-input type="date" id="tanggal_lahir" v-model="form.tanggal_lahir"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Jenis Kelamin" style="margin-bottom: 30px">
                                <b-form-radio-group id="gender">
                                    <b-form-radio v-model="form.gender" value="laki-laki">Laki - laki</b-form-radio>
                                    <b-form-radio v-model="form.gender" value="perempuan">Perempuan</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>

                            <b-form-group label="Agama">
                                <b-form-input type="text" id="agama" v-model="form.agama"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Status">
                                <b-form-input type="text" id="status" v-model="form.status"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Pekerjaan">
                                <b-form-input type="text" id="pekerjaan" v-model="form.pekerjaan"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Nama Orang Tua">
                                <b-form-input type="text" id="orang_tua" v-model="form.orang_tua"></b-form-input>
                            </b-form-group>

                            <b-form-group label="No Telp Orang Tua">
                                <b-form-input type="text" id="no_telp_ortu" v-model="form.no_telp_ortu"></b-form-input>
                            </b-form-group>
                        </td>
                        <td style="width: 20px">

                        </td>
                        <td>
                            <b-form-group label="Asal Sekolah">
                                <b-form-input type="text" id="asal_sekolah" v-model="form.asal_sekolah"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Alamat">
                                <b-form-input type="text" id="alamat" v-model="form.alamat"></b-form-input>
                            </b-form-group>
                            
                            <b-form-group label="Provinsi">
                                <b-form-input type="text" id="provinsi" v-model="form.provinsi"></b-form-input>
                                 <!-- <b-form-select :options="provinsi"></b-form-select> -->
                            </b-form-group>

                            <b-form-group label="Kabupaten">
                                <b-form-input type="text" id="kabupaten" v-model="form.kabupaten"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Kecamatan">
                                <b-form-input type="text" id="kecamatan" v-model="form.kecamatan"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Kode Pos">
                                <b-form-input type="text" id="kode_pos" v-model="form.kode_pos"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Instagram">
                                <b-form-input type="text" id="instagram" v-model="form.instagram"></b-form-input>
                            </b-form-group>
                             <b-form-group label="facebook">
                                <b-form-input type="text" id="facebook" v-model="form.facebook"></b-form-input>
                            </b-form-group>
                        </td>
                    </tr>
                    <tr>    
                        <td colspan="3" align="center">
                            <b-button size="sm" variant="primary" to="/afterlogin" type="submit">Simpan</b-button>&nbsp;
                            <b-button size="sm" variant="danger">Batal</b-button>
                        </td>
                    </tr>
                </table>
            </form>
        </b-card>
    </b-container>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            form:{
                tempat_lahir: '',
                tanggal_lahir: '',
                gender: '',
                agama: '',
                status: '',
                pekerjaan: '',
                orang_tua: '',
                no_telp_ortu: '',
                asal_sekolah: '',
                alamat: '',
                kecamatan: '',
                kabupaten: '',
                provinsi: '',
                kode_pos: '',
                instagram: '',
                facebook:'',
            },
            error:[],
            biodata:[],
            provinsi:[],
            kabupaten:[],
            kecamatan:[],
        }
    },
    mounted(){
        this.getProvinsi()
    },
    methods:{
        checkform: function(e){
            if (this.tempat_lahir == '') {
                this.error = [];
                this.error.push('Isi Tanggal Lahir');
                console.log(e);
            }
            e.preventDefault()
        },
        async save(event){
          try{
            const res = await axios.post('http://localhost:3000/biodata', this.form)
                this.biodata = res.data
                this.tempat_lahir= ''
                this.tanggal_lahir= ''
                this.gender= ''
                this.agama= ''
                this.status= ''
                this.pekerjaan= ''
                this.orang_tua= ''
                this.no_telp_ortu= ''
                this.asal_sekolah= ''
                this.alamat= ''
                this.kecamatan= ''
                this.kabupaten= ''
                this.provinsi= ''
                this.kode_pos= ''
                this.instagram= ''
                this.facebook=''
                event.target.reset()
                console.log(this.tempat_lahir);
          }catch(e){
            console.log(e)
          }
     },
     getProvinsi(){
        axios.get('https://').then((response) => {
        this.provinsi = response.data;
        console.log(response)
      })
     },
     getKabupaten(id){
        axios.get('https://').then((response) => {
            this.kabupaten = response.data
        })
     },
     getKecamatan(id){
        axios.get('https://').then((response) => {
            this.kecamatan = response.data
        })
     },
     ubahKab(){

     },
     ubahKec(){
        
     }
    }
}
</script>

