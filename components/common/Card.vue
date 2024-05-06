<template>
  <div class="task">
    <div class="task__title">
      <h3 v-if="!isEditing">{{ task.title }}</h3>
      <input v-else type="text" v-model="editableTask.title" />
    </div>
    <div class="task__details">
      <span class="task__details-email">{{ task.email }}</span>
      <span v-if="!isEditing" class="task__details-description">{{ task.description }}</span>
      <textarea v-else v-model="editableTask.description"></textarea>
      <span v-if="!isEditing" :class="`task__details-status ${statusClass}`">{{ statusText }}</span>
      <select v-else v-model="editableTask.status">
        <option v-for="status in availableStatuses" :key="status.value" :value="status.value">
          {{ status.name }}
        </option>
      </select>

      <button v-if="userRole === 'admin'" @click="toggleEditing">
        {{ isEditing ? 'Сохранить' : 'Редактировать' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from '@/store/tasks'
import { useAuthStore } from '@/store/auth.ts';

const { userRole } = useAuthStore();
const TasksStore = useTasksStore()

const props = defineProps({
  task: {
    type: Object as () => { status: number, title: string, email: string, description: string },
    required: true
  }
});

const isEditing = ref(false);
const editableTask = reactive({ ...props.task });

const availableStatuses = computed(() => [
  { name: "В работе", value: 1 },
  { name: "Выполнено", value: 2 },
  { name: "Не выполнено", value: 3 }
].filter(status => status.value !== props.task.status));

const toggleEditing = () => {
  if (isEditing.value) {
    TasksStore.editTask(editableTask)
  }
  isEditing.value = !isEditing.value;
};

const statusInfo = computed(() => {
  switch (props.task.status) {
    case 1:
      return { class: 'in-progress', text: 'В работе' };
    case 2:
      return { class: 'completed', text: 'Выполнено' };
    case 3:
      return { class: 'open', text: 'Не Выполнено' };
    default:
      return { class: 'open', text: 'Неизвестный статус' };
  }
});

const statusClass = computed(() => statusInfo.value.class);
const statusText = computed(() => statusInfo.value.text);

</script>

<style lang="scss" scoped>

.task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 calc(33.333% - 20px);
  margin: 10px;
  background-color: #FFFFFF;
  padding: 16px;
  border-radius: 10px;
  gap: 16px;

  &__title {
    text-align: center;

    h3 {
      color: #000;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px;
    }

    input {
      display: flex;
      padding: 8px;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 10px;
      border: 1px solid #E2E2E2;
      color: #959595;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      outline: none;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 8px;

    textarea {
      display: flex;
      padding: 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 10px;
      border: 1px solid #E2E2E2;
      color: #959595;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      outline: none;
    }

    select {
      display: flex;
      padding: 8px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      border-radius: 10px;
      border: 1px solid #E2E2E2;
      color: #959595;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
      outline: none;
    }

    button {
      width: 100%;
      display: flex;
      padding: 8px;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background: #2649FF;
      color: #FFFFFF;
      outline: none;
      border: none;
    }

    &-email {
      color: rgba(0, 0, 0, 0.40);
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
    }

    &-description {
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px
    }

    &-status {
      font-size: 14px;
      font-weight: 600;
      border-radius: 4px;
      padding: 4px 8px;
      text-align: center;

      &.open {
        background-color: #ffc107;
        color: #333;
      }

      &.completed {
        background-color: #28a745;
        color: #fff;
      }

      &.in-progress {
        background-color: #17a2b8;
        color: #fff;
      }
    }
  }
}

</style>
