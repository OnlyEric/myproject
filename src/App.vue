<template>
  <div id="app">
    <Header></Header>
    <router-view name="main"></router-view>
    <!--<router-view name="sidebar"></router-view>-->
  </div>
</template>
<script>
import Header from './components/Header'
import About from './components/About'
export default {
  name: 'App',
  components:{
    Header,
    About,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html{
  background:white;
}
body,div,span,a,p,ul,li {
	margin: 0;
	padding: 0;
}
</style>
