import axios from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;

export const useCategorias = create((set) => ({
  isLoading: false,
  categoryState: {
    categorias: [],
  },

  getAllCategorias: () => {
    set(() => ({
      isLoading: true,
    }));

    axios.get(`${apiUrl}/categorias`).then((res) =>
      set((state) => ({
        categoryState: { ...state.categoryState, categorias: res.data },
        isLoading: false,
      }))
    );
  },
}));

export const createCategory = async (values) => {
  const formData = new FormData();

  formData.append('nombre', values.nombre);
  formData.append('descripcion', values.descripcion);
  formData.append('imagen', values.imagen);

  axios
    .post(`${apiUrl}/categorias`, formData)
    .then((res) => {
      if (res.status === 201) {
        toast.success(`Categoria ${res.data.nombre} creada con éxito`);
      }
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error('Error al crear la categoría');
      }
    });
};
