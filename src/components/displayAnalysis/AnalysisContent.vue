<template>
  <section>
    <p-button
      style="color:white"
      label="Return Back"
      class="p-button-outlined"
      @click="goBack"
    />
    <div class="analysis-content">
      <h1>Analysis</h1>
      <div class="analysis-suggestion">
        <div>
          <i class="pi pi-user" style="fontSize: 3rem"></i>
          <h3>
            Hello User!&nbsp; We Noticed that the Air Quality Around you is
            {{ period.category }} with an AQI rating of {{ period.aqi }}!
          </h3>
        </div>
      </div>
      <div class="analysis-suggestion suggestion">
        <div>
          <h3>
            We provided here some solutions and suggestions that might help you:
          </h3>
        </div>
        <Accordion>
          <AccordionTab
            v-for="tab in tabs"
            :key="tab.title"
            :header="tab.title"
          >
            <p>{{ tab.content }}</p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </section>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
export default {
  components: {
    Accordion,
    AccordionTab,
  },
  props: ["period"],
  emits: ["show-solution"],
  data() {
    return {
      tabs: [
        { title: "Title 1", content: "lorem25" },
        { title: "Title 3", content: "Content 2" },
        { title: "Title 3", content: "Content 3" },
      ],
    };
  },
  methods: {
    goBack() {
      this.$emit("show-solution", false);
    },
  },
};
</script>

<style scoped>
section {
  height: 100%;
  width: 100%;
}
.analysis-content {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.analysis-content h1 {
  font-size: 2rem;
  margin-block-start: 0rem;
  margin-block-end: 1rem;
}
.analysis-suggestion {
  height: auto;
  width: 100%;
  padding: 1rem;
  background: #23232e;
  border: 3px solid #16161d83;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
}
.analysis-suggestion h3 {
  margin-block-start: 0rem;
  margin-block-end: 0rem;
}
.analysis-suggestion div {
  display: flex;
  align-items: center;
}
.analysis-suggestion div h3 {
  margin-left: 1rem;
}
.suggestion {
  height: auto;
  background: rgb(104, 101, 92);
}
.suggestion div {
  display: flex;
  justify-content: center;
}
</style>
