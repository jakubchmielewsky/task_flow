import {create} from 'zustand'
import { db} from '../firebase/firebaseConfig'
import { query, where, collection, onSnapshot, Unsubscribe, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';

interface Board{
    id: string;
    name: string;
    workspaceId: string;
}

interface BoardsState {
    boards: Board[];
    selectedBoard: Board | null;
    loading: boolean;
    loadBoards: (workspaceId: string) => void;
    addBoard: (name: string, workspaceId: string) => Promise<void>;
    removeBoard: (boardId: string) => Promise<void>;
    updateBoard: (boardId: string, newName: string) => Promise<void>;
    addList: (boardId: string, listName: string) => Promise<void>;
    removeList: (listId: string) => Promise<void>;
    setSelectedBoardById: (boardId: string) => void;
}

export const useBoardsStore = create<BoardsState>((set, get)=>({
    boards: [],
    selectedBoard: null,
    loading: false,

    loadBoards: (workspaceId) => {
        set({ loading: true });
        const boardsRef = collection(db, 'boards');
        const boardsQuery = query(boardsRef, where('workspaceId', '==', workspaceId));

        const unsubscribe: Unsubscribe = onSnapshot(boardsQuery, (snapshot) => {
        const boards = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Board[];
        set({ boards, loading: false });
        });

        return () => unsubscribe();
    },

    addBoard: async (name, workspaceId) => {
        const boardRef = collection(db, 'boards');
        await addDoc(boardRef, { name, workspaceId });
    },

    removeBoard: async (boardId) => {
        const boardDoc = doc(db, 'boards', boardId);
        await deleteDoc(boardDoc);
    },

    updateBoard: async (boardId, newName) => {
        const boardDoc = doc(db, 'boards', boardId);
        await updateDoc(boardDoc, { name: newName });
    },

    addList: async (boardId, listName) => {
        const listsRef = collection(db, 'lists');
        await addDoc(listsRef, { name: listName, boardId });
    },

    removeList: async (listId) => {
        const listDoc = doc(db, 'lists', listId);
        await deleteDoc(listDoc);
    },

    setSelectedBoardById: (boardId) => {
        const board = get().boards.find((b) => b.id === boardId) || null;
        set({ selectedBoard: board });
    },
}))
