<template>
    <signup></signup>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import signup from '@/views/SignUp.vue';

export default {
  components: {
   signup
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