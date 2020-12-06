<template>
  <section>
    <div class="heading">
      <h1>Context Evaluation Report &nbsp;</h1>
      <!-- <i class="pi pi-briefcase" style="fontSize: 1.5rem"></i> -->
    </div>
    <div class="body">
      <div class="dashboard">
        <div class="list"></div>
        <div class="chart">
          <Chart type="pie" :data="chartData" />
        </div>
      </div>
      <div>
        <h1>solution</h1>
      </div>
    </div>
  </section>
</template>

<script>
import Chart from "primevue/chart";
import Sentiment from "sentiment";
let sentiment = new Sentiment();
export default {
  components: {
    Chart,
  },
  props: ["queryReason"],
  mounted() {
    this.analyzeSentiment();
  },
  data() {
    return {
      anotherQueryReason: "",
      sentimentResult: null,
      sentimentBody: {
        status: "",
        words: null,
        positiveWords: null,
        negativeWords: null,
      },
      chartData: null,
    };
  },
  methods: {
    async analyzeSentiment() {
      if (this.queryReason) {
        const result = await sentiment.analyze(this.queryReason);
        this.sentimentResult = result;
      } else {
        alert("No query");
      }

      if (
        this.sentimentResult.score === null ||
        this.sentimentResult[0] === "no"
      ) {
        console.log("Failed analysis");
      } else {
        if (this.sentimentResult.score >= 1) {
          this.sentimentBody.status = "Positive";
          this.sentimentBody.words = [...this.sentimentResult.words];
          this.sentimentBody.positiveWords = [...this.sentimentResult.positive];
          this.sentimentBody.negativeWords = [...this.sentimentResult.negative];
          let data1 = this.sentimentBody.positiveWords.length;
          let data2 = this.sentimentBody.negativeWords.length;
          this.chartData = {
            labels: ["Positive Words", "Negative Words"],
            datasets: [
              {
                data: [data1, data2],
                backgroundColor: [
                  "rgba(49, 255, 49, 0.644)",
                  "rgba(255, 47, 47, 0.692)",
                ],
                hoverBackgroundColor: [
                  "rgba(0, 184, 0, 0.644)",
                  "rgba(148, 0, 0, 0.692)",
                ],
              },
            ],
          };
        } else {
          this.sentimentBody.status = "Negative";
        }
      }
    },
  },
};
</script>

<style scoped>
section {
  width: 100%;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-block-start: 0rem;
  margin-block-end: 0rem;
}
.heading {
  display: flex;
  font-size: 1.5rem;
}
.dashboard {
  display: flex;
}
.dashboard .list,
.chart {
  width: 50%;
  padding: 0.5rem;
  background: gray;
  display: flex;
}
</style>
