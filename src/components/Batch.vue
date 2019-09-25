<template>
  <div>
    <b-container class="tengah">
      <b-card>
        <div class="batchtengah">
          <h2>Batch</h2>
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
              title="Batch"
              header-bg-variant="primary"
              ref="my-modal"
              hide-footer
              style="text-center"
            >
              <form @submit.prevent="setBatch">
                <!-- <b-form-input v-model="data_batch.id" type="hidden"></b-form-input> -->
                <label>Nomor Batch</label>
                <b-form-input v-model="data_batch.no_batch" type="number"></b-form-input>
                <div style="text-align:center;">
                  <b-button
                    variant="primary"
                    class="mt-3 btn-sm asd"
                    type="submit"
                    block
                  >Simpan Batch</b-button>
                </div>
              </form>
            </b-modal>
          </div>
          <br />
        </div>
        <b-table striped hover :items="batch" :fields="fields">
          <template slot="index" slot-scope="batch">{{ batch.index + 1 }}</template>
          <template slot="Action" slot-scope="batch">
            <b-button size="sm" variant="warning" @click="editbatch(batch)">Edit</b-button>&nbsp;
            <b-button size="sm" variant="danger" @click="delbatch(batch.index)">Hapus</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>


<script>
import axios from "axios";
import { constants } from "crypto";
export default {
  components: {},
  data() {
    return {
      fields: {
        index: {
          label: "No",
          sortable: true
        },
        no_batch: {
          label: "Nomor Batch",
          sortable: true
        },
        Action: {}
      },
      data_batch: {
        id_batch: "",
        no_batch: ""
      },
      batch: []
    };
  },
  mounted() {
    this.getBatch();
  },

  methods: {
    getBatch() {
      axios.get(process.env.VUE_APP_ROOT_API + "/batch").then(response => {
        this.batch = response.data.data;
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
    setBatch() {
      const token = "Bearer " + localStorage.getItem("token");
      const ndas = {
        Authorization: token,
        "Content-Type": "application/json"
      };
      if (this.data_batch.id_batch != "") {
        axios
          .post(
            process.env.VUE_APP_ROOT_API + "/batch/" + this.data_batch.id_batch,
            this.data_batch,
            { headers: ndas }
          )
          .then(response => {
            // console.log(response, token)
            this.getBatch();
          });
      } else {
        axios
          .post(process.env.VUE_APP_ROOT_API + "/batch", this.data_batch, {
            headers: ndas
          })
          .then(({ data }) => {
            console.log(data, token);
            data.data.forEach(item => {
              this.batch.push(item);
            });
            this.data_batch.no_batch = "";
          });
      }
      this.$refs["my-modal"].hide();
    },
    editbatch(batch) {
      this.data_batch.id_batch = batch.item.id_batch;
      this.data_batch.no_batch = batch.item.no_batch;
      this.$refs["my-modal"].show();
    },
    delbatch(index) {
      if (confirm("Do you really want to delete?")) {
        const token = "Bearer " + localStorage.getItem("token");
        const ndas = {
          Authorization: token,
          "Content-Type": "application/json"
        };
        // const id = this.materi[index].id
        const id = this.batch[index].id_batch;
        console.log(index, id);
        axios
          .delete(process.env.VUE_APP_ROOT_API + "/batch/" + id, {
            headers: ndas
          })
          .then(res => {
            console.log(res);
            this.batch.splice(index, 1);
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
.batchtengah {
  text-align: center;
}
</style>