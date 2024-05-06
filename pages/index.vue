<template>
  <LayoutHeader />
  <div class="tasks">
    <CommonSorting @updateSorting="sorting"/>
    <div class="tasks__box">
      <CommonCard
          v-for="task in getTasks"
          :key="task.id"
          :task="task"
      />
    </div>
    <CommonPagination :total-pages="totalPages" @change-page="changePage"/>
  </div>
</template>


<script lang="ts" setup>
import { useTasksStore } from '~/store/tasks'

definePageMeta({
  middleware: 'auth'
})

const TasksStore = useTasksStore()

const sortKey = ref('name')
const totalPages = computed(() => TasksStore.totalPages)

const { tasks: tasks, pending, error } = await useAsyncData(
    'tasks',
    () => {
      return TasksStore.loadTasks()
    }
)

const getTasks = computed(() => TasksStore.paginatedTasks)
const sorting = (event: string) => {
  TasksStore.setSort(event)
}

const changePage = (page: number) => {
  TasksStore.setPage(page)
}

</script>

<style lang="scss" scoped>
.tasks {
  display: flex;
  flex-direction: column;

  &__box {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: flex-start;

  }
}
</style>
