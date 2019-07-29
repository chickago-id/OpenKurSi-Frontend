<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">OpenKursi</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item to="/">Home</b-nav-item> -->
          <b-nav-item to="/jadwal">Jadwal</b-nav-item>
          <b-nav-item to="/admin/kelas">Kelas</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <!-- <b-nav-item href="#">Home</b-nav-item> -->
            <!-- <b-nav-item href="#"></b-nav-item> -->
          </b-navbar-nav>
          <b-nav-form>
            <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
          </b-nav-form>
          <b-navbar-nav>
            <Loginnav />
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Loginnav from "./Poplog";

export default {
  name: "App",
  components: {
    Loginnav
  }
};
</script>

<style>
/* navbar {
  position: fixed;
} */
</style>