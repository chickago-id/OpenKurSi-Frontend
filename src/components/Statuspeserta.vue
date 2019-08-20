<template>
      <div>
          <b-container>
              <b-card :title="kelaspst[0].kelas.materi.nama_materi">
                  <b-table :items="kelaspst" :fields="fields">
                      <template slot="Action" slot-scope="kelaspst">
                        <b-button size="sm" variant="warning" @click="editpes(kelaspst)">Edit</b-button>&nbsp;
                        <b-button size="sm" variant="danger">Hapus</b-button>
                    </template>
                  </b-table>
              </b-card>
          </b-container>
          <b-modal
              variant="primary"
              title="Peserta"
              header-bg-variant="primary"
              
              ref="my-modal"
              hide-footer
              style="text-center"
          >
            <b-form @submit.prevent="">
              <b-form-group label="Nama">
                <b-form-input type="text" v-model="form.peserta" disabled></b-form-input>
              </b-form-group>

              <b-form-group label="No. Sertifikat">
                <b-form-input type="text" v-model="form.nomor_sertifikat"></b-form-input>
              </b-form-group>

              <b-form-group label="Nilai">
                <b-form-input type="text" v-model="form.nilai"></b-form-input>
              </b-form-group>

              <b-form-group label="Status">
                <b-form-select v-model="form.status" :options="stat"></b-form-select>
              </b-form-group>

              <div class="text-center">
                <b-button type="submit" size="sm" variant="primary" @click="saveeditpes">Simpan</b-button>&nbsp;
                <b-button to="/admin/kelas" size="sm" variant="danger">Kembali</b-button>
              </div>
            </b-form>
          </b-modal>
      </div>
</template>

<script>
    import axios from 'axios'
    export default{
       data(){
          return{
              fields: {
                  nis:{
                      label : 'NIS',
                      sortable : true
                  },
                  'user.username':{
                      label : 'Nama',
                      sortable : true
                  },
                  'kelas.materi.nama_materi':{
                      label : 'Kelas',
                      sortable : true
                  },
                  nomor_sertifikat:{
                      label : 'No Sertifikat',
                      sortable : true
                  },
                  nilai:{
                      label : 'Nilai',
                      sortable : true   
                  },
                  status:{
                      label : 'Status',
                      sortable : true
                  },
                  Action:{}
              },
              kelaspst:[],
              form: {
                id: '',
                peserta: '',
                id_kelas: '',
                id_user: '',
                nomor_sertifikat: '',
                nilai: '',
                status: '',
                nis: ''
              },
              stat: [{text: 'Silakan Pilih', value:''},'Pending', 'Aktif']
          }
       },
       methods:{  
          getKelaspst(){
              axios.get(process.env.VUE_APP_ROOT_API+'/kelaspeserta')
              .then((res)=> {
           
                res.data.data.forEach(peserta => {
                    if(peserta.id_kelas == this.$route.params.id)
                    {
                        this.kelaspst.push(peserta)
                    }
                });
          })
        },
        editpes(kelaspst){
          // console.log(kelaspst)
          this.form.id = kelaspst.item.id
          this.form.peserta = kelaspst.item.user.username
          this.form.status = kelaspst.item.status
          this.form.nilai = kelaspst.item.nilai
          this.form.id_kelas = kelaspst.item.id_kelas
          this.form.id_user = kelaspst.item.id_user
          this.form.nis = kelaspst.item.id_user
          this.form.nomor_sertifikat = kelaspst.item.nomor_sertifikat
          this.$refs["my-modal"].show()
        },
        saveeditpes(){
          const token = 'Bearer '+localStorage.getItem('token')
          const ndas = {
              'Authorization' : token,
              'Content-Type' : 'application/json'
          }
          axios.post(process.env.VUE_APP_ROOT_API + '/kelaspeserta/' + this.form.id, this.form, { headers: ndas })
          .then(sipanse => {
            this.kelaspst = []
            this.getKelaspst()
            this.$refs["my-modal"].hide()
            this.form.id = kelaspst.item.id
            this.form.peserta = ''
            this.form.status = ''
            this.form.nilai = ''
            this.form.id_kelas = ''
            this.form.id_user = ''
          })
        },
        showModal() {
          this.$refs["my-modal"].show();
        },
        
        toggleModal() {
          // We pass the ID of the button that we want to return focus to
          // when the modal has hidden
          this.$refs["my-modal"].toggle("#toggle-btn");
        },
      
        
       },
       mounted(){
            //this.getKelas()
            this.getKelaspst()
        } 
    }
</script>
