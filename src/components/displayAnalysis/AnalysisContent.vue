<template>
  <p-button
    style="color:white"
    label="Return Back"
    class="p-button-outlined"
    @click="check"
  />
  <h1>hellow world</h1>
</template>

<script>
export default {
  emits: ["show-solution"],
  methods: {
    check() {
      this.$emit("show-solution", false);
    },
  },
};
</script>

<style></style>
