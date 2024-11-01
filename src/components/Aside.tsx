import { FiChevronLeft, FiChevronRight, FiTable, FiUser, FiUserPlus, FiSettings, FiLogOut } from "react-icons/fi";

interface AsideProps {
  isAsideCollapsed: boolean;
  tables: { id: string; name: string }[];
  selectedTable: string | undefined;
  onSelectTable: (id: string) => void;
  onCollapseToggle: () => void;
  workspaceMembers: { id: number; name: string; role: string; avatar: string }[];
  user: object | null;
}

export default function Aside({
  isAsideCollapsed,
  tables,
  selectedTable,
  onSelectTable,
  onCollapseToggle,
  workspaceMembers,
  user,
}: AsideProps) {
  return (
    <aside className={`flex flex-col justify-between bg-white shadow-md transition-all duration-200 ${isAsideCollapsed ? "w-16" : "w-52"}`}>
      <div className="w-full">
        <div className={`p-3 flex border-b items-center ${isAsideCollapsed ? "justify-center" : "justify-between"}`}>
          <h2 className={`font-semibold ${isAsideCollapsed ? "hidden" : "block"}`}>Tables</h2>
          <button onClick={onCollapseToggle}>
            {isAsideCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>
        <ul className="flex flex-col p-2 max-h-96">
          {tables.map((table) => (
            <li
              key={table.id}
              onClick={() => onSelectTable(table.id)}
              className={`flex items-center my-1 ${selectedTable === table.id ? "bg-blue-50 text-blue-500" : ""} h-10 rounded-xl truncate ${isAsideCollapsed && "justify-center"}`}
            >
              <FiTable className="mx-3" />
              <p className="truncate">{!isAsideCollapsed && table.name}</p>
            </li>
          ))}
        </ul>

        <div className={`p-3 flex border-b items-center mt-2 ${isAsideCollapsed ? "justify-center" : "justify-between"}`}>
          {isAsideCollapsed ? <FiUser /> : (
            <>
              <h2 className="font-semibold">Workspace Members</h2>
              <button><FiUserPlus /></button>
            </>
          )}
        </div>
        <ul className="flex flex-col p-2">
          {workspaceMembers.map((member) => (
            <li key={member.id} className={`flex items-center my-1 hover:bg-indigo-50 h-10 rounded-xl ${isAsideCollapsed && "justify-center"}`}>
              <img className="mx-1 w-7 h-7 rounded-full object-cover" src={member.avatar} alt={member.name} />
              {!isAsideCollapsed && (
                <div className="truncate ml-2">
                  <h3 className="truncate">{member.name}</h3>
                  <p className="text-xs">{member.role === "Admin" && member.role}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-32 border-t my-1 p-3">
        <div className="flex items-center">
          <img className="mx-1 w-7 h-7 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" alt={user?.displayName} />
          {!isAsideCollapsed && (
            <div className="truncate ml-2">
              <h3 className="truncate">{user?.displayName}</h3>
              <p className="text-xs">{user?.email}</p>
            </div>
          )}
        </div>
        {!isAsideCollapsed && (
          <button className="flex items-center mt-2 p-2">
            <FiSettings className="mx-2" />
            Settings
          </button>
        )}
        {!isAsideCollapsed && (
          <button className="flex items-center p-2">
            <FiLogOut className="mx-2" />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
