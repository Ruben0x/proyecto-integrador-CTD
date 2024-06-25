import axios from "axios";
import { create } from "zustand";

const apiUrl = import.meta.env.VITE_API_URL;

export const useReservas = create((set) => ({
  isLoading: false,
  reservasState: {
    reservas: [],
  },

  getAllReservas: () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No se encontró el token de autenticación");
      return;
    }

    set(() => ({
      isLoading: true,
    }));

    axios
      .get(`${apiUrl}/reservas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        set((state) => ({
          reservasState: {
            ...state.reservasState,
            reservas: res.data,
          },
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error("Error fetching reservas:", error);
        set(() => ({
          isLoading: false,
        }));
      });
  },
}));
