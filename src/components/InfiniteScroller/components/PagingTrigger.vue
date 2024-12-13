<script setup lang="ts">
import {PagingTriggerExpose, PagingTriggerProps} from "./types";
import {onUpdated, useTemplateRef, watch} from "vue";
import {ref, WatchSource} from "@vue/runtime-dom";
import axios from "axios";
import {RandomUserApiData} from "@/components/InfiniteScroller/types";

const {isTriggerActivated, currentListLength, limitValue, onPageLoad} = defineProps<PagingTriggerProps>();
const rootElement = useTemplateRef<HTMLDivElement>('root')
defineExpose<PagingTriggerExpose>({
  rootElement: rootElement
})

// view management
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);
const hasMore = ref<boolean>(true);
const isLimitReached = ref<boolean>(currentListLength >= limitValue);

const runApiRequest = async () => {
  // in current implementation they are hardcoded
  const ITEMS_IN_PAGE = 10;
  const SEED_CODE = 'testSeed'
  // start request condition
  if (
      isTriggerActivated &&
      hasMore.value &&
      !isError.value &&
      !isLoading.value &&
      !isLimitReached.value
  ) {
    const currentPage = currentListLength / ITEMS_IN_PAGE + 1;
    isLoading.value = true;
    try {
      const response = await axios.get<RandomUserApiData>(`https://randomuser.me/api/?page=${currentPage}&results=${ITEMS_IN_PAGE}&seed=${SEED_CODE}`);
      const newPage = response.data.results || [];
      // detect last page
      if (
          newPage.length === 0 ||
          newPage.length % ITEMS_IN_PAGE !== 0
      ) {
        hasMore.value = false;
      }
      // handle new page data
      onPageLoad(newPage);
    } catch (error) {
      isError.value = true;
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
}

onUpdated(() => {
  if (isTriggerActivated) {
    runApiRequest();
  }
})

watch<WatchSource<number>>(
    () => currentListLength,
    (value) => {
      isLimitReached.value = value >= limitValue;
    }
)

watch<WatchSource<number>>(
    () => limitValue,
    (value) => {
      isLimitReached.value = currentListLength >= value;
    }
)
</script>

<template>
  <li ref="root">trigger</li>
</template>

<style scoped>

</style>