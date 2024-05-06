import { defineStore } from 'pinia';
import * as users from '@/jsons/user.json'

interface UserPayloadInterface {
    email: string;
    password: string;
}

interface User {
    email: string;
    password: string;
    role: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        userRole: '',
        errorMessage: ''
    }),
    actions: {
        async authenticateUser({ email, password }: UserPayloadInterface) {
            this.loading = true;
            this.errorMessage = '';
            try {
                const matchedUser = (users.default as User[]).find(user => user.email === email && user.password == password);
                if (matchedUser) {
                    const isAuth  = useCookie('isAuth');
                    const role  = useCookie('role');
                    isAuth.value = true;
                    role.value = matchedUser.role;
                    this.authenticated = true;
                    this.userRole = matchedUser.role;
                } else {
                    this.errorMessage = 'Invalid credentials';
                    throw new Error('Invalid credentials');
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }

        },
        logUserOut() {
            const isAuth  = useCookie('isAuth');
            const role  = useCookie('role');
            isAuth.value = null;
            role.value = null;
            this.authenticated = false;
            this.userRole = '';
            navigateTo('/auth');
        },
    },
});
