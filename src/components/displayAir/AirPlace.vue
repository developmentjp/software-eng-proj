<template>
  <div class="container">
    <div class="aq-container">
      <div class="header-container">
        <header>
          <div>
            <h1>{{ place.name.toUpperCase() }}</h1>
            <h3>
              {{
                place.state.toUpperCase() + ", " + place.country.toUpperCase()
              }}
            </h3>
          </div>
          <div>
            <svg
              style="height:5rem; width:3rem;"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="map-marked-alt"
              class="svg-inline--fa fa-map-marked-alt fa-w-18"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"
              ></path>
            </svg>
          </div>
        </header>
      </div>
      <div class="content">
        <AirPeriod :period="period"></AirPeriod>
      </div>
    </div>

    <div class="wt-container">
      <WeatherPlace :lat="lat" :long="long"></WeatherPlace>
    </div>
  </div>
</template>

<script>
import AirPeriod from "./AirPeriod";
import WeatherPlace from "../displayWeather/WeatherPlace";
export default {
  components: {
    AirPeriod,
    WeatherPlace,
  },
  props: ["place", "period", "lat", "long"],
  methods: {},
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* padding: 0.5rem; */
}
.aq-container {
  background: #23232e;
  border: 3px solid #23232e;
  border-radius: 0.5rem;
  line-height: 0.75rem;
  display: flex;
  flex-direction: column;
  padding: auto;
  height: 100%;
  width: 100%;
}
.header-container {
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.aq-container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 2rem;
  background: #16161d83;
  border-radius: inherit;
  width: 100%;
  height: 100%;
}

.aq-container .content {
  display: flex;
  justify-content: space-between;
  padding: 0rem 2rem;
  border-radius: inherit;
  height: 100%;
}

.wt-container {
  background: #23232e;
  border: 3px solid #23232e;
  border-radius: 0.5rem;
  line-height: 0.75rem;
  height: 100%;
  margin-top: 0.1rem;
}

@media only screen and (min-height: 1080px) {
  * {
    font-size: 1.3rem;
  }
  header h1 {
    font-size: 1.8rem;
  }
}
</style>
