<template>
  <div class="container">
    <h1>AIR QUALITY INDEX</h1>
    <div class="aqi" :style="{ background: '#' + period.color }">
      <h1>{{ period.aqi }}</h1>
    </div>
    <h2 :style="{ color: '#' + period.color }">
      {{ period.category.toUpperCase() }}
    </h2>
    <div class="dominant">
      <h3 class="pollutant-text">Dominant Pollutant: {{ period.dominant }}</h3>
      <span
        style="text-align:center;display: flex; align-items:center; margin-left:0.25rem"
      >
        <i
          @click="search"
          class="pi pi-question-circle"
          style="font-size: 1rem; cursor: pointer;"
        ></i>
      </span>
    </div>
    <p><i>*Data fetch from https://api.aerisapi.com</i></p>
    <Dialog v-model:visible="display">
      <template #header>
        <h3>{{ period.dominant }}</h3>
      </template>
      <div class="dialog-content">
        {{ content }}
      </div>
      <template #footer>
        <Button
          class="p-button-secondary"
          label="Ok"
          icon="pi pi-check"
          autofocus
          @click="closeSearch"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import pollutiondata from "../datasets/pollutiondata";
export default {
  components: {
    Dialog,
    Button,
  },
  props: ["period"],
  data() {
    return { display: false, content: "", pd: pollutiondata };
  },
  methods: {
    search() {
      this.display = true;
      this.checkContent();
    },
    closeSearch() {
      this.display = false;
    },
    checkContent() {
      if (this.period.dominant === "pm2.5") {
        this.content = this.pd.pm25;
      }
      if (this.period.dominant === "pm10") {
        this.content = this.pd.pm10;
      }
      if (this.period.dominant === "co") {
        this.content = this.pd.co;
      }
      if (this.period.dominant === "no2") {
        this.content = this.pd.no2;
      }
      if (this.period.dominant === "so2") {
        this.content = this.pd.so2;
      }
      if (this.period.dominant === "o3") {
        this.content = this.pd.o3;
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.aqi {
  height: 5rem;
  width: 5rem;
  background: green;
  text-align: center;
  padding-top: 0.6rem;
}
.dominant {
  display: flex;
  justify-content: space-between;
}
.dialog-content {
  max-width: 20rem;
  line-height: 1rem;
}

h3 {
  color: red;
}
p {
  font-size: 0.7rem;
}

@media only screen and (max-width: 600px) {
  .pollutant-text {
    font-size: 1rem;
  }
}
</style>
