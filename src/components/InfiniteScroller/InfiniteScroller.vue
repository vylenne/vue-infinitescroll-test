<script lang="ts">
import axios from "axios";
export default {
  data() {
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
        const response = await axios.get("https://randomuser.me/api/"); // Replace with your API URL
        this.items = response.data;
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
  <div>
    <h1>Items List</h1>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
    <p v-else>Loading...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>

</style>