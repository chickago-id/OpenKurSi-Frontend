<template>
  <div>
    <b-container class="tengah">
      <b-card>
        <div class="materitengah">
          <h2>Materi</h2>
          <div class="text-right">
            <loginnav />
          </div>
          <br />
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Materi</th>
              <th>Materi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>12sum13</td>
              <td>sumof</td>
            </tr>
          </tbody>
        </table>
      </b-card>
    </b-container>
  </div>
</template>


<script>
import loginnav from "./Popmateri.vue";
export default {
  components: {
    loginnav
  }
};
</script>



<style>
.tengah {
  max-width: 30rem;
  float: center;
}
.materitengah {
  text-align: center;
}
</style>