<template>
  <section>
    <header>
      <h1>DATA IN THE LAST 99 DAYS</h1>
    </header>
    <div class="chart-container">
      <Chart type="line" :data="chartDisplayData" />
    </div>
  </section>
</template>

<script>
import Chart from "primevue/chart";
export default {
  components: { Chart },
  props: ["searchQuery", "chartData", "chartChoice"],
  mounted() {
    this.getChartData();
  },
  data() {
    return {
      headerValue: "",
      chartDisplayData: null,
    };
  },
  methods: {
    getChartData() {
      if (this.chartChoice === "country") {
        const dates = Object.getOwnPropertyNames(this.chartData.timeline.cases);
        const cases = Object.values(this.chartData.timeline.cases);
        const deaths = Object.values(this.chartData.timeline.deaths);
        const recovered = Object.values(this.chartData.timeline.recovered);
        this.chartDisplayData = {
          labels: [...dates],
          datasets: [
            {
              label: "Cases",
              data: [...cases],
              fill: false,
              borderColor: "#42A5F5",
            },
            {
              label: "Deaths",
              data: [...deaths],
              fill: false,
              borderDash: [5, 5],
              borderColor: "#dc143c",
            },
            {
              label: "Recovered",
              data: [...recovered],
              fill: true,
              borderColor: "#FFA726",
              backgroundColor: "rgba(255,167,38,0.2)",
            },
          ],
        };
      } else {
        const dates = Object.getOwnPropertyNames(this.chartData.cases);
        const cases = Object.values(this.chartData.cases);
        const deaths = Object.values(this.chartData.deaths);
        const recovered = Object.values(this.chartData.recovered);
        this.chartDisplayData = {
          labels: [...dates],
          datasets: [
            {
              label: "Cases",
              data: [...cases],
              fill: false,
              borderColor: "#42A5F5",
            },
            {
              label: "Deaths",
              data: [...deaths],
              fill: false,
              borderDash: [5, 5],
              borderColor: "#dc143c",
            },
            {
              label: "Recovered",
              data: [...recovered],
              fill: true,
              borderColor: "#FFA726",
              backgroundColor: "rgba(255,167,38,0.2)",
            },
          ],
        };
      }
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
}
header h1 {
  font-size: 1.5rem;
  margin-block-start: 0em !important;
}
.chart-container {
  height: 100%;
  width: 100%;
  padding: 0.8rem;
}
.p-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  header {
    text-align: center;
  }
  header h1 {
    font-size: 1.2rem;
  }
}
</style>
