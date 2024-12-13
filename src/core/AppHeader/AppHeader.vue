<script lang="ts">
import HomeIconLink from "@/core/AppHeader/HomeIconLink.vue";

export default {
  name: 'AppHeader',
  components: {HomeIconLink},
};
</script>

<template>
  <div class="header">
    <HomeIconLink/>
    <h1>Vue 3 Infinite Scroll</h1>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 12px;
  background: #006400;
  color: white;
}
</style>