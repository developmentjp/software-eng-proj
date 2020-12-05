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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
:root {
  height: 100% !important;
}
body {
  background: rgb(29, 33, 37);
  /* background: red; */
  font-size: 16px;
  font-family: "Open Sans";
  color: white;
  margin: 0;
  padding: 0;
  height: 100%;
}

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
  /* background: blue; */
  /* height: 100%; change when necessary*/
  height: auto;
  margin-left: 5rem;
}

@media only screen and (max-width: 600px) {
  .router {
    margin: 0rem 0rem 5rem 0rem;
  }
}

/*Transitions*/
/* Enter and leave animations can use different durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 1.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-500px);
  opacity: 0;
}
</style>
