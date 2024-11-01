"use client";

import { useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuthStore } from "@/store/AuthStore";
import Nav from "@/components/nav";
import Aside from "@/components/Aside";

const workspaces = ["Workspace", "work2", "Workspace", "work2"];
const tables = [
  { id: "table1", name: "Table 1" },
  { id: "table2", name: "Table 2" },
  { id: "table3", name: "Table 3" },
];
const workspaceMembers = [
  { id: 1, name: "John Doe", role: "Admin", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" },
  { id: 2, name: "Jane Smith", role: "Member", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
  { id: 3, name: "Mike Johnson", role: "Member", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
];

export default function Page() {
  useAuthRedirect();

  const [workspace, setWorkspace] = useState<string | undefined>();
  const [selectedTable, setSelectedTable] = useState<string | undefined>();
  const [isAsideCollapsed, setIsAsideCollapsed] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col bg-gray-100 h-screen text-gray-600">
      <Nav workspace={workspace} onWorkspaceChange={setWorkspace} workspaces={workspaces} />
      <div className="flex h-full">
        <Aside
          isAsideCollapsed={isAsideCollapsed}
          tables={tables}
          selectedTable={selectedTable}
          onSelectTable={setSelectedTable}
          onCollapseToggle={() => setIsAsideCollapsed(!isAsideCollapsed)}
          workspaceMembers={workspaceMembers}
          user={user}
        />
        <div></div>
      </div>
    </div>
  );
}
