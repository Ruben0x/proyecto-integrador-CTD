import axios from 'axios';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;

export const useUsers = create((set) => ({
  isLoading: false,
  userState: {
    users: [],
    token: {
      accessToken: '',
      refreshToken: '',
    },
  },

  getAllUsers: () => {
    set(() => ({
      isLoading: true,
    }));

    axios.get(`${apiUrl}/usuarios`).then((res) =>
      set((state) => ({
        userState: { ...state.userState, users: res.data },
        isLoading: false,
      }))
    );
  },
  deleteUser: async (userId) => {
    set(() => ({
      isLoading: true,
    }));

    try {
      await axios.delete(`${apiUrl}/usuarios/${userId}`);
      set((state) => ({
        userState: {
          ...state.userState,
          users: state.userState.users.filter((user) => user.id !== userId),
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
      set(() => ({
        isLoading: false,
      }));
      throw error;
    }
  },

  changeUserRol: (user) => {
    set((state) => ({
      isLoading: true,
    }));

    const newRol = user.rol === 'admin' ? 'registrado' : 'admin';

    axios
      .patch(`${apiUrl}/usuarios/${user.id}`, { rol: newRol })
      .then((response) => {
        set((state) => ({
          userState: {
            ...state.userState,
            users: state.userState.users.map((u) =>
              u.id === user.id ? { ...u, rol: newRol } : u
            ),
          },
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error('Error al actualizar el rol:', error);
        set((state) => ({
          isLoading: false,
        }));
      });
  },

  getAnonToken: () => {
    set((state) => ({
      isLoading: true,
    }));

    axios
      .post(`${apiUrl}/usuarios/anonimo`)
      .then((res) => {
        set((state) => ({
          userState: {
            ...state.userState,
            token: {
              ...state.userState.token,
              accessToken: res.data.accessToken,
              // accessToken: JSON.stringify(res.data.accessToken),
              refreshToken: JSON.stringify(res.data.refreshToken),
            },
          },
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error('Error fetching anonymous token:', error);
        set((state) => ({
          isLoading: false,
        }));
      });
  },
}));
