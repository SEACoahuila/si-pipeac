import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

import { Data } from '../interfaces/prioridades'
import axios from 'axios'
import { User } from '../interfaces/user';

type Store = {
  trimestre: string, // Trimestre actual
  token: string | null,  // token de seguridad
  user: User | null
  setUser: (user: User, token: string) => void;
  baseApi: string
  setTrimestre: (trimestre: string) => void;
  logout: () => void
}

interface PrioridadesStore {
  prioridades: Data | null;
  setPrioridades: (prioridades: Data) => void
  getPrioridades: () => Promise<void>
}

const generateTrimestre = (): string => {
  const month = new Date().getMonth() + 1; // getMonth() devuelve 0-11, sumamos 1 para obtener 1-12
  if (month >= 1 && month <= 3) return '1'; // Trimestre 1
  if (month >= 4 && month <= 6) return '2'; // Trimestre 2
  if (month >= 7 && month <= 9) return '3'; // Trimestre 3
  return '4'; // Trimestre 4
};



export const configStore = create<Store>()(
  persist( (set) => ({
    trimestre: generateTrimestre(),
    token: null,
    user: null,    setUser: (user, token) => set({ user, token }),
    baseApi: process.env.NEXT_PUBLIC_BASE_API!,
    setTrimestre: (trimestre) => set({ trimestre }),
    logout : () => {
      configStore.persist.clearStorage(); // Limpia el almacenamiento
      configStore.setState({ user: null, token: null })
      ; // Reinicia el estado
    }
  }), 
  { name: 'config-store',
    storage: createJSONStorage(() => localStorage),
   }
),
);

 const usePrioridadesStore = create<PrioridadesStore>((set) => ({
  prioridades: null,
  setPrioridades: (prioridades) => set({ prioridades }),
  getPrioridades: async () => {
    const baseUrl = configStore.getState().baseApi;
    const token = configStore.getState().token;
    // const trimestre = configStore.getState().trimestre;

    try {
      const response = await axios.get<Data>(`${baseUrl}/data/all/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ prioridades: response.data }); // Actualiza el estado del store
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          configStore.getState().logout();
        }
      } else {
        console.log(error);
      }
    }
  },
}));

export default usePrioridadesStore;
