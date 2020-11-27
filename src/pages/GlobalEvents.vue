<template>
  <section>
    <form @submit.prevent="getQuery">
      <InputText
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        style="width: 20rem"
      />
      <Button
        v-if="!isLoading"
        style="color: white; margin-left:0.5rem"
        class="p-button-secondary p-button-outlined"
        type="submit"
        label="Search Country"
      />
    </form>
    <section>
      <div class="pie">
        <CovidPie></CovidPie>
      </div>
      <div class="chart">
        <CovidChart></CovidChart>
      </div>
    </section>
  </section>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import CovidPie from "../components/displayCovidCharts/CovidPie";
import CovidChart from "../components/displayCovidCharts/CovidChart";
export default {
  components: {
    InputText,
    Button,
    CovidPie,
    CovidChart,
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  height: 100%;
}
section {
  display: flex;
  margin: 1rem 0rem 0rem 0rem;
  height: 100%;
  width: 100%;
}
.data-info {
  height: 100%;
  min-width: 30%;
  width: auto;
  /* background: rgb(82, 40, 40); */
}
.data-analyze {
  height: 100%;
  width: 70% auto;
  /* background: rgb(12, 12, 116); */
  padding: 0.5rem;
}

@media only screen and (max-width: 600px) {
  section {
    flex-direction: column;
  }
}
</style>
