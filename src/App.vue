<template>
  <div id="app">
  </div>
</template>

<script>
import VuePlotly from '@statnett/vue-plotly'

export default {
  name: 'App',
  components: {
    HelloWorld,
    VuePlotly
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
  margin-top: 60px;
}
</style>
