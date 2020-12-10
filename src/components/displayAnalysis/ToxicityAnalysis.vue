<template>
  <Chart type="bar" :data="basicData" />
</template>

<script>
import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import Chart from "primevue/chart";
export default {
  components: {
    Chart,
  },
  props: ["queryReason"],
  mounted() {
    this.calculateToxicity();
  },
  data() {
    return {
      basicData: null,
      probabilityMatches: null,
    };
  },
  methods: {
    async calculateToxicity() {
      const threshold = 0.9;
      const sentences = [this.queryReason];
      // toxicity.load(threshold).then((model) => {
      //   const sentences = [this.queryReason];
      //   model.classify(sentences).then((predictions) => {
      //     console.log(predictions);
      //   });
      // });
      const model = await toxicity.load(threshold);
      const predictions = await model.classify(sentences);
      console.log(predictions);
      const labels = [];
      const matches = [];
      const probs = [];
      for (let obj = 0; obj < predictions.length; obj++) {
        labels.push(predictions[obj].label);
        matches.push(predictions[obj].results[0].match);
        // probs.push(predictions[obj].results[0].probabilities);
        let aveProb = 0;
        let count = 0;
        for (
          let prob = 0;
          prob < predictions[obj].results[0].probabilities.length;
          prob++
        ) {
          aveProb += predictions[obj].results[0].probabilities[prob];
          count++;
        }
        aveProb = aveProb / count;
        // let value = toString(aveProb);
        // console.log(value.substr(0, 4));
        // aveProb = parseFloat(value);
        if (aveProb > 1) {
          probs.push(1.0);
        } else {
          probs.push(aveProb);
        }
      }
      console.log(matches);
      this.probabilityMatches = matches;
      this.basicData = {
        labels: [
          "Identity Attack",
          "Insult",
          "Obscene",
          "Severe Toxicity",
          "Sexual Explicit",
          "Threat",
          "Toxicity",
        ],
        datasets: [
          {
            label: "Prediction Probability",
            backgroundColor: "#42A5F5",
            data: [...probs],
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.p-chart {
  height: 100%;
  width: 70%;
}
</style>
