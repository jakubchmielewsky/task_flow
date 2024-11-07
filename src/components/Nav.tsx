import { FiPlus, FiClock } from "react-icons/fi";
import SelectDropdown from "@/components/SelectDropdown";
import { useWorkspaceStore } from "@/store/WorkspaceStore";
import { useAuthStore } from "@/store/AuthStore";
import { useEffect } from "react";

export default function Nav() {
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const selectedWorkspace = useWorkspaceStore((state) => state.selectedWorkspace);
  const userLoading = useAuthStore((state) => state.loading);
  const loadWorkspaces =  useWorkspaceStore((state) => state.loadWorkspaces);
  const setSelectedWorkspaceById =  useWorkspaceStore((state) => state.setSelectedWorkspaceById);


  useEffect(() => {
    if (!userLoading) {
      const unsubscribe = loadWorkspaces();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [loadWorkspaces, userLoading]);

  return (
    <nav className="w-full h-12 bg-white flex items-center px-2 shadow-md justify-between">
      <div className="flex">
        <h2 className="font-bold text-xl">Task Flow</h2>
        <SelectDropdown selected={selectedWorkspace?.name} onSelectedChange={setSelectedWorkspaceById} options={workspaces}/>
        <button className="text-sm ml-2 hover:bg-gray-100 p-1 rounded-full">
          <FiPlus />
        </button>
      </div>
      <button className="flex text-sm items-center gap-2 hover:bg-gray-100 p-1 rounded-full">
        <FiClock />Recent
      </button>
    </nav>
  );
}
