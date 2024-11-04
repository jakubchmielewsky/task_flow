import Image from "next/image";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { useAuthStore } from "@/store/AuthStore";
import { User } from "firebase/auth";

interface UserPanelProps {
  isAsideCollapsed: boolean;
  user: User | null;
}

export default function UserPanel({ isAsideCollapsed, user }: UserPanelProps) {
    const logout = useAuthStore((state) => state.logout);


  return (
    <div className="h-36 border-t my-1 p-3">
      <div className="flex items-center">
        <Image
          className="mx-1 w-7 h-7 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
          alt={user?.displayName || "User Avatar"}
          width={28}
          height={28}
        />
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
        <button onClick={logout} className="flex items-center p-2">
          <FiLogOut className="mx-2" />
          Logout
        </button>
      )}
    </div>
  );
}
