import axios from 'axios';
import { create } from 'zustand';

const apiUrl = import.meta.env.VITE_API_URL;

export const useUsers = create((set) => ({
  isLoading: false,
  userState: {
    users: [],
    isLogged: false,
    loggedUser: {
      usuarioId: '',
      nombre: '',
      apellido: '',
      email: '',
      rol: '',
    },
    token: {
      accessToken: '',
      refreshToken: '',
    },
  },

  getAllUsers: () => {
    set(() => ({
      isLoading: true,
    }));

    axios
      .get(`${apiUrl}/usuarios`, { timeout: 5000 }) // Añadir un tiempo de espera de 5 segundos
      .then((res) => {
        // console.log(res);
        set((state) => ({
          userState: { ...state.userState, users: res.data },
          isLoading: false,
        }));
      })
      .catch((error) => {
        // Manejar el error (por ejemplo, un tiempo de espera excedido)
        console.error('Error fetching users:', error);
        set(() => ({
          isLoading: false,
        }));
      });
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
        console.error('Error fetching anonymous token:', error.message);
        set((state) => ({
          isLoading: false,
        }));
      });
  },

  userLogin: (email, password, rememberme) => {
    set((state) => ({
      isLoading: false,
    }));

    const data = {
      email,
      password,
    };

    axios.post(`${apiUrl}/usuarios/login`, data).then((res) => {
      set((state) => ({
        userState: {
          ...state.userState,
          isLogged: true,
          loggedUser: {
            usuarioId: res.data.usuarioId,
            rol: res.data.rol,
          },
          token: {
            accessToken: res.data.token.accessToken,
            refreshToken: res.data.token.refreshToken,
          },
        },
      }));
    });
  },
}));
