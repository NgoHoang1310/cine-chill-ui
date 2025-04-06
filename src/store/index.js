import { useMyListStore } from './myList';
import { useConfigStore } from './shared';
import useAuthStore from './auth/authStore';

export function useStore() {
    return {
        user: useAuthStore(),
        myList: useMyListStore(),
        shared: useConfigStore(),
        auth: useAuthStore(),
    };
}
