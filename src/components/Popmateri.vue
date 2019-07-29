<template>
  <container>
    <div>
      <b-button
        v-b-modal.modal-sm
        variant="primary"
        id="show-btn"
        @click="showModal"
        href="#"
      >Tambah</b-button>
      <b-modal
        variant="primary"
        title="Materi"
        header-bg-variant="warning"
        size="sm"
        ref="my-modal"
        hide-footer
        style="text-center"
      >
        <label>Nama Materi</label>
        <b-form-input class="col-8"></b-form-input>
        <label for="input-with-list">Kode Materi</label>
        <b-form-input class="col-5"></b-form-input>

        <div style="text-align:center;">
          <b-button variant="primary" class="mt-3 btn-sm asd" block @click="hideModal">Tambah Materi</b-button>
        </div>
      </b-modal>
    </div>
  </container>
</template>

<script>
export default {
  methods: {
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
    }
  }
};
</script>

<style scoped>
.block {
  max-width: 20rem;
  float: center;
}
p {
  color: black;
}
label {
  color: grey;
}
title {
  text-align: center;
}
.asd {
  max-width: 7rem;
  margin-left: 30%;
}
form {
  width: 90%;
  background-color: #c0d7f8;
}
</style>