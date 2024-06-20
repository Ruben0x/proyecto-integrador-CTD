import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

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
        console.error("Error fetching random products:", error.message);
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
        console.error("Error fetching random products:", error.message);
        set(() => ({
          isLoading: false,
        }));
      });
  },

  deleteProducto: async (id) => {
    set(() => ({
      isLoading: true,
    }));

    try {
      const res = await axios.delete(`${apiUrl}/productos/${id}`);

      toast.success("Eliminado con éxito:", res.message);

      set((state) => ({
        productoState: {
          ...state.productoState,
          todosProductos: state.productoState.todosProductos.filter(
            (prod) => prod.id !== id
          ),
        },
        isLoading: false,
      }));
    } catch (error) {
      toast.error("Error deleting the product:", error.message);
      console.log(error.message);

      set(() => ({
        isLoading: false,
      }));
    }
  },

  deleteFav: (id) => {
    set(() => ({
      isLoading: true,
    }));
    set((state) => ({
      productoState: {
        ...state.productoState,
        todosProductos: state.productoState.todosProductos.map((p) =>
          p.id === id ? { ...p, esFavorito: false } : p
        ),
        productosRandoms: state.productoState.productosRandoms.map((p) =>
          p.id === id ? { ...p, esFavorito: false } : p
        ),
      },
      isLoading: false,
    }));
  },
  addFav: (id) => {
    set(() => ({
      isLoading: true,
    }));
    set((state) => ({
      productoState: {
        ...state.productoState,
        todosProductos: state.productoState.todosProductos.map((p) =>
          p.id === id ? { ...p, esFavorito: true } : p
        ),
        productosRandoms: state.productoState.productosRandoms.map((p) =>
          p.id === id ? { ...p, esFavorito: true } : p
        ),
      },
      isLoading: false,
    }));
  },

  searchProducts: async ({
    token,
    text,
    date1,
    date2,
    autocomplete = false,
  }) => {
    if (!token) return;

    try {
      const result = await axios.post(
        `${apiUrl}/productos/barraBuscador`,
        {
          texto: text,
          fechaDesde: date1,
          fechaHasta: date2,
          autocomplete,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching random products:", error.message);
    }
  },
}));
