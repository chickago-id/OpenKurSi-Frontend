<template>
  <div>
    <navbar></navbar>
    <br />
    <!-- <regis></regis> -->
    <router-view />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import navbar from './components/Navbar.vue';
// import regis from './components/Status.vue';

export default {
  components: {
    navbar
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
