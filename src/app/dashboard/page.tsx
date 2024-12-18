"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/AuthStore";
import Nav from "@/components/Nav";
import Aside from "@/components/Aside";
import Main from "@/components/Main";

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
  const [selectedTable, setSelectedTable] = useState<string | undefined>();
  const [isAsideCollapsed, setIsAsideCollapsed] = useState<boolean>(true);
  
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col bg-gray-100 h-screen max-h-screen text-gray-600">
      <Nav/>
      <div className="flex h-full overflow-auto">
        <Aside
          isAsideCollapsed={isAsideCollapsed}
          boards={tables}
          selectedTable={selectedTable}
          onSelectTable={setSelectedTable}
          onCollapseToggle={() => setIsAsideCollapsed(!isAsideCollapsed)}
          workspaceMembers={workspaceMembers}
          user={user}
        />
        <Main/>
      </div>
    </div>
  );
}
