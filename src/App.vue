<template>
  <div id="app">
    <HelloWorld/>
    <Foot></Foot> 
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Foot from './components/Foot.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Foot,

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
