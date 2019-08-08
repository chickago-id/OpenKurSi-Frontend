<template>
  <b-container>
    <b-card>
      <h1>Jadwal</h1>
      <br />
      <div class="text-center">
        <b-table striped hover :items="jadwal"></b-table>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      jadwal: []
    };
  },
  mounted() {
    var self = this;
    axios
      .get("https://api.myjson.com/bins/19xoct")
      .then(function(res) {
        self.jadwal = res.data;
        console.log("Data: ", res.data);
      })
      .catch(function(error) {
        console.log("Error: ", error);
      });
  }
};
</script>

