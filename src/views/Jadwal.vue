<template>
  <b-container>
    <b-card>
      <h1>Jadwal</h1>
      <br />
      <div class="text-center">
        <b-table striped hover :items="jadwal"></b-table>
      </div>
      <!-- <div>
        <div class="post" v-for="user in users" :key="user.id">
          <div>
            <table class="table text-center">
              <tr>
                <td>nama kelas</td>
                <td>kode kelas</td>
                <td>tanggal</td>
                <td>jam pilihan</td>
              </tr>
              <tr>
                <th>{{ user.nama_kelas }}</th>
                <th>{{ user.id_kelas }}</th>
                <th>{{ user.tanggal }}</th>
                <th>{{ user.jam_pilihan }}</th>
              </tr>
            </table>
          </div>
        </div>
      </div>-->
      <div></div>
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

