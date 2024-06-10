import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';
const apiUrl = import.meta.env.VITE_API_URL;

export const useMarcas = create((set) => ({
  isLoading: false,
  marcaState: {
    marcas: [],
  },

  getAllMarcas: () => {
    set(() => ({
      isLoading: true,
    }));

    axios
      .get(`${apiUrl}/marcas`)
      .then((res) =>
        set((state) => ({
          marcaState: { ...state.marcaState, marcas: res.data },
          isLoading: false,
        }))
      )
      .catch((error) => {
        console.log('Error fetching marcas:', error.message);
        set(() => ({
          isLoading: false,
        }));
      });
  },

  createMarca: (data) => {
    set(() => ({
      isLoading: true,
    }));

    axios
      .post(`${apiUrl}/marcas`, data)
      .then((res) => {
        set(() => ({
          isLoading: false,
        }));
        toast.success(`Marca ${data.nombre} creada con éxito`);
      })
      .catch((error) => {
        toast.error('Ya existe una marca con ese nombre');
        set(() => ({
          isLoading: false,
        }));
      });
  },
}));
