import {create} from 'zustand'
import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User} from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig'
import { FirebaseError } from 'firebase/app';

interface AuthState{
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set)=>({
    user:null,
    loading: true,
    error: null,

    login: async (email, password) => {
        set({loading: true, error: null});
        try{
            await signInWithEmailAndPassword(auth,email,password);
            set({loading: false});
        }catch (error) {
            if (error instanceof FirebaseError) {
              set({ error: error.message, loading: false });
            } else {
              set({ error: "Unexpected error", loading: false });
            }
          }
    },

    register: async (username, email, password) =>{
      set({loading:true, error: null});
      try {
        await createUserWithEmailAndPassword(auth,email,password);
      } catch (error) {
        if(error instanceof FirebaseError)
          set({error:error.message, loading:false})
        else
          set({ error: "Unexpected error", loading: false });
        
      }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch (error) {
            if (error instanceof FirebaseError) {
              set({ error: error.message, loading: false });
            } else {
              set({ error: "Unexpected error", loading: false });
            }
          }
      },

      setUser: (user) => set({ user, loading: false }),

}));

onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
});