import axios from 'axios';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;

// const { userState } = useUsers();

// const accessToken = userState.token.accessToken;

export const userProductos = create((set) => ({
  isLoading: false,
  productoState: {
    productosRandoms: [],
  },

  getProductosRandoms: (token) => {
    set(() => ({
      isLoading: true,
    }));
    axios
      .get(`${apiUrl}/productos/random`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set((state) => ({
          productoState: {
            ...state.productoState,
            productosRandoms: res.data,
          },
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error('Error fetching random products:', error);
        set(() => ({
          isLoading: false,
        }));
      });
  },
}));
