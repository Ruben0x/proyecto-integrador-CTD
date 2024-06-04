import axios from 'axios';
import { create } from 'zustand';

export const useStore = create((set) => ({
  isLoading: false,
  itemState: {
    usuarios: [],
  },

  getAllUsuarios: () => {
    set(() => ({
      isLoading: true,
    }));
    axios.get(`${import.meta.env.VITE_API_URL}/usuarios`).then((res) =>
      set((state) => ({
        itemState: { ...state.itemState, usuarios: res.data },
        isLoading: false,
      }))
    );
  },
}));
