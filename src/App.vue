<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/addictions/new">New Addiction</router-link> | 
      <router-link to="/circumstances/new">New Circumstance</router-link> | 
      <router-link to="/addictionOccurrences/new">New Addiction Occurrence</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
/*DELETE THIS STUFF*/

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
