<template>
  <div id="app" data-app="true">
    <AppHeader/>
    <!-- <PositionMap/> -->
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import PositionMap from './components/PositionMap.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    // PositionMap
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');

#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;
  overflow: hidden;
}
</style> 
