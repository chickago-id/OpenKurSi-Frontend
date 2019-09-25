<template>
  <div>
    <b-container class="tengah">
      <b-card>
        <div class="masterkelastengah">
          <h2>Master Kelas</h2>
          <div class="text-right">
            <b-button
              v-b-modal.modal-sm
              variant="primary"
              id="show-btn"
              @click="showModal"
              href="#"
            >Tambah</b-button>
            <b-modal
              variant="primary"
              title="Master Kelas"
              header-bg-variant="primary"
              ref="my-modal"
              hide-footer
              style="text-center"
            >
              <form @submit.prevent="setmasterkelas">
                <!-- <b-form-input v-model="data_master_kelas.id" type="hidden"></b-form-input> -->
                <label>Kode Kelas</label>
                <b-form-input v-model="data_master_kelas.kode_kelas"></b-form-input>
                <label>Nama Kelas</label>
                <b-form-input v-model="data_master_kelas.nama_kelas"></b-form-input>
                <label>Created by</label>
                <b-form-input v-model="data_master_kelas.created_by"></b-form-input>
                <label>Created Date</label>
                <b-form-input v-model="data_master_kelas.created_date" type="date"></b-form-input>
                <label>Updated by</label>
                <b-form-input v-model="data_master_kelas.updated_by"></b-form-input>
                <label>Updated Date</label>
                <b-form-input v-model="data_master_kelas.updated_date" type="date"></b-form-input>
                <div style="text-align:center;">
                  <b-button
                    variant="primary"
                    class="mt-3 btn-sm asd"
                    type="submit"
                    block
                  >Simpan Master Kelas</b-button>
                </div>
              </form>
            </b-modal>
          </div>
          <br />
        </div>
        <b-table striped hover :items="masterkelas" :fields="fields">
          <template slot="row-details" slot-scope="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Kode Kelas :</b>
                </b-col>
                <b-col>{{ row.item.kode_kelas }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Nama Kelas :</b>
                </b-col>
                <b-col>{{ row.item.nama_kelas }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Created By :</b>
                </b-col>
                <b-col>{{ row.item.created_by }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Created Date :</b>
                </b-col>
                <b-col>{{ row.item.created_date }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Updated By :</b>
                </b-col>
                <b-col>{{ row.item.updated_by }}</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Updated Date :</b>
                </b-col>
                <b-col>{{ row.item.updated_date }}</b-col>
              </b-row>
            </b-card>
          </template>
          <template slot="index" slot-scope="masterkelas">{{ masterkelas.index + 1 }}</template>
          <template slot="Action" slot-scope="masterkelas">
            <b-button size="sm" variant="warning" @click="editmasterkelas(masterkelas)">Edit</b-button>&nbsp;
            <b-button size="sm" variant="danger" @click="delmasterkelas(masterkelas.index)">Hapus</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>


<script>
import axios from "axios";
// import { constants } from "crypto";
export default {
  components: {},
  data() {
    return {
      fields: {
        index: {
          label: "No",
          sortable: true
        },
        kode_kelas: {
          label: "Kode Kelas",
          sortable: true
        },
        nama_kelas: {
          label: "Nama Kelas",
          sortable: true
        },
        Action: {}
      },
      data_master_kelas: {
        kode_kelas: "",
        nama_kelas: "",
        created_by: "",
        created_date: "",
        updated_by: "",
        updated_date: ""
      },
      masterkelas: []
    };
  },
  mounted() {
    this.getmasterkelas();
  },

  methods: {
    getmasterkelas() {
      axios
        .get(process.env.VUE_APP_ROOT_API + "/masterkelas")
        .then(response => {
          this.masterkelas = response.data.data;
          // console.log(response)
        });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs["my-modal"].toggle("#toggle-btn");
    },
    setmasterkelas() {
      const token = "Bearer " + localStorage.getItem("token");
      const ndas = {
        Authorization: token,
        "Content-Type": "application/json"
      };
      if (this.data_master_kelas.kode_kelas != "") {
        axios
          .post(
            process.env.VUE_APP_ROOT_API +
              "/masterkelas/" +
              this.data_master_kelas.kode_kelas,
            this.data_master_kelas,
            { headers: ndas }
          )
          .then(response => {
            console.log(response, token);
            this.getmasterkelas();
          });
      } else {
        axios
          .post(
            process.env.VUE_APP_ROOT_API + "/masterkelas",
            this.data_master_kelas,
            { headers: ndas }
          )
          .then(({ data }) => {
            console.log(data, token);
            data.data.forEach(item => {
              this.masterkelas.push(item);
            });
            this.data_master_kelas.kode_kelas = "";
            this.data_master_kelas.nama_kelas = "";
            this.data_master_kelas.created_by = "";
            this.data_master_kelas.created_date = "";
            this.data_master_kelas.updated_by = "";
            this.data_master_kelas.updated_date = "";
          });
      }
      this.$refs["my-modal"].hide();
    },
    editmasterkelas(masterkelas) {
      this.data_master_kelas.kode_kelas = masterkelas.item.kode_kelas;
      this.data_master_kelas.nama_kelas = masterkelas.item.nama_kelas;
      this.data_master_kelas.created_by = masterkelas.item.created_by;
      this.data_master_kelas.created_date = masterkelas.item.created_date;
      this.data_master_kelas.updated_by = masterkelas.item.updated_by;
      this.data_master_kelas.updated_date = masterkelas.item.updated_date;
      this.$refs["my-modal"].show();
    },
    delmasterkelas(index) {
      if (confirm("Do you really want to delete?")) {
        const token = "Bearer " + localStorage.getItem("token");
        const ndas = {
          Authorization: token,
          "Content-Type": "application/json"
        };
        const id = this.masterkelas[index].kode_kelas;
        console.log(index, id);
        axios
          .delete(process.env.VUE_APP_ROOT_API + "/masterkelas/" + id, {
            headers: ndas
          })
          .then(res => {
            console.log(res);
            this.masterkelas.splice(index, 1);
          });
      }
    }
  }
};
</script>

<style>
.tengah {
  max-width: 60rem;
  float: center;
}
.masterkelastengah {
  text-align: center;
}
</style>