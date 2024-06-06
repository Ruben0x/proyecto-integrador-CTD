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
}));

export const addFavoritos = (usuarioId, productoId) => {
  const data = {
    usuarioId,
    productoId,
  };
  try {
    axios.post(`${apiUrl}/favoritos`, data).then((res) => console.log(res));
  } catch (error) {
    console.log(error);
  }
};
