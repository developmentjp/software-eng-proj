<template>
  <div class="container">
    <div class="header-container">
      <header>
        <div>
          <h1>WEATHER STATUS</h1>
          <h3>{{ weather.dateTimeISO }}</h3>
        </div>
        <div style="display:flex; align-items:center">
          <i class="pi pi-spin pi-cog" style="fontSize:3rem"></i>
        </div>
      </header>
    </div>
    <div class="content">
      <svg
        id="temp"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="temperature-high"
        class="svg-inline--fa fa-temperature-high fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M416 0c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-160-16C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.2 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 448c-44.1 0-80-35.9-80-80 0-25.5 12.2-48.9 32-63.8V112c0-26.5 21.5-48 48-48s48 21.5 48 48v192.2c19.8 14.8 32 38.3 32 63.8 0 44.1-35.9 80-80 80zm16-125.1V112c0-8.8-7.2-16-16-16s-16 7.2-16 16v210.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1z"
        ></path>
      </svg>
      <div class="weather-info">
        <h2>
          {{ weather.tempC + "°C"
          }}<span
            >&nbsp;
            <i class="pi pi-spin pi-ellipsis-v" style="fontSize:1rem"></i>
            &nbsp;</span
          >{{ weather.tempF + "°F" }}
        </h2>
        <h3>
          &nbsp;Wind: {{ weather.windKPH }} km/h<span
            >&nbsp;
            <i class="pi pi-spin pi-times" style="fontSize:1rem"></i>
            &nbsp;</span
          >
        </h3>
        <h3>
          &nbsp;&nbsp;&nbsp;Humidity: {{ weather.humidity }}%<span
            >&nbsp;
            <i class="pi pi-spin pi-map-marker" style="fontSize:1rem"></i>
            &nbsp;</span
          >
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import wd from "../datasets/weatherdata";
export default {
  components: {},
  created() {
    this.getWeather();
  },
  props: ["lat", "long"],
  data() {
    return {
      dataW: wd,
      weather: {
        dateTimeISO: "",
        tempC: null,
        tempF: null,
        humidity: null,
        windKPH: null,
        windDir: "",
        weather: "",
      },
    };
  },
  methods: {
    getWeather() {
      // axios
      // .get('https://api.aerisapi.com/observations/14.5995,120.9842?fields=place.name,place.state,place.country,ob.dateTimeISO,ob.tempC, ob.tempF,ob.humidity,ob.windKPH,ob.windDir,ob.weather&client_id=7APExR2ddfjdsgCeRocIX&client_secret=u4BoGnlpdC7aycngIITz1DKurw8PK2rYTvddtYLe')
      // .then(response => {
      //   this.response = response.data
      // })
      // .catch(error => {
      //   console.log(error)
      //   this.errored = true
      // })
      let temp = this.dataW.response.ob.dateTimeISO;
      this.weather.dateTimeISO = temp.substring(0, 10);
      this.weather.tempC = this.dataW.response.ob.tempC;
      this.weather.tempF = this.dataW.response.ob.tempF;
      this.weather.humidity = this.dataW.response.ob.humidity;
      this.weather.windKPH = this.dataW.response.ob.windKPH;
      this.weather.windDir = this.dataW.response.ob.windDir;
      this.weather.weather = this.dataW.response.ob.weather;
    },
  },
};
</script>

<style scoped>
.container {
  /* height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 0.5rem; */
}
/* .aq-container {
  background: #23232e;
  border: 3px solid #23232e;
  border-radius: 0.5rem;
  line-height: 0.75rem;
  height: 60% auto;
} */
.header-container {
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  background: #16161d83;
  width: 100%;
  height: 100%;
  /* display: flex;
  justify-content: space-between;
  padding: 0rem 2rem;
  background: #16161dcc;
  border-radius: inherit; */
}

.content {
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  background: #16161d83;
  padding: 1rem 2rem 0rem 2rem;
  border-radius: inherit;
  height: 100% auto; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  height: 100%;
}
#temp {
  height: 7rem;
  width: 9rem;
}
.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  #temp {
    height: 4rem;
    width: 4rem;
  }
  .weather-info {
    font-size: 1rem;
  }
}
@media only screen and (min-height: 1080px) {
  #temp {
    height: 14rem;
    width: 17rem;
  }
  .weather-info {
    font-size: 1.5rem;
  }
}
</style>
