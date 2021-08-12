<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
/*#app {*/
/*  min-height: 100vh;*/
/*  width: 100%;*/
/*  background-color: #f5f5f5;*/
/*}*/

</style>
