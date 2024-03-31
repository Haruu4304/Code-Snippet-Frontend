import creteStore from 'zustand';
import { persist } from 'zustand/middleware';

let appStore = (set) => ({
    open: true,
    updateOpen: (open) => set((state) => ({ open })),
});

appStore = persist(appStore, { name: "my_app_store" });
export const useAppStore = creteStore(appStore);
