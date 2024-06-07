import axios from 'axios';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;

export const useUsers = create((set) => ({
  isLoading: false,
  userState: {
    users: [],
  },

  getAllUsers: () => {
    set(() => ({
      isLoading: true,
    }));

    axios.get(`${apiUrl}/usuarios`).then((res) =>
      set((state) => ({
        userState: { ...state.userState, users: res.data },
        isLoading: false,
      }))
    );
  },
  deleteUser: async (userId) => {
    set(() => ({
      isLoading: true,
    }));

    try {
      await axios.delete(`${apiUrl}/usuarios/${userId}`);
      set((state) => ({
        userState: {
          ...state.userState,
          users: state.userState.users.filter((user) => user.userId !== userId),
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      set(() => ({
        isLoading: false,
      }));
      throw error;
    }
  },
}));
