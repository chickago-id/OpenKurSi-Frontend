<template>
  <div>
    <b-container class="conta">
      <b-card>
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>kelas</th>
              <th>tanggal</th>
              <th>jam</th>
              <th>kuota</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>off11</td>
              <td>03 agustus 2019</td>
              <td>18.00</td>
              <th>10</th>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <b-button variant="primary">Simpan</b-button>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      selected1: null,
      selected2: null
    };
  }
};
</script>

<style>
.conta {
  max-width: 60rem;
  float: center;
}
</style>