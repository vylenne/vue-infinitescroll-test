<template>
  <div class="homePage">
    <h2>Random Users</h2>
    <InfiniteScroller/>
  </div>
</template>

<script lang="ts">
import InfiniteScroller from "@/components/InfiniteScroller/InfiniteScroller.vue";
export default {
  name: 'Home',
  components: {InfiniteScroller},
};
</script>

<style scoped>
.homePage {
  width: 100%;
  background: darkgray;
  display: flex;
  flex-direction: column;
}
</style>
