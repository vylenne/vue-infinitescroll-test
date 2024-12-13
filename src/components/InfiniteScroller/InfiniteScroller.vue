<script setup lang="ts">
import {RandomUserEntity} from "@/components/InfiniteScroller/types";
import { onMounted, ref} from "@vue/runtime-dom";
import {onBeforeUnmount, useTemplateRef} from "vue";
import PagingTrigger from "@/components/InfiniteScroller/components/PagingTrigger/PagingTrigger.vue";
import {PagingTriggerExpose} from "@/components/InfiniteScroller/components/PagingTrigger/types";

// in current implementation they are hardcoded
const ITEMS_LIMIT_VALUE = 30;

const items = ref<RandomUserEntity[]>([]);

const onPageLoad = (newPage: RandomUserEntity[]) => {
  // todo: delete
  console.log("onPageLoad: ", newPage)
  items.value = [...items.value, ...newPage];
}

const triggerElemRef = useTemplateRef<PagingTriggerExpose>('trigger');
const isEndReached = ref(false);
const observer = ref<IntersectionObserver | null>(null);
const observe = (targetElem: HTMLElement) => {
  if (observer.value || !targetElem) return;

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) {
      isEndReached.value = true;
    } else {
      isEndReached.value = false;
    }
  };

  observer.value = new IntersectionObserver(onIntersect, {
    threshold: 0.1,
  });

  observer.value.observe(targetElem);
};

onMounted(() => {
  if (triggerElemRef.value?.rootElement) {
    observe(triggerElemRef.value?.rootElement);
  } else {
    console.error("InfiniteScroller: trigger element is null")
  }
})

onBeforeUnmount(() => {
  observer.value?.disconnect();
})
</script>

<template>
  <div class="infiniteScroller">
    <ul class="itemsListContainer">
      <li v-for="item in items" :key="item.email">{{ item.name.first }}</li>
      <PagingTrigger
          ref="trigger"
          :current-list-length="items.length"
          :is-trigger-activated="isEndReached"
          :on-page-load="onPageLoad"
          :limit-value="ITEMS_LIMIT_VALUE"
      />
    </ul>
  </div>
</template>

<style scoped>
.infiniteScroller {
  flex-grow: 1;
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