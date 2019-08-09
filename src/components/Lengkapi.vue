<template>
    <b-container>
        <!-- <b-card> -->
            <b-alert class="tengah" v-model="showAlertBerhasil" variant="success" dismissible><p>Berhasil disimpan</p></b-alert>
            <b-alert
                class="tengah"
                :show="dismissCountDown"
                dismissible
                variant="danger"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
            >
                <p v-html="notif"></p>
                <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
                <b-progress
                variant="warning"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px"
                ></b-progress>
            </b-alert>
        <!-- </b-card> -->
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
                                <b-form-input type="text" id="tempat_lahir" v-model="form.tempat_lahir" required></b-form-input>
                            </b-form-group>


              <b-form-group label="Tanggal Lahir">
                <b-form-input type="date" id="tanggal_lahir" v-model="form.tanggal_lahir" required></b-form-input>
              </b-form-group>

              <b-form-group label="Jenis Kelamin" style="margin-bottom: 30px">
                <b-form-radio-group id="gender" required>
                  <b-form-radio v-model="form.jenis_kelamin" value="laki-laki">Laki - laki</b-form-radio>
                  <b-form-radio v-model="form.jenis_kelamin" value="perempuan">Perempuan</b-form-radio>
                </b-form-radio-group>
              </b-form-group>

              <b-form-group id="input-group-3" label="Agama" label-for="input-3">
                <b-form-select
                    id="input-3"
                    v-model="form.agama"
                    :options="agama"
                    required>
                </b-form-select>
                </b-form-group>
              <b-form-group id="status" label="Status" label-for="status">
                <b-form-select
                    id="status"
                    v-model="form.status_saat_ini"
                    :options="status"
                    required>
                </b-form-select>
              </b-form-group>

              <b-form-group label="Pekerjaan">
                <b-form-input type="text" id="pekerjaan" v-model="form.pekerjaan"></b-form-input>
              </b-form-group>

              <b-form-group label="Nama Orang Tua">
                <b-form-input type="text" id="orang_tua" v-model="form.nama_orangtua" required></b-form-input>
              </b-form-group>

              <b-form-group label="No Telp Orang Tua">
                <b-form-input type="text" id="no_telp_ortu" v-model="form.telepon" required></b-form-input>
              </b-form-group>
            </td>
            <td style="width: 20px"></td>
            <td>
              <b-form-group label="Asal Sekolah">
                <b-form-input type="text" id="asal_sekolah" v-model="form.asal_sekolah_kampus" required></b-form-input>
              </b-form-group>

              <b-form-group label="Alamat">
                <b-form-input type="text" id="alamat" v-model="form.alamat" required></b-form-input>
              </b-form-group>

              <b-form-group label="Provinsi">
                <!-- <b-form-input type="text" id="provinsi" v-model="form.provinsi"></b-form-input> -->
                <b-form-select :options="provinsiops" v-model="selectprov" @change="getKabupaten()" required></b-form-select>
              </b-form-group>

              <b-form-group label="Kabupaten">
                <!-- <b-form-input type="text" id="kabupaten" v-model="form.kabupaten"></b-form-input> -->
                <b-form-select :options="kabops" v-model="selectkab" @change="getKecamatan()" required></b-form-select>
              </b-form-group>

              <b-form-group label="Kecamatan">
                <!-- <b-form-input type="text" id="kecamatan" v-model="form.kecamatan"></b-form-input> -->
                <b-form-select :options="disops" v-model="selectdis" @change="setDistrict()" required></b-form-select>
              </b-form-group>

              <b-form-group label="Kode Pos">
                <b-form-input type="text" id="kode_pos" v-model="form.kode_pos"></b-form-input>
              </b-form-group>

                            <b-form-group label="Instagram">
                                <b-form-input type="text" id="instagram" v-model="form.akun_ig" required></b-form-input>
                            </b-form-group>
                             <b-form-group label="facebook">
                                <b-form-input type="text" id="facebook" v-model="form.facebook"></b-form-input>
                            </b-form-group>
                        </td>
                    </tr>
                    <tr>    
                        <td colspan="3" align="center">
                            <b-button size="sm" variant="primary" type="submit">
                            <b-spinner  v-if="loading" small ></b-spinner>
                                Simpan
                            </b-button>&nbsp;
                            <b-button size="sm" variant="danger">Batal</b-button>
                        </td>
                    </tr>
                </table>
            </form>
        </b-card>
    </b-container>
</template>

<script>
import axios from 'axios'
import Loc from 'administratif-indonesia'
export default {
    data(){
        return{
            form:{
                id: '',
                id_user: '',
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
            agama: [{ text: 'Silahkan Pilih', value: '' }, 'Islam', 'Katolik', 'Kristen', 'Hindu', 'Budha'],
            status: [
                { text: 'Silahkan Pilih', value: '' },
                'Masih Sekolah/Kuliah',
                'Lulus Kuliah',
                'Kerja'
            ],
            selectprov: '',
            selectkab: '',
            selectdis: '',
            error:[],
            biodata:[],
            provinsiops:[{'text': 'Silakan Pilih', 'value':''}],
            kabops:[{'text': 'Silakan Pilih', 'value':''}],
            disops:[{'text': 'Silakan Pilih', 'value':''}],
            kabupaten:[],
            kecamatan:[],
            showAlertBerhasil: false,
            loading: false,
            notif: '',
            dismissSecs: 3,
            dismissCountDown: 0,

    };
  },
  mounted() {
    this.getProvinsi();
    this.ceklengkap();
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
                console.log(lengkapi)
                this.form.nama_lengkap = lengkapi.nama_lengkap
                this.form.id = lengkapi.id
                this.form.id_user = lengkapi.id_user
            })
        },
        save(){
          try{
            this.loading = true
            const token = 'Bearer '+localStorage.getItem('token')
            const ndas = {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
            this.form.telepon_orangtua = this.form.telepon
            axios.post(process.env.VUE_APP_ROOT_API + '/profil', this.form, { headers: ndas })
            .then(res => {
                console.log(res)
                if(res.data.status == 'ok')
                {
                    this.loading = false
                    this.showAlertBerhasil = true
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
                    this.form.akun_ig= ''
                    this.form.facebook=''
                    this.$router.pull('/afterlogin')
                }else{
                    this.showAlertBerhasil = false
                    this.notif = res.data.message
                    // this.pesangagal(this.notif)
                    // this.$bvModal.show('bv-modal-example')
                    this.showAlert()
                }
                // event.target.reset()
                // console.log(this.tempat_lahir);
            })
          }catch(e){
            console.log(e)
          }
     },
     getProvinsi(){
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
    getKabupaten() {
      this.kabops = []
      this.disops = []
      this.form.provinsi = this.selectprov.name
      axios.get('http://localhost:8080/kabupaten.json').then((response) => {
        // console.log(this.selectprov, response)
        // this.kabupaten = response.data
            this.kabops.push({
                text: 'Silakan Pilih',
                value: ''
            })
            this.disops.push({
                text: 'Silakan Pilih',
                value: ''
            })
            this.selectkab = ''
            this.selectdis = ''
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
    getKecamatan() {
      this.disops = []
      this.form.kota_kabupaten = this.selectkab.name
      axios.get('http://localhost:8080/kecamatan.json').then(response => {
        this.disops.push({

                text: 'Silakan Pilih',
                value: ''
            })
            this.selectdis = ''
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
     },
     countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
        },
    showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    }
  }
</script>

