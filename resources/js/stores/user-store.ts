import { create } from 'zustand';
import { User } from '@/models/user';
import axios from 'axios';

interface UserState {
    users: User[] | null;
    fetchUsers: () => Promise<void>;
    createUser: (user: User) => Promise<void>;
    updateUser: (id: number, user: User) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    users: null,
    fetchUsers: async () => {
        const response = await axios.get('/users');
        set({ users: response.data.users });
    },
    createUser: async (user: User) => {
        await axios.post('/users', user);
    },
    updateUser: async (id: number, user: User) => {
        await axios.put(`/users/${id}`, user);
    },
    deleteUser: async (id: number) => {
        await axios.delete(`/users/${id}`);
    },
}));
