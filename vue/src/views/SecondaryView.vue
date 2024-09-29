<template>
  <div id="home">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet" />
    <sub-capa-comp />
  </div>
</template>

<script>
import SubCapaComp from "@/components/SubCapaComp.vue";

export default {
  name: "SecondaryView",
  components: {
    SubCapaComp,
  },
};
</script>