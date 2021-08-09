<template>
  <div id="app">
    <Tokensale />
  </div>
</template>

<script>
import Tokensale from './components/Tokensale.vue'

export default {
  name: 'App',
  components: {
    Tokensale
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
