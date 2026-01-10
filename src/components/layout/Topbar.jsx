import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { LogOut } from "lucide-react";
export default function Topbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
   
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center px-6">
  <div className="text-sm text-zinc-400">
    Welcome, <span className="text-white font-medium">{user.name}</span>
  </div>

  <div className="ml-auto">
    <button
      onClick={() => {
        logout();
        setOpen(false);
      }}
      className="px-4 py-2 flex items-center gap-2 text-sm
      text-red-400 hover:bg-zinc-800 rounded-md transition"
    >
      <LogOut size={16} />
      Logout
    </button>
  </div>
</header>
  );
}
