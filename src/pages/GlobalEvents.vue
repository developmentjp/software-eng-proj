<template>
  <section>
    <div class="heading">
      <div class="head-text">
        <h1>&nbsp;<span style="color:red">COVID-19 STATUS: &nbsp;</span></h1>
        <div style="display:flex; align-items:center">
          <h1>{{ headText.toUpperCase() }}</h1>
          <img
            v-if="chartChoice === 'country'"
            class="heading-image1"
            :src="flag"
            alt="flag"
          />
          <img
            v-if="chartChoice === 'world'"
            class="heading-image2"
            :src="flag"
            alt="world"
          />
        </div>
      </div>

      <form @submit.prevent="getQuery">
        <div class="form-input-button">
          <InputText
            class="input-text"
            type="text"
            v-model.trim="tempQuery"
            placeholder="Enter Country Name"
          />

          <Button
            v-if="!isLoading"
            style="color: white;"
            class="submit-button p-button-secondary p-button-outlined"
            type="submit"
            label="Search Country"
          />
          <i v-else class="form-button-loading pi pi-spin pi-spinner"></i>
        </div>
        <span
          ><i style="font-size: 0.7rem"
            >*Try to enter the text "all" to view worldwide data</i
          ></span
        >
      </form>
    </div>

    <div v-if="checkSubmit && !isLoading" class="chart-container">
      <div v-if="checkSubmit" class="pie">
        <CovidPie :search-query="searchQuery" :pie-data="pieData"></CovidPie>
      </div>
      <div v-if="renderChart" class="chart">
        <div v-if="checkSubmit">
          <CovidChart
            :search-query="searchQuery"
            :chart-data="chartData"
            :chart-choice="chartChoice"
          >
          </CovidChart>
        </div>
        <div v-if="!renderChart">
          <i style="fontSize: 5rem;" class="pi pi-spin pi-spinner"></i>
        </div>
      </div>
    </div>

    <div v-if="checkSubmit && isLoading" class="loading-chart">
      <i class="chart-loading pi pi-spin pi-spinner"></i>
    </div>

    <div v-if="!checkSubmit && !isLoading" class="no-data">
      <h1 class="no-data-first-h1">
        :(
      </h1>
      <div class="no-data-child">
        <h1>No Data to display</h1>
        <br />
        <h3>Enter A value on the input field first.</h3>
      </div>
    </div>
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
  data() {
    return {
      searchQuery: "",
      tempQuery: "",
      headText: "",
      flag: null,
      isLoading: false,
      checkSubmit: false,
      pieData: null,
      chartData: null,
      chartChoice: "",
      renderChart: true,
    };
  },
  methods: {
    async getQuery() {
      this.searchQuery = this.tempQuery.slice(0);
      this.tempQuery = "";
      if (this.searchQuery === "") {
        alert("Please enter a country name first!");
      } else {
        try {
          this.isLoading = true;
          this.checkSubmit = false;
          if (this.searchQuery.toLowerCase() === "all") {
            this.chartChoice = "world";
            this.headText = "world";
          } else {
            this.chartChoice = "country";
            this.headText = this.searchQuery;
          }
          const pieData = await this.fetchPieData(this.searchQuery);
          const chartData = await this.fetchChartData(this.searchQuery);

          setTimeout(() => {
            this.isLoading = false;
          }, 500);
          this.pieData = pieData;
          this.chartData = chartData;
          this.checkSubmit = true;
          if (this.chartChoice === "world") {
            this.flag =
              "https://freepngimg.com/thumb/globe/40566-7-earth-globe-free-transparent-image-hq.png";
          } else {
            this.flag = this.pieData.countryInfo.flag;
          }
        } catch (err) {
          this.flag = "";
          this.headText = "";
          alert(err.message);
          this.isLoading = false;
        }
      }
    },
    async fetchPieData(country) {
      if (this.searchQuery === "all") {
        const response = await fetch(
          `https://disease.sh/v3/covid-19/all?today=true&strict=true`
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status} (${response.message}) Please enter a valid data`;
          throw new Error(message);
        }
        const data = await response.json();
        return data;
      } else {
        const response = await fetch(
          `https://disease.sh/v3/covid-19/countries/${country}?today=true&strict=true`
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status} (${response.message}) Please enter a valid data`;
          throw new Error(message);
        }
        const data = await response.json();
        return data;
      }
    },
    async fetchChartData(country) {
      if (this.chartChoice === "country") {
        const response = await fetch(
          `https://disease.sh/v3/covid-19/historical/${country}?lastdays=100`
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status} (${response.message}) Please enter a valid data`;
          throw new Error(message);
        }
        const data = await response.json();
        return data;
      }
      if (this.chartChoice === "world") {
        const response = await fetch(
          `https://disease.sh/v3/covid-19/historical/all?lastdays=100`
        );
        if (!response.ok) {
          const message = `An error has occured: ${response.status} (${response.message}) Please enter a valid data`;
          throw new Error(message);
        }
        const data = await response.json();
        return data;
      }
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  padding: 1rem;
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.head-text {
  display: flex;
  align-items: center;
}
.heading-image1 {
  height: 2.2rem;
  width: 3.5rem;
  margin-left: 1rem;
}
.heading-image2 {
  height: 3.5em;
  width: 3.5rem;
  margin-left: 1rem;
}
.form-input-button {
  display: flex;
}
.form-button-loading {
  font-size: 3rem;
  margin: 0rem 4rem 0rem 3rem;
}
.input-text {
  width: 20rem;
}
.submit-button {
  margin-left: 0.5rem;
}
.no-data {
  height: 100%;
  width: 100%;
  margin: 10rem 0rem 0rem 0rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.no-data h1 {
  margin-block-start: 0rem;
  margin-block-end: 0rem;
  margin-right: 2rem;
}

.no-data-first-h1 {
  font-size: 5rem;
}
.no-data-child h1,
h3 {
  margin-block-start: 0rem;
  margin-block-end: 0rem;
}
.chart-container {
  display: flex;
  height: 100%;
  width: 100%;
  padding-top: 0.5rem;
}
.chart-loading {
  font-size: 10rem;
  margin: 0rem 4rem 0rem 4rem;
}
.loading-chart {
  height: 100%;
  width: 100%;
  padding-top: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie {
  height: auto;
  width: 30%;
}
.chart {
  height: 100%;
  width: 70%;
  background: #23232e;
  border-left: 5px solid #1c1c25;
}
@media only screen and (max-width: 600px) {
  section {
    height: auto;
  }
  section,
  .heading,
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .heading-image1 {
    height: 1.5rem;
    width: 2.2rem;
    margin-left: 0.5rem;
  }
  .heading-image2 {
    height: 2.2rem;
    width: 2.4rem;
    margin-left: 0.5rem;
  }
  .form-input-button {
    flex-direction: column;
    justify-content: center;
  }
  .form-button-loading {
    font-size: 0rem;
  }
  .submit-button {
    margin-left: 0rem;
  }
  .head-text {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
  h1 {
    text-align: center;
    margin-block-start: 0em !important;
    margin-block-end: 0em !important;
  }
  .submit-button {
    margin-top: 0.5rem;
  }
  .chart-container {
    flex-direction: column;
  }
  .pie {
    width: 100%;
  }
  .chart {
    width: 100%;
    background: #23232e;
    border-left: none;
    margin-top: 1rem;
    margin-bottom: 6rem;
  }
  .chart-loading {
    font-size: 5rem;
    margin: 4rem 4rem 0rem 4rem;
  }
  .no-data {
    font-size: 0.8rem;
  }
  .no-data-first-h1 {
    margin-right: 1.3rem !important;
    font-size: 5rem;
  }
}
</style>
