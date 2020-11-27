<template>
  <section>
    <div class="data-container">
      <h1>{{ searchQuery }}&nbsp;Daily Cases</h1>
      <Chart type="doughnut" :data="doughnutData" />
    </div>
    <div class="data-container">
      <h1>{{ searchQuery }}&nbsp;All Cases</h1>
      <Chart type="polarArea" :data="polarData" />
    </div>
  </section>
</template>

<script>
import Chart from "primevue/chart";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      searchQuery: "",
      searchResults: "",
      countryToday: {
        country: "",
        flag: "",
        todayCases: "",
        todayDeaths: "",
        todayRecovered: "",
      },

      doughnutData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
            hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: red;
  padding: 0.5rem;
  height: 100%;
}
</style>
