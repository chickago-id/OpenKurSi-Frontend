<template>
  <div>
    <navbar></navbar>
    <br>
    <regis></regis> 
  </div>
  
  
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import navbar from './components/Navbar.vue';
import regis from './components/Registration.vue';

export default {
  components: {
   navbar,
   regis
  // HelloWorld
  }
}
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
