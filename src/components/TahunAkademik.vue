<template>
  <div>
    <b-container class="tengah">
      <b-card>
        <div class="tahuntengah">
          <h2>Tahun Akademik</h2>
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
              title="TahunAkademik"
              header-bg-variant="primary"
              ref="my-modal"
              hide-footer
              style="text-center"
            >
              <form @submit.prevent="setTahunAkademik">
                <!-- <b-form-input v-model="data_tahun_akademik.id" type="hidden"></b-form-input> -->
                <label for="tahun_mulai">Tahun Mulai</label>
                <b-form-input
                  v-model="data_tahun_akademik.tahun_mulai"
                  type="date"
                  id="tahun_mulai"
                ></b-form-input>
                <label for="tahun_selesai">Tahun Selesai</label>
                <b-form-input
                  v-model="data_tahun_akademik.tahun_selesai"
                  type="date"
                  id="tahun_selesai"
                ></b-form-input>
                <div style="text-align:center;">
                  <b-button
                    variant="primary"
                    class="mt-3 btn-sm asd"
                    type="submit"
                    block
                  >Simpan Tahun Akademik</b-button>
                </div>
              </form>
            </b-modal>
          </div>
          <br />
        </div>
        <b-table striped hover :items="tahunakademik" :fields="fields">
          <template slot="row-details" slot-scope="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Tahun Mulai :</b>
                </b-col>
                <b-col>{{ row.item.tahun_mulai }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right">
                  <b>Tahun Selesai :</b>
                </b-col>
                <b-col>{{ row.item.tahun_selesai }}</b-col>
              </b-row>
            </b-card>
          </template>
          <template slot="index" slot-scope="tahunakademik">{{ tahunakademik.index + 1 }}</template>
          <template slot="Action" slot-scope="tahunakademik">
            <b-button size="sm" variant="warning" @click="edittahun(tahunakademik)">Edit</b-button>&nbsp;
            <b-button size="sm" variant="danger" @click="deltahun(tahunakademik.index)">Hapus</b-button>
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
        tahun_mulai: {
          label: "Tahun Mulai",
          sortable: true
        },
        tahun_selesai: {
          label: "Tahun Selesai",
          sortable: true
        },
        Action: {}
      },
      data_tahun_akademik: {
        id_tahun_akademik: "",
        tahun_mulai: "",
        tahun_selesai: ""
      },
      tahunakademik: []
    };
  },
  mounted() {
    this.getTahunAkademik();
  },

  methods: {
    getTahunAkademik() {
      axios
        .get(process.env.VUE_APP_ROOT_API + "/tahunakademik")
        .then(response => {
          this.tahunakademik = response.data.data;
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
    setTahunAkademik() {
      const token = "Bearer " + localStorage.getItem("token");
      const ndas = {
        Authorization: token,
        "Content-Type": "application/json"
      };
      if (this.data_tahun_akademik.id_tahun_akademik != "") {
        axios
          .post(
            process.env.VUE_APP_ROOT_API +
              "/tahunakademik/" +
              this.data_tahun_akademik.id_tahun_akademik,
            this.data_tahun_akademik,
            { headers: ndas }
          )
          .then(response => {
            console.log(response, token);
            this.getTahunAkademik();
          });
      } else {
        axios
          .post(
            process.env.VUE_APP_ROOT_API + "/tahunakademik",
            this.data_tahun_akademik,
            {
              headers: ndas
            }
          )
          .then(({ data }) => {
            console.log(data, token);
            data.data.forEach(item => {
              this.tahunakademik.push(item);
            });
            this.data_tahun_akademik.tahun_mulai = "";
            this.data_tahun_akademik.tahun_selesai = "";
          });
      }
      this.$refs["my-modal"].hide();
    },
    edittahun(tahunakademik) {
      this.data_tahun_akademik.id_tahun_akademik =
        tahunakademik.item.id_tahun_akademik;
      this.data_tahun_akademik.tahun_mulai = tahunakademik.item.tahun_mulai;
      this.data_tahun_akademik.tahun_selesai = tahunakademik.item.tahun_selesai;
      this.$refs["my-modal"].show();
    },
    deltahun(index) {
      if (confirm("Do you really want to delete?")) {
        const token = "Bearer " + localStorage.getItem("token");
        const ndas = {
          Authorization: token,
          "Content-Type": "application/json"
        };
        // const id = this.materi[index].id
        const id = this.tahunakademik[index].id_tahun_akademik;
        console.log(index, id);
        axios
          .delete(process.env.VUE_APP_ROOT_API + "/tahunakademik/" + id, {
            headers: ndas
          })
          .then(res => {
            console.log(res);
            this.tahunakademik.splice(index, 1);
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
.tahuntengah {
  text-align: center;
}
</style>