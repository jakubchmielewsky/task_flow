import {create} from 'zustand'
import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User} from 'firebase/auth'
import {auth, db} from '../firebase/firebaseConfig'
import { FirebaseError } from 'firebase/app';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

interface AuthState{
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => Promise<void>;
    updateUserProfile: (newUserName:string, newAvatar:string) => Promise<void>;
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
          set({ error: error instanceof FirebaseError ? error.message : "Unexpected error", loading: false });
          }
    },

    register: async (username, email, password) =>{
      set({loading:true, error: null});
      try {
        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        const avatar ="";

        //additional user data
        const usersRef = doc( db, 'users', user.uid);
        await setDoc(usersRef, {displayName:username, avatar, email});

        set({ loading: false });
      } catch (error) {
          set({ error: error instanceof FirebaseError ? error.message : "Unexpected error", loading: false });
      }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch (error) {
          set({ error: error instanceof FirebaseError ? error.message : "Unexpected error", loading: false });
          }
      },

      //sets user data as combined information from firebase auth and users collection in firestore
      setUser: async (firebaseUser) => {
        if(firebaseUser){
          const userRef = doc(db,'users',firebaseUser.uid);
          const userDoc = await getDoc(userRef);

          if(userDoc.exists()){
            set({ user: {...firebaseUser, ...userDoc.data()},loading:false});
          } else{
            set({user:firebaseUser, loading:false});
          }
        } else{
          set({ user: null, loading: false })
        }
      },

      updateUserProfile: async (newUsername, newAvatar) => {
        set({ loading: true, error: null });
        const currentUser = useAuthStore.getState().user;
        if (!currentUser) {
          set({ error: "User not logged in", loading: false });
          return;
        }
    
        try {
          const userRef = doc(db, 'users', currentUser.uid);
    
          // updating data in Firestore
          await updateDoc(userRef, { displayName: newUsername, avatar: newAvatar });
    
          // updating data in store
          set((state) => ({
            user: state.user ? { ...state.user, displayName: newUsername, photoURL: newAvatar } : null,
            loading: false
          }));
        } catch (error) {
          set({ error: error instanceof FirebaseError ? error.message : "Unexpected error", loading: false });
        }
      },

}));

onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
});