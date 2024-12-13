<script setup lang="ts">
type LimitViewProps = {
  limitValue: number
}
const {limitValue} = defineProps<LimitViewProps>();
</script>

<template>
  <div class="pagingTriggerLimitView">
    <h3>Limit is reached! {{limitValue}}</h3>
  </div>
</template>

<style scoped>
.pagingTriggerLimitView {
  display: flex;
  justify-content: center;
  padding: 16px;
  color: #2E7D32;
  background: #E9F7EF;
}
</style>