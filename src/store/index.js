import { useMyListStore } from './myList';
import { useHistoryStore } from './history';
import { useConfigStore } from './shared';
import useAuthStore from './auth/authStore';

export function useStore() {
    return {
        user: useAuthStore(),
        myList: useMyListStore(),
        history: useHistoryStore(),
        shared: useConfigStore(),
        auth: useAuthStore(),
    };
}
