import axios from 'axios';
import { create } from 'zustand';

export const useProducts = create((set) => ({
  isLoading: false,
  instrumentoState: {
    instrumentos: [],
  },

  getAllInstrumentos: () => {
    set(() => ({
      isLoading: false,
    }));

    axios.get(`${import.meta.env.VITE_API_URL}/productos`).then((res) =>
      set((state) => ({
        instrumentoState: {
          ...state.instrumentoState,
          instrumentos: res.data,
          isLoading: false,
        },
      }))
    );
  },
}));
