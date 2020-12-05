<template>
  <section>
    <div class="data-container">
      <header>
        <h1>{{ searchValue.toUpperCase() }}</h1>
      </header>
      <div class="chart-container">
        <Chart type="doughnut" :data="doughnutData" />
      </div>
    </div>

    <div class="data-container">
      <header>
        <h1>{{ totalHeader.toUpperCase() }}</h1>
      </header>
      <div class="chart-container">
        <Chart type="horizontalBar" :data="barData" />
      </div>
    </div>
  </section>
</template>

<script>
import Chart from "primevue/chart";
export default {
  components: {
    Chart,
  },
  props: ["searchQuery", "pieData"],
  mounted() {
    this.checkQuery();
  },
  data() {
    return {
      searchValue: "",
      totalHeader: "",
      doughnutData: null,
      barData: null,
    };
  },
  methods: {
    checkQuery() {
      if (this.searchQuery === "" && this.totalHeader === "") {
        this.searchValue = "Enter a Query first";
        this.totalHeader = "Enter a Query first";
      } else {
        this.searchValue = "DAILY CASES";
        this.totalHeader = "TOTAL CASES";
        this.storeDonutData(this.pieData);
        this.storeBarData(this.pieData);
      }
    },
    storeBarData(data) {
      let temp = [
        data.cases,
        data.recovered,
        data.deaths,
        data.active,
        data.critical,
      ];
      this.barData = {
        labels: ["Cases", "Recovered", "Deaths", "Active", "Critical"],
        datasets: [
          {
            label: "Total Estimate",
            backgroundColor: "#42A5F5",
            data: [...temp],
          },
        ],
      };
    },
    storeDonutData(data) {
      let temp = [data.todayCases, data.todayRecovered, data.todayDeaths];
      this.doughnutData = {
        labels: ["CASES", "RECOVERY", "DEATHS"],
        datasets: [
          {
            data: [...temp],
            backgroundColor: ["#A0DDFF", "#7189FF", "#624CAB"],
            hoverBackgroundColor: ["#537080", "#1e2545", "#2e2452"],
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 0rem !important;
}
.data-container {
  height: 50%;
  width: 100%;
  padding: 0rem !important;

  background: #23232e;
  border: 3px solid #23232e;
}
header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 100%;
  background: #16161d83;
}
h1 {
  margin: 0rem !important;
}
.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}

.p-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
