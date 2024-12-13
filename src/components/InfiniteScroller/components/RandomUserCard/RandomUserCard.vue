<script setup lang="ts">
import {RandomUserEntity} from "@/components/InfiniteScroller/types";

type RandomUserCardProps = {
  item: RandomUserEntity
}

const {item} = defineProps<RandomUserCardProps>();
</script>

<template>
<div class="userCard">
  <img class="rounded-image" :src="item.picture.large" alt="{{item.name}} photo" />
  <div class="userInfo">
    <h4 class="limitedTextLine">{{`${item.name.first} ${item.name.last}`}}</h4>
    <p class="limitedTextLine">{{item.email}}</p>
    <p>{{item.phone}}</p>
  </div>
</div>
</template>

<style scoped>
.userCard {
  display: flex;
  gap: 8px;
  width: 400px;
  height: 160px;
  padding: 16px;
  border: 1px solid darkgray;
  border-radius: 4px;
}
.rounded-image {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 2px solid #ccc;
  object-fit: cover;
}
.userInfo {
  flex-grow: 1;
}
.limitedTextLine {
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>