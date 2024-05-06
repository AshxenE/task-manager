<template>
  <div class="sorting">
    <select v-model="selectedSort" @change="sort">
      <option value="name">По Названию задачи</option>
      <option value="email">По емайл</option>
      <option value="status">По статусу</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(["updateSorting"]);

const selectedSort = ref('name');

const sort = () => {
  emit('updateSorting', selectedSort.value)
}
</script>

<style lang="scss" scoped>
.sorting {
  padding: 10px;
}
</style>
