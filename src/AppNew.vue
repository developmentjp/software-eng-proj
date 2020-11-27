<template>
  <nav-bar></nav-bar>
  <div class="router">
    <router-view> </router-view>
  </div>
</template>

<script>
import NavBar from "./components/layouts/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
:root {
  height: 100% !important;
}
* {
  box-sizing: border-box;
} */
/* body {
  background: rgb(29, 33, 37);
  background: red;
  font-size: 16px;
  font-family: "Open Sans";
  color: white;
  margin: 0;
  padding: 0;
  height: 100%;
} */

body::-webkit-scrollbar {
  width: 0.5rem;
}

body::-webkit-scrollbar-track {
  background: #23232e;
}

body::-webkit-scrollbar-thumb {
  background: #ffffff;
}

.router {
  /* background: #1d1d1d; */
  background: blue;
  height: 100%;
  margin-left: 5rem;
  padding: 1rem;
}

@media only screen and (max-width: 600px) {
  .router {
    margin: 0rem 0rem 5rem 0rem;
  }
}
</style>
