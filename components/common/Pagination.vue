<template>
  <div class="pagination">
    <button v-for="page in totalPages" :key="page" @click="changePage(page)">
      {{ page }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  totalPages: Number
})

const emit = defineEmits(['change-page'])

const changePage = (page: number) => {
  emit('change-page', page)
}
</script>

<style lang="scss" scoped>
.pagination {
  padding: 16px;

  button {
    cursor: pointer;
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 13px;
    color: #fff;
    background-color: blue;
    margin-right: 10px;
  }
}
</style>
