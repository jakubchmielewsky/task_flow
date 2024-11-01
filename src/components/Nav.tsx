import { FiPlus, FiClock } from "react-icons/fi";
import SelectDropdown from "@/components/SelectDropdown";

interface NavProps {
  workspace: string | undefined;
  onWorkspaceChange: (workspace: string) => void;
  workspaces: string[];
}

export default function Nav({ workspace, onWorkspaceChange, workspaces }: NavProps) {
  return (
    <nav className="w-full h-12 bg-white flex items-center px-2 shadow-md justify-between">
      <div className="flex">
        <h2 className="font-bold text-xl">Task Flow</h2>
        <SelectDropdown selected={workspace} onSelectedChange={onWorkspaceChange} options={workspaces} />
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
