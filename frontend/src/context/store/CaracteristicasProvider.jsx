import axios from 'axios';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;
export const useCaracteristicas = create((set) => ({
  isLoading: false,
  caracteristicasState: {
    caracteristicas: [],
  },

  getAllCaracteristicas: () => {
    set(() => ({
      isLoading: true,
    }));

    axios
      .get(`${apiUrl}/caracteristicas`)
      .then((res) => {
        // console.log(res);
        set((state) => ({
          caracteristicasState: {
            ...state.caracteristicasState,
            caracteristicas: res.data,
          },
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error('Error fetching caracteristicas:', error);
        set(() => ({
          isLoading: false,
        }));
      });
  },
}));
