import axios from 'axios';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;
export const useFavoritos = create((set) => ({
  isLoading: false,
  favState: {
    favoritos: [],
  },

  getAllFavoritos: (userId) => {
    set(() => ({
      isLoading: true,
    }));

    axios.get(`${apiUrl}/favoritos/usuario/${userId}`).then((res) =>
      set((state) => ({
        favState: { ...state.favState, favoritos: res.data },
        isLoading: false,
      }))
    );
  },
  deleteFavs: (usuarioId, productoId) => {
    set(() => ({
      isLoading: true,
    }));

    const data = {
      usuarioId,
      productoId,
    };

    axios.delete(`${apiUrl}/favoritos/`, { data }).then(() =>
      set((state) => ({
        favState: {
          ...state.favState,
          favoritos: state.favState.favoritos.filter(
            (favorito) => favorito.productoId !== productoId
          ),
        },
        isLoading: false,
      }))
    );
  },

  addFavoritos: (usuarioId, productoId) => {
    set(() => ({
      isLoading: true,
    }));

    const data = {
      usuarioId,
      productoId,
    };
    axios.post(`${apiUrl}/favoritos`, data).then((res) =>
      set((state) => ({
        isLoading: false,
      }))
    );
  },
}));
