<script lang="ts">
export default {
  name: 'HomeIconLink',
}
</script>

<template>
  <RouterLink to="/">
    <div class="homeLink">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M16 3L3 14H7V28H13V20H19V28H25V14H29L16 3Z"
          fill="black"
        />
      </svg>
    </div>
  </RouterLink>
</template>

<style scoped>
.homeLink:hover {
  cursor: pointer;
  background: darkgray;
}
</style>