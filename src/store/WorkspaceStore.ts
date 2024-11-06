import {create} from 'zustand'
import { db} from '../firebase/firebaseConfig'
import { query, where, collection, onSnapshot, Unsubscribe, addDoc, doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import { useAuthStore } from './AuthStore';

interface Workspace {
    id: string;
    name: string;
    ownerId: string;
    members: string[];
}
  

interface WorkspaceState{
    workspaces:{id: string, name: string, ownerId: string, members: string[]}[];
    selectedWorkspace: Workspace | null;
    loading: boolean;
    loadWorkspaces: (uid: string)=> Unsubscribe;
    addWorkspace: (name: string)=> Promise<void>;
    addMember: (workspaceId: string, memberId: string) => Promise<void>;
    removeMember: (workspaceId: string, memberId: string) => Promise<void>;
    removeWorkspace: (workspaceId: string) => Promise<void>;
    updateWorkspace: (workspaceId: string, updatedData: Partial<Workspace>) => Promise<void>;
    setSelectedWorkspaceById: (workspaceId: string) => void;

}

export const useWorkspaceStore = create<WorkspaceState>((set, get)=>({
    workspaces: [],
    selectedWorkspace: null,
    loading: true,

    loadWorkspaces: (uid) => {
        const workspacesRef = collection(db, 'workspaces');
        const q = query(workspacesRef, where('members', 'array-contains', uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const workspacesData = snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              members: doc.data().members,
              ownerId: doc.data().ownerId,
            }));
            set({ workspaces: workspacesData, loading: false });
        });
      
        return unsubscribe;
    },

    addWorkspace: async (name) => {
        const currentUser = useAuthStore.getState().user;

        if (!currentUser) {
            console.error("User is not authenticated");
            return;
        }

        try{
            const workspacesRef = collection(db, 'workspaces');
            await addDoc(workspacesRef,{ownerId: currentUser.uid || null, name, members:[currentUser.uid]});
        } catch(err) {
            console.error("Error while adding workspace", err);
        }
    },

    addMember: async (workspaceId, memberId) => {
        try{
            const workspaceRef = doc(db, 'workspaces', workspaceId);
            const workspaceDoc = await getDoc(workspaceRef);

            if (workspaceDoc.exists()) {
                const currentMembers = workspaceDoc.data().members;
                await updateDoc(workspaceRef, { members: [...currentMembers, memberId] });
              }
        } catch(err) {
            console.error("Error while adding member to workspace", err);
        }
    },

    removeMember: async (workspaceId, memberId) => {
        try{
            const workspaceRef = doc(db, 'workspaces', workspaceId);
            const workspaceDoc = await getDoc(workspaceRef);

            if (workspaceDoc.exists()) {
                const newMembers = workspaceDoc.data().members.filter((member: string)=>member!==memberId);
                await updateDoc(workspaceRef, { members: newMembers });
            }
        } catch(err) {
            console.error("Error while removing member from workspace", err);
        }
    },

    removeWorkspace: async (workspaceId) => {
        try {
          const workspaceRef = doc(db, 'workspaces', workspaceId);
          await deleteDoc(workspaceRef);
        } catch (err) {
          console.error("Error while removing workspace", err);
        }
      },
    
      updateWorkspace: async (workspaceId, updatedData) => {
        try {
          const workspaceRef = doc(db, 'workspaces', workspaceId);
          await updateDoc(workspaceRef, updatedData);
        } catch (err) {
          console.error("Error while updating workspace", err);
        }
      },
    
      setSelectedWorkspaceById: (workspaceId: string) => {
        const workspaces = get().workspaces;
        const selectedWorkspace = workspaces.find(workspace => workspace.id === workspaceId) || null;
        set({ selectedWorkspace });
      },
}))
