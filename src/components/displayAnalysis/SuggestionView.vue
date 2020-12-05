<template>
  <section>
    <Accordion>
      <AccordionTab v-for="tab in tabs" :key="tab.title" :header="tab.title">
        <p>{{ tab.content }}</p>
      </AccordionTab>
    </Accordion>
  </section>
</template>

<script>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

export default {
  components: {
    AccordionTab,
    Accordion,
  },
  props: ["tabs"],
  data() {
    return {
      changeHeaderIcon: false,
    };
  },
  methods: {
    viewContent() {
      this.changeHeaderIcon = !this.changeHeaderIcon;
    },
  },
};
</script>

<style scoped>
section {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
h3,
h5 {
  margin-block-start: 0rem;
  margin-block-end: 0rem;
}
</style>
