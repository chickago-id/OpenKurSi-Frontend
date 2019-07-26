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
        <b-form-input class="col-5"></b-form-input>
        <label for="input-with-list">Kode Materi</label>
        <b-form-input class="col-7"></b-form-input>
        <b-button variant="primary" class="mt-3 btn-sm" block @click="hideModal">Tambah Materi</b-button>
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

<style>
.block {
  max-width: 40rem;
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

form {
  display: inline-block;
}
</style>