<template>
  <div class="appContainer">
    <AppHeader/>
    <RouterView class="contentContainer"/>
  </div>
</template>

<script lang="ts">
import AppHeader from "@/core/AppHeader/AppHeader.vue";

export default {
  name: 'App',
  components: {AppHeader},
};
</script>

<style scoped>
.appContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.contentContainer {
  flex-grow: 1;
}
</style>
