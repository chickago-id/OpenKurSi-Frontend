<template>
  <div>
    <b-container class="qwe">
      <b-card>
        <div>
          <h1 class="nilaitengah">Nilai</h1>
          <br />
          <p>
            nama kelas : Desain Grafis
            <br />kode kelas : 12DG
          </p>
        </div>
        <table class="table" style="text-align: center;">
          <thead>
            <tr>
              <th>Nama Siswa</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Budi</td>
              <td>A</td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <b-button @click="print" variant="primary">Simpan</b-button>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script >
    export default{
      methods: {
        print(){
            window.print()
        }
      }
        
    }


</script>
<style>
.qwe {
  max-width: 50rem;
}
.nilaitengah {
  text-align: center;
}
</style>