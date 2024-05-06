<template>
<div class="add-task">
  <div class="add-task__title">
    <h3>Добавление задачи</h3>
  </div>
  <div class="add-task__form">
    <input type="text" v-model="form.title" placeholder="Заголовок">
    <input type="email" v-model="form.email" placeholder="Почта">
    <textarea v-model="form.description" placeholder="Описание"/>
    <button @click="addTask">Добавить задачу</button>
  </div>
</div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { useTasksStore } from '~/store/tasks'

const TasksStore = useTasksStore()

const form = reactive({
  title: '',
  email: '',
  description: '',
  status: 3,
})

const rules = {
  title: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(25),
  },
  email: {
    required,
    email
  },
}

const v$ = useVuelidate(rules, form)

const addTask = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    TasksStore.addTask(form)
    navigateTo('/')
  }
}

</script>

<style lang="scss" scoped>
.add-task {
  width: 50%;

  &__title {
    text-align: center;
    margin-bottom: 10px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    input {
      display: flex;
      padding: 16px;
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

    textarea {
      display: flex;
      padding: 16px;
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
      padding: 16px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: #FFC700;
      outline: none;
      border: none;
    }
  }
}
</style>
