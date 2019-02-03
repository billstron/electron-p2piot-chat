<template>
  <div id="app">
    <div id="header">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/profile">Profile</router-link>
    </div>
    <router-view id="main"/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr;
  grid-template-areas:  "header"
                        "main";

  min-height: 0;
  overflow: hidden;
  #header {
    grid-area: header;
  }

  #main {
    grid-area: main;
    min-height: 0;
  }

}
</style>
