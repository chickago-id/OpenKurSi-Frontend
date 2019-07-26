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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div class="float-center">
                  <b-form-select v-model="selected" class="mb-1" size="sm" style="max-width: 13rem">
                    <option :value="null">Please select an option</option>
                    <optgroup label="1 bulan">
                      <option>Desain Grafis</option>
                      <option>Rancang Bangun</option>
                      <option>Web Desain & Programming</option>
                    </optgroup>
                    <optgroup label="2 bulan">
                      <option>Admin Perbankan Dan Keuangan</option>
                      <option>Admin Perkantoran</option>
                    </optgroup>
                  </b-form-select>
                </div>
              </td>
              <td>
                <div>
                  <b-form-select
                    v-model="selected1"
                    class="mb-1"
                    size="sm"
                    style="max-width: 13rem"
                  >
                    <option :value="null">Please select an option</option>
                    <option>03 agustus 2019</option>
                    <option>15 agustus 2019</option>
                  </b-form-select>
                </div>
              </td>
              <td>
                <div>
                  <b-form-select
                    v-model="selected2"
                    class="mb-1"
                    size="sm"
                    style="max-width: 13rem"
                  >
                    <option :value="null">Please select an option</option>
                    <option>09.00 am</option>
                    <option>01.30 pm</option>
                    <option>04.00 pm</option>
                  </b-form-select>

                  <div class="mt-2">
                    Selected:
                    <strong>{{ selected }}</strong>
                  </div>
                </div>
              </td>
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