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
                                <!-- <b-form-input type="text" id="provinsi" v-model="form.provinsi"></b-form-input> -->
                                 <b-form-select :options="provinsiops" v-model="selectprov" @change="getKabupaten()"></b-form-select>
                            </b-form-group>

                            <b-form-group label="Kabupaten">
                                <!-- <b-form-input type="text" id="kabupaten" v-model="form.kabupaten"></b-form-input> -->
                                <b-form-select :options="kabops" v-model="selectkab" @change="getKecamatan()"></b-form-select>
                            </b-form-group>

                            <b-form-group label="Kecamatan">
                                <!-- <b-form-input type="text" id="kecamatan" v-model="form.kecamatan"></b-form-input> -->
                                <b-form-select :options="disops" v-model="selectdis"></b-form-select>
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
import Loc from 'administratif-indonesia';
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
            selectprov: '0',
            selectkab: '0',
            selectdis: '0',
            error:[],
            biodata:[],
            provinsiops:[{'text': 'Silakan Pilih', 'value':'0'}],
            kabops:[{'text': 'Silakan Pilih', 'value':'0'}],
            disops:[{'text': 'Silakan Pilih', 'value':'0'}],
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
        // const ai = new AdministratifIndonesia(); 
        // console.log(Loc.all())
        // const ai = new Loc()
        // console.log(JSON.stringify(ai.all(), null, '\t'));
        
        axios.get('https://raw.githubusercontent.com/yusufsyaifudin/wilayah-indonesia/master/data/list_of_area/provinces.json').then((response) => {
            // this.provinsiops = response.data
            // console.log(response)
            response.data.forEach(prov => {
                // let text = prov.name
                // let value = prov.id
                this.provinsiops.push({
                    text: prov.name,
                    value: prov.id
                })
            });
        })
     },
     getKabupaten(){
        this.kabops = []
        this.disops = []
        axios.get('https://raw.githubusercontent.com/yusufsyaifudin/wilayah-indonesia/master/data/list_of_area/regencies.json').then((response) => {
            // console.log(this.selectprov, response)
            // this.kabupaten = response.data
            this.kabops.push({
                text: 'Silakan Pilih',
                value: '0'
            })
            this.disops.push({
                text: 'Silakan Pilih',
                value: '0'
            })
            this.selectkab = '0'
            response.data.forEach(kab => {
                if(kab.province_id == this.selectprov)
                {
                    this.kabops.push({
                        text: kab.name,
                        value: kab.id
                    })
                }
            })
        })
     },
     getKecamatan(){
        this.disops = []
        axios.get('https://raw.githubusercontent.com/yusufsyaifudin/wilayah-indonesia/master/data/list_of_area/districts.json')
        .then((response) => {
            this.disops.push({
                text: 'Silakan Pilih',
                value: '0'
            })
            this.selectdis = '0'
            response.data.forEach(kec => {
                if(kec.regency_id == this.selectkab)
                {
                    this.disops.push({
                        text: kec.name,
                        value: kec.id
                    })
                }
            })
        })
     }
    }
}
</script>

