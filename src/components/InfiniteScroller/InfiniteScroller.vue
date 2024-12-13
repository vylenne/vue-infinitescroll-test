<script lang="ts">
import axios from "axios";
import {InfiniteScrollerData, RandomUserApiData} from "@/components/InfiniteScroller/types";
export default {
  name: "InfiniteScroller",
  data(): InfiniteScrollerData {
    return {
      items: [],
      errorMessage: "",
      isLoading: false,
    };
  },
  created() {
    this.loadItems();
  },
  methods: {
    async loadItems() {
      this.isLoading = true;
      try {
        const response = await axios.get<RandomUserApiData>("https://randomuser.me/api/?results=100"); // Replace with your API URL
        this.items = response.data.results;
      } catch (error) {
        this.errorMessage = "Failed to load items";
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>

<template>
  <div class="infiniteScroller">
    <ul v-if="items.length" class="itemsListContainer">
      <li v-for="item in items" :key="item.email">{{ item.name.first }}</li>
    </ul>
    <p v-else>Loading...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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