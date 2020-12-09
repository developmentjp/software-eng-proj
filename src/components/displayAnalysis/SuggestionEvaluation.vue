<template>
  <section>
    <div class="heading">
      <h1>Context Evaluation Report &nbsp;</h1>
      <!-- <i class="pi pi-briefcase" style="fontSize: 1.5rem"></i> -->
    </div>
    <div class="body">
      <div class="dashboard">
        <div class="list">
          <div class="word">
            <div class="word-title">
              <h1 class="pos">Positive Words</h1>
            </div>
            <div class="word-body">
              <ul
                v-for="positive in sentimentBody.positiveWords"
                :key="positive"
              >
                <li>{{ positive }}</li>
              </ul>
            </div>
          </div>
          <div class="word">
            <div class="word-title">
              <h1 class="neg">Negative Words</h1>
            </div>
            <div class="word-body">
              <ul
                v-for="negative in sentimentBody.negativeWords"
                :key="negative"
              >
                <li>{{ negative }}</li>
              </ul>
            </div>
          </div>
        </div>
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
        console.log(this.sentimentResult);
        this.analyzeScore();
      } else {
        alert("No query");
      }
    },
    analyzeScore() {
      console.log(this.sentimentResult.score);
      if (this.sentimentResult.score === null) {
        console.log("Failed analysis");
      } else {
        if (this.sentimentResult.score > 0) {
          this.sentimentBody.status = "Positive";
        } else {
          this.sentimentBody.status = "Negative";
        }
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
      }
      console.log(this.sentimentBody);
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
  display: flex;
}
.chart {
  height: 100%;
  background: violet;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 1rem;
}
.list {
  padding: 0rem !important;
  justify-content: space-between;
}
.list .word {
  width: 50%;
  height: 80%;
  margin-right: 0.3rem;
  border: 2px solid black;
  border-radius: 1rem;
}
.word .word-title {
  padding: 0.5rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  background: #16161d;
  text-align: center;
  font-size: 1.3rem;
}
.word-title .pos {
  color: rgba(49, 255, 49, 0.644);
}
.word-title .neg {
  color: rgba(255, 47, 47, 0.692);
}
.word-body {
  height: 75%;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1rem;
  background: #16161d2a;
}
.word ul {
  margin: 0rem;
  padding: 0rem;
  list-style: none;
  text-align: center;
}
.word ul li {
  width: 100%;
}
</style>
