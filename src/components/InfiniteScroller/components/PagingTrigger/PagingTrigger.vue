<script setup lang="ts">
/**
 * @component - PagingTrigger
 * @description - Component that contains:
 * - logic of loading next page of the data
 * - request management
 * - management views of request state (Loading, Error, Limit)
 * */
import {PagingTriggerExpose, PagingTriggerProps} from "./types";
import {onUpdated, useTemplateRef, watch} from "vue";
import {ref} from "vue";
import axios from "axios";
import {RandomUserApiData} from "@/components/InfiniteScroller/types";
import PagingTriggerErrorView
  from "@/components/InfiniteScroller/components/PagingTrigger/components/PagingTriggerErrorView.vue";
import PagingTriggerLoadingView
  from "@/components/InfiniteScroller/components/PagingTrigger/components/PagingTriggerLoadingView.vue";
import PagingTriggerLimitView
  from "@/components/InfiniteScroller/components/PagingTrigger/components/PagingTriggerLimitView.vue";

/**
 * Props:
 * - isTriggerActivated {boolean} - activation flag from parent component, if false PagingTrigger doesn't run request and shoe any view
 * - currentListLength {number} - number of already loaded items. It's used for defining of next page number and detecting reaching of loaded items limit
 * - limitValue {number} - limit of loaded item. If limit is reached, no new request will be run, LimitView is shown. current implementation doesn't contain virtualization logic. Limit is added to compensate that
 * - onPageLoad {(newPage) => void} - outer handler of successful loading on new page of items from the API
 * */
const {isTriggerActivated, currentListLength, limitValue, onPageLoad} = defineProps<PagingTriggerProps>();
const rootElement = useTemplateRef<HTMLDivElement>('root')
defineExpose<PagingTriggerExpose>({
  /**
   * root HTMLElement of PagingTrigger component.
   * It's used by InfiniteScroller parent in IntersectionObserver logic that is related to activation of PagingTrigger
   * */
  rootElement: rootElement
})

// view management
/**
 * Boolean flag of pending state of current request.
 * If isLoading is set to true, no additional request will be run, LoadingView will be shown
 * */
const isLoading = ref<boolean>(false);

/**
 * Boolean flag of indicating error state of current request.
 * If isError is set to true, no additional request will be run automatically, ErrorView will be shown, page can be reloaded manually
 * */
const isError = ref<boolean>(false);

/**
 * Boolean flag indicates last page of items
 * Is hasMore is set to false, no request will be run anymore. It means that all data has been loaded
 * */
const hasMore = ref<boolean>(true);

/**
 * Boolean flag indicates reaching maximum number of items.
 * If isLimitReached is set to true, no request will be run. LimitView will be shown
 * @see limitValue prop
 * */
const isLimitReached = ref<boolean>(currentListLength >= limitValue);

/**
 * Manual reloading of the current page
 * It's used in ErrorView for manual reloading
 * */
const onReload = () => {
  isError.value = false;
}

/**
 * Function that loads new page of data from API.
 * It contains:
 * - defining current page
 * - defining items number per page
 * - view flags management depend on request state
 * - calling outer successful loading handler (@see onPageLoad prop)
 * */
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

/**
 * Try to run request until trigger is activated
 * */
onUpdated(() => {
  if (isTriggerActivated) {
    runApiRequest();
  }
})

/**
 * Watcher for currentListLength prop to detect reaching limit of items
 * */
watch(
    () => currentListLength,
    (value) => {
      isLimitReached.value = value >= limitValue;
    }
)

/**
 * Watcher for limitValue prop to detect reaching limit of items
 * In current implementation limitValue is hardcoded, but as a prop it could be dynamic.
 * That's why we need this watcher
 * */
watch(
    () => limitValue,
    (value) => {
      isLimitReached.value = currentListLength >= value;
    }
)
</script>

<template>
  <li ref="root">
    <paging-trigger-limit-view
      v-if="isLimitReached"
      :limit-value="limitValue"
    />
    <paging-trigger-loading-view v-if="isLoading" />
    <paging-trigger-error-view
      v-if="isError"
      :on-reload="onReload"
    />
  </li>
</template>
