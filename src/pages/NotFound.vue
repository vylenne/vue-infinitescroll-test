<template>
  <div class="NotFoundPage">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">
      Go back to Home
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.NotFoundPage {
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
</style>
