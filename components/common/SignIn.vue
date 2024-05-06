<template>
  <div class="signIn">
    <div v-if="errorMessage" class="signIn__error">{{ errorMessage }}</div>
    <div class="signIn__form">
      <input type="email" v-model="user.email" placeholder="Введитие почту">
      <input type="password" v-model="user.password">
    </div>
    <div class="signIn__action">
      <button @click="login">Sign In</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticateUser } = useAuthStore();

const { authenticated, errorMessage } = storeToRefs(useAuthStore());

const user = ref({
  email: '',
  password: null,
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);

  if (authenticated) {
    router.push('/');
  }
};

</script>

<style lang="scss">
.signIn {
  background-color: #FFFFFF;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 30%;

  &__error {
    color: red;
    margin-bottom: 16px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

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
  }

  &__action {
    width: 100%;

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
