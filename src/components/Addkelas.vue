<template>
    <div>
        <b-container>
            <b-card
                title="Tambah Kelas"
            >
                <b-form>  
                    <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="3"
                        label-cols-lg="2"
                        label="Kelas"
                        label-for="input-horizontal"
                    >
                    <b-form-select id="kelas" :options='kelastersedia'></b-form-select>
                    </b-form-group>
                
                    <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="3"
                        label-cols-lg="2"
                        label="Jadwal"
                        label-for="input-horizontal"
                    >
                    <b-form-input id="jadwal"></b-form-input>
                    </b-form-group>
                    <b-form-group >
                        <b-button type="submit" variant="primary" align="right">Submit</b-button>
                    </b-form-group>
                </b-form>
            </b-card>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
      return {
          kelastersedia :[{text: 'Pilih Salah Satu', value: null}, 'Office', 'Desain']
      }
    },
}
</script>

