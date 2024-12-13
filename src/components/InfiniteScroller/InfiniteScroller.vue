<script setup lang="ts">
/**
 * @component InfiniteScroller
 * @description This component contains logic of displaying infinite scrolled list of items with page loading by reaching the end of the current item list.
 */
import {RandomUserEntity} from "@/components/InfiniteScroller/types";
import { onMounted, ref} from "@vue/runtime-dom";
import {onBeforeUnmount, useTemplateRef} from "vue";
import PagingTrigger from "@/components/InfiniteScroller/components/PagingTrigger/PagingTrigger.vue";
import {PagingTriggerExpose} from "@/components/InfiniteScroller/components/PagingTrigger/types";
import RandomUserCard from "@/components/InfiniteScroller/components/RandomUserCard/RandomUserCard.vue";

/**
  Limitation of items count in the list
  In current implementation it's hardcoded
*/
const ITEMS_LIMIT_VALUE = 50;

/**
 State of loaded items of the list.
 In current implementation it's Random Users lists
 */
const items = ref<RandomUserEntity[]>([]);

/**
 Main callback-handler for handling next page of items
 @param {RandomUserEntity[]} newPage - loaded next page of items (in this implementation - RandomUserEntity array, type should be the same with {items} state)
 */
const onPageLoad = (newPage: RandomUserEntity[]) => {
  items.value = [...items.value, ...newPage];
}

/**
 * Reference to trigger components
 * It's used for gathering HTML root element of PagingTrigger child component for using it in IntersectionObserver
 * */
const triggerElemRef = useTemplateRef<PagingTriggerExpose>('trigger');

/**
 * Boolean toggle indicates that the end of the list is reached
 * It means that trigger logic should be activated, if isEndOfListReached == true
 * */
const isEndOfListReached = ref(false);

/**
 * The instance of IntersectionObserver
 * Used for detection end of the scrolled list of items
 */
const observer = ref<IntersectionObserver | null>(null);

/**
 * IntersectionObserver logic setup
 * @param {HTMLElement} targetElem - observed HTML element for tracking its intersection with viewport
 * When intersection is detected, isEndOfListReached is set to true
 * When observed element leaves viewport, isEndOfListReaches is set to false
 * */
const observe = (targetElem: HTMLElement) => {
  if (observer.value || !targetElem) return;

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) {
      isEndOfListReached.value = true;
    } else {
      isEndOfListReached.value = false;
    }
  };

  observer.value = new IntersectionObserver(onIntersect, {
    threshold: 0.1,
  });

  observer.value.observe(targetElem);
};

/**
 * Start observing of HTML root element of PagingTrigger child component
 * */
onMounted(() => {
  if (triggerElemRef.value?.rootElement) {
    observe(triggerElemRef.value?.rootElement);
  } else {
    console.error("InfiniteScroller: trigger element is null")
  }
})

/**
 * Disconnect IntersectionObserver before unmount
 * */
onBeforeUnmount(() => {
  observer.value?.disconnect();
})
</script>

<template>
  <div class="infiniteScroller">
    <ul class="itemsListContainer">
      <li v-for="item in items" :key="item.email">
        <random-user-card :item="item"/>
      </li>
      <paging-trigger
          ref="trigger"
          :current-list-length="items.length"
          :is-trigger-activated="isEndOfListReached"
          :on-page-load="onPageLoad"
          :limit-value="ITEMS_LIMIT_VALUE"
      />
    </ul>
  </div>
</template>

<style scoped>
.infiniteScroller {
  flex-grow: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
}
.itemsListContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 0;
  overflow-y: auto;
}
</style>