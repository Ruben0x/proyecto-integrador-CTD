import axios from 'axios';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;

export const userProductos = create((set) => ({
  isLoading: false,
  productoState: {
    productosRandoms: [],
    todosProductos: [],
  },

  getProductosRandoms: (token) => {
    if (!token) return;
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
        console.error('Error fetching random products:', error.message);
        set(() => ({
          isLoading: false,
        }));
      });
  },
  getAllProducts: (token) => {
    if (!token) return;
    set(() => ({
      isLoading: true,
    }));
    axios
      .get(`${apiUrl}/productos/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set((state) => ({
          productoState: {
            ...state.productoState,
            todosProductos: res.data,
          },
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error('Error fetching random products:', error.message);
        set(() => ({
          isLoading: false,
        }));
      });
  },
  // getProductoById: (token, id) => {
  //   if (!token) return;
  //   set(() => ({
  //     isLoading: true,
  //   }));
  //   axios
  //     .get(`${apiUrl}/productos/${20}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       set((state) => ({
  //         productoState: {
  //           ...state.productoState,
  //           productosRandoms: res.data,
  //         },
  //         isLoading: false,
  //       }));
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching random products:', error.message);
  //       set(() => ({
  //         isLoading: false,
  //       }));
  //     });
  // },
}));
