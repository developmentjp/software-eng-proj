<template>
  <section class="container">
    <analysis-table v-if="!viewSolution" @showSolution="show"></analysis-table>
    <analysis-content
      v-else
      @showSolution="show"
      :period="period"
    ></analysis-content>
  </section>
</template>

<script>
import AnalysisContent from "./AnalysisContent.vue";
import AnalysisTable from "./AnalysisTable";
export default {
  props: ["period"],
  components: {
    AnalysisTable,
    AnalysisContent,
  },
  data() {
    return {
      viewSolution: false,
    };
  },
  methods: {
    show(value) {
      this.viewSolution = value;
    },
  },
};
</script>

<style scoped>
/* .container {
  height: 100%;
  width: 100%;
} */
.container {
  padding: 0rem !important;
}
</style>
