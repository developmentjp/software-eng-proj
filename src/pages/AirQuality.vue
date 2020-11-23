<template>
  <section>
    <div class="data-info">
      <air-place :place="place" :period="period"></air-place>
    </div>
    <div class="data-analyze"></div>
  </section>
</template>

<script>
import dummydata from "./dummydata.js";
import AirPlace from "../components/airData/AirPlace";

export default {
  components: {
    AirPlace,
  },
  created() {
    this.getNavigation();
  },
  data() {
    return {
      long: null,
      lat: null,
      dataB: dummydata,
      place: {
        name: "",
        state: "",
        country: "",
      },
      period: {
        aqi: null,
        category: "",
        color: "",
        dominant: "",
        date: "",
      },
    };
  },
  methods: {
    getNavigation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;
        console.log(this.long, this.lat);
        this.checkNavigation();
      });
    },
    checkNavigation() {
      if (this.lat === null && this.long === null) {
        console.log("Failed to Get User Location!");
      } else {
        this.storeData();
      }
    },
    storeData() {
      this.place.name = this.dataB.response[0].place.name;
      this.place.state = this.dataB.response[0].place.state;
      this.place.country = this.dataB.response[0].place.country;

      this.period.aqi = this.dataB.response[0].periods[0].aqi;
      this.period.category = this.dataB.response[0].periods[0].category;
      this.period.color = this.dataB.response[0].periods[0].color;
      this.period.dominant = this.dataB.response[0].periods[0].dominant;
      let temp = this.dataB.response[0].periods[0].dateTimeISO;
      this.period.date = temp.substring(0, 10);
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  margin: auto;
  height: 100%;
}
.data-info {
  height: 100%;
  width: 30%;
  /* background: rgb(82, 40, 40); */
}
.data-analyze {
  height: 100%;
  width: 70%;
  background: rgb(12, 12, 116);
}
</style>
