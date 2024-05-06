<template>
  <div class="header">
    <div class="header__logo">
      <NuxtLink to="/">
        Список Задач
      </NuxtLink>
    </div>
  </div>
  <div class="center-container">
    <CommonForm />
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #FFFFFF;

  &__logo {
    a {
      color: #000;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
    }
  }
}
</style>
