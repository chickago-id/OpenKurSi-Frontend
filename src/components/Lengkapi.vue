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
                                    <b-form-radio v-model="form.jenis_kelamin" value="laki-laki">Laki - laki</b-form-radio>
                                    <b-form-radio v-model="form.jenis_kelamin" value="perempuan">Perempuan</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>

                            <b-form-group label="Agama">
                                <b-form-input type="text" id="agama" v-model="form.agama"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Status">
                                <b-form-input type="text" id="status" v-model="form.status_saat_ini"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Pekerjaan">
                                <b-form-input type="text" id="pekerjaan" v-model="form.pekerjaan"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Nama Orang Tua">
                                <b-form-input type="text" id="orang_tua" v-model="form.nama_orangtua"></b-form-input>
                            </b-form-group>

                            <b-form-group label="No Telp Orang Tua">
                                <b-form-input type="text" id="no_telp_ortu" v-model="form.telepon"></b-form-input>
                            </b-form-group>
                        </td>
                        <td style="width: 20px">

                        </td>
                        <td>
                            <b-form-group label="Asal Sekolah">
                                <b-form-input type="text" id="asal_sekolah" v-model="form.asal_sekolah_kampus"></b-form-input>
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
                                <b-form-select :options="disops" v-model="selectdis" @change="setDistrict()"></b-form-select>
                            </b-form-group>

                            <b-form-group label="Kode Pos">
                                <b-form-input type="text" id="kode_pos" v-model="form.kode_pos"></b-form-input>
                            </b-form-group>

                            <b-form-group label="Instagram">
                                <b-form-input type="text" id="instagram" v-model="form.akun_ig"></b-form-input>
                            </b-form-group>
                             <b-form-group label="facebook">
                                <b-form-input type="text" id="facebook" v-model="form.facebook"></b-form-input>
                            </b-form-group>
                        </td>
                    </tr>
                    <tr>    
                        <td colspan="3" align="center">
                            <b-button size="sm" variant="primary" type="submit">Simpan</b-button>&nbsp;
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
                nama_lengkap: '',
                tempat_lahir: '',
                tanggal_lahir: '',
                jenis_kelamin: '',
                agama: '',
                status_saat_ini: '',
                pekerjaan: '',
                nama_orangtua: '',
                telepon: '',
                telepon_orangtua:'',
                asal_sekolah_kampus: '',
                alamat: '',
                kecamatan: '',
                kota_kabupaten: '',
                provinsi: '',
                kode_pos: '',
                akun_ig: '',
                facebook:'',
            },
            biodata: '',
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

            loading: true,
        }
    },
    mounted(){
        this.getProvinsi()
        this.ceklengkap()
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
        ceklengkap(){
            const token = 'Bearer '+localStorage.getItem('token')
            const ndas = {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
            axios.get(process.env.VUE_APP_ROOT_API + '/profil', { headers: ndas })
            .then(response =>{
                // console.log(response.data)
                // var baru = JSON.parse(response.data)
                // console.log(JSON.parse(response.data.data))
                let lengkapi = JSON.parse(response.data.data)
                console.log(lengkapi.nama_lengkap)
                this.nama_lengkap = lengkapi.nama_lengkap
            })
        },
        async save(){
          try{
            const token = 'Bearer '+localStorage.getItem('token')
            const ndas = {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
            this.telepon_orangtua = this.telepon
            const res = await axios.post(process.env.VUE_APP_ROOT_API + '/profil', this.form, { headers: ndas })
                console.log(res)
                this.biodata = res.data
                this.form.tempat_lahir= ''
                this.form.tanggal_lahir= ''
                this.form.jenis_kelamin= ''
                this.form.agama= ''
                this.form.status_saat_ini= ''
                this.form.pekerjaan= ''
                this.form.nama_orangtua= ''
                this.form.telepon= ''
                this.form.asal_sekolah_kampus= ''
                this.form.alamat= ''
                this.form.kecamatan= ''
                this.form.kota_kabupaten= ''
                this.form.provinsi= ''
                this.form.kode_pos= ''
                this.form.instagram= ''
                this.form.facebook=''
                // event.target.reset()
                console.log(this.tempat_lahir);
          }catch(e){
            console.log(e)
          }
     },
     async getProvinsi(){
        // const ai = new AdministratifIndonesia(); 
        // console.log(Loc.all())
        // const ai = new Loc()
        // console.log(JSON.stringify(ai.all(), null, '\t'));
        
        // axios.get('https://raw.githubusercontent.com/yusufsyaifudin/wilayah-indonesia/master/data/list_of_area/provinces.json')
        axios.get('http://localhost:8080/provinsi.json')
        .then((response) => {
            // this.provinsiops = response.data
            // console.log(response)
            response.data.forEach(prov => {
                // let text = prov.name
                // let value = prov.id
                this.provinsiops.push({
                    text: prov.name,
                    value: prov
                })
            });
        })
     },
     getKabupaten(){
        this.kabops = []
        this.disops = []
        this.form.provinsi = this.selectprov.name
        axios.get('http://localhost:8080/kabupaten.json').then((response) => {
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
            this.selectdis = '0'
            response.data.forEach(kab => {
                if(kab.province_id == this.selectprov.id)
                {
                    this.kabops.push({
                        text: kab.name,
                        value: kab
                    })
                }
            })
        })
        console.log(this.form.provinsi)
     },
     getKecamatan(){
        this.disops = []
        this.form.kota_kabupaten = this.selectkab.name
        axios.get('http://localhost:8080/kecamatan.json')
        .then((response) => {
            this.disops.push({
                text: 'Silakan Pilih',
                value: '0'
            })
            this.selectdis = '0'
            response.data.forEach(kec => {
                if(kec.regency_id == this.selectkab.id)
                {
                    this.disops.push({
                        text: kec.name,
                        value: kec
                    })
                }
            })
        })
        console.log(this.form.kabupaten)
     },
     setDistrict(){
         this.form.kecamatan = this.selectdis.name
         console.log(this.form.kecamatan)
     }
    }
}
</script>

