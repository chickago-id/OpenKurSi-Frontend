<template>
    <b-container>
        <b-card>
            <h3 slot='header'>Tambah Kelas</h3>
            <b-form>
                <b-form-group
                    label="Kelas"
                >
                    <b-form-select id="kelas"></b-form-select>
                </b-form-group>

                <b-form-group label="Jam Pilihan">
                    <b-form-input type="text" id="jam_pilihan"></b-form-input>
                </b-form-group>

                <b-form-group label="Tangal Mulai">
                    <b-form-input type="date" id="tgl_mulai"></b-form-input>
                </b-form-group>

                <b-form-group label="Target Peserta">
                    <b-form-input id="target" type="number" min="0"></b-form-input>
                </b-form-group>
                <div class="text-center">
                    <b-button type="submit" size="sm" variant="primary">Simpan</b-button> &nbsp;
                    <b-button to="/admin/kelas" size="sm" variant="danger">Kembali</b-button>
                </div>
            </b-form>
        </b-card>
    </b-container>
</template>
