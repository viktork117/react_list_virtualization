import { create } from 'zustand';

import fetchUsersUtil from '@/utils/fetchUsers';

import pathName from '@/constants/path-name';

import type { User } from '@/types/user';
import type { Languages } from '@/types/languages';

type State = {
  users: User[];
  lang: Languages;
  visibleCount: number;
  offset: number;
  isLoading: boolean;
  fetchUsers: (offset?: number, limit?: number) => Promise<void>;
  loadMore: () => void;
  setLang: (lang: 'ru' | 'en') => void;
};

export const useUserStore = create<State>((set, get) => ({
  users: [],
  lang: 'ru',
  visibleCount: 20,
  offset: 0,
  isLoading: false,
  fetchUsers: async (offset = 0, limit = 20) => {
    if (get().isLoading) return;
    set({ isLoading: true });

    try {
      const lang = get().lang;
      const path = pathName[lang];
      const query = `offset=${offset}&limit=${limit}`;
      const data = await fetchUsersUtil<User[]>({ url: `/${path}`, query });

      if (!data || data.length <= 0) {
        if (offset === 0) set({ users: [], offset: 0 });
        return;
      }

      if (offset === 0) {
        set({ users: data, offset: 0 });
        return;
      }
      
      set((state) => ({
        users: [...state.users, ...data],
        offset,
      }));
    } catch (e) {
      console.error(e);
      if (offset === 0) set({ users: [], offset: 0 });
    } finally {
      set({ isLoading: false });
    }
  },
  loadMore: async () => {
    const { offset, visibleCount, fetchUsers } = get();
    const newOffset = offset + visibleCount;
    await fetchUsers(newOffset, visibleCount);
  },
  setLang: (lang) => {
    set({ lang, visibleCount: 20, offset: 0 });
    get().fetchUsers();
  },
}));