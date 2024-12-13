<script setup lang="ts">
/**
 * @component PagingTriggerErrorView
 * @description - view of trigger in case of unsuccessful API-request
 * It's possible to reload current page manually in PagingTriggerErrorView
 * @see PagingTrigger
 * */
type ErrorViewProps = {
  /**
   * Function for manual reloading of current page
   * It's used as click handler for Reload button
   * */
  onReload: () => void
}
const {onReload} = defineProps<ErrorViewProps>()
</script>

<template>
  <div class="pagingTriggerErrorView">
    <div>
      <h3>Error occurs during loading!</h3>
      <div class="buttonPanel">
        <p>Please, retry loading</p>
        <button @click="onReload">Reload</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagingTriggerErrorView {
  display: flex;
  justify-content: center;
  padding: 16px;
  color: #B00020;
  background: #FF4C4C;
}
.buttonPanel {
  display: flex;
  gap: 12px;
}
</style>