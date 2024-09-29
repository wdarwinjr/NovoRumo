<template>
  <div id="home">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet" />
    <capa-comp />
  </div>
</template>

<script>
import CapaComp from "@/components/CapaComp.vue";

export default {
  name: "PrincipalView",
  components: {
    CapaComp,
  },
};
</script>