import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated, userRole } = storeToRefs(useAuthStore());
    const isAuth = useCookie('isAuth');
    const role  = useCookie('role');

    if (authenticated.value) {
        return;
    }

    if (isAuth.value) {
        authenticated.value = true;
        userRole.value = role;
    } else {
        authenticated.value = false;
    }

    if (!isAuth.value && to.name !== 'auth') {
        return navigateTo('/auth');
    }

    if (isAuth.value && to.name === 'auth') {
        return navigateTo('/');
    }
})
