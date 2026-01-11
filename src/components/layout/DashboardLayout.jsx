import { useAuth } from "../../context/AuthContext";
import Topbar from "./Topbar";
import { Link } from "react-router-dom";
export default function DashboardLayout({
  activeTab,
  setActiveTab,
  canUpload,
  children,
}) {
  const { user } = useAuth();

  return (
  
    <div className="flex min-h-screen bg-zinc-900 text-white">
  <aside className="w-64 bg-zinc-950 text-white p-6 border-r border-zinc-800">
    <Link
      to="/"
      className="block text-xl font-semibold tracking-wide mb-10 text-white"
    >
      StreamVault
    </Link>

    <button
      onClick={() => setActiveTab("videos")}
      className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
        activeTab === "videos"
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      Dashboard
    </button>

    {canUpload && (
      <button
        onClick={() => setActiveTab("upload")}
        className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
          activeTab === "upload"
            ? "bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`}
      >
        Upload Video
      </button>
    )}

    {user?.role === "admin" && (
       <button
        onClick={() => setActiveTab("admin")}
     className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
     activeTab === "admin"
         ? "bg-zinc-800 text-white"
         : "text-blue-400 hover:bg-zinc-800 hover:text-white"
     }`}
>
  Admin Panel
</button>

    )}
  </aside>

  <div className="flex-1 flex flex-col">
    <Topbar />
    <main className="flex-1 p-8 bg-zinc-900">{children}</main>
  </div>
</div>
  );
}
