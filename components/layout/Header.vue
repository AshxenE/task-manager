<template>
  <div class="header">
    <div class="header__logo">
      <p>Список Задач</p>
    </div>
    <div class="header__actions">
      <NuxtLink to="/add">
        Добавить задачу
      </NuxtLink>
      <button @click="logOut">Log Out</button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useAuthStore } from '~/store/auth';

const { logUserOut } = useAuthStore();

const logOut = async () => {
  await logUserOut();
};

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #FFFFFF;

  &__logo {
    p {
      color: #000;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    gap: 8px;

    button, a {
      cursor: pointer;
      display: flex;
      padding: 12px 24px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      background: #2649FF;
      outline: none;
      border: none;
      color: #FFF;
      font-size: 16px;
      font-weight: 700;
      line-height: 18px;
    }
    &-button {
      cursor: pointer;
      display: flex;
      padding: 12px 24px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      background: #2649FF;
      outline: none;
      border: none;
      color: #FFF;
      font-size: 16px;
      font-weight: 700;
      line-height: 18px;
    }
  }
}
</style>
