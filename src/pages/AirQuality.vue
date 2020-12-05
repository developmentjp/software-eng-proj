<template>
  <section>
    <div class="data-info">
      <AirPlace
        :place="place"
        :period="period"
        :lat="lat"
        :long="long"
      ></AirPlace>
    </div>
    <div class="data-analyze">
      <AnalysisBody :period="period"></AnalysisBody>
    </div>
  </section>
</template>

<script>
import dummydata from "../components/datasets/dummydata";
import AirPlace from "../components/displayAir/AirPlace";
import AnalysisBody from "../components/displayAnalysis/AnalysisBody";

export default {
  components: {
    AirPlace,
    AnalysisBody,
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
  padding: 1rem;
}
.data-info {
  height: auto;
  min-width: 30%;
  width: auto;
  border: 3px solid #16161d83;
  /* background: rgb(82, 40, 40); */
}
.data-analyze {
  height: 100%;
  width: 70%;
  /* background: rgb(12, 12, 116); */
  padding: 0.5rem;
}

@media only screen and (max-width: 600px) {
  section {
    height: auto;
    flex-direction: column;
    margin-bottom: 7rem;
    padding: 0.2rem;
  }
  .data-analyze {
    height: 100%;
    width: 100%;
    padding: 0rem !important;
  }
}
@media only screen and (min-height: 1080px) {
  section {
    padding: 3rem 3rem 1rem 3rem;
  }
}
</style>
