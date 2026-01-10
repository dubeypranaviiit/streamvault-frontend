import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function Sidebar({ activeTab, setActiveTab }) {
  const { user } = useContext(AuthContext);

  const tabClass = (tab) =>
    `block w-full text-left rounded-lg px-3 py-2 transition
     ${
       activeTab === tab
         ? "bg-zinc-800 text-white"
         : "text-zinc-400 hover:bg-zinc-800"
     }`;

  return (
//     <aside className="w-64 bg-zinc-900 border-r border-white/10 p-5">
//       <Link
//   to="/"
//   className="block text-xl font-bold mb-10 text-white"
// >
//   StreamVault
// </Link>


//       <nav className="space-y-3">
//         <button
//           onClick={() => setActiveTab("videos")}
//           className={tabClass("videos")}
//         >
//           Dashboard
//         </button>

//         {(user.role === "editor" || user.role === "admin") && (
//           <button
//             onClick={() => setActiveTab("upload")}
//             className={tabClass("upload")}
//           >
//             Upload Video
//           </button>
//         )}
//       </nav>
//     </aside>
<aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">
  <Link
    to="/"
    className="block text-xl font-bold mb-12 text-white tracking-wide"
  >
    StreamVault
  </Link>

  <nav className="space-y-2">
    <button
      onClick={() => setActiveTab("videos")}
      className={tabClass("videos")}
    >
      Dashboard
    </button>

    {(user.role === "editor" || user.role === "admin") && (
      <button
        onClick={() => setActiveTab("upload")}
        className={tabClass("upload")}
      >
        Upload Video
      </button>
    )}
    {user?.role === "admin" && (
        <button
        onClick={() => setActiveTab("admin")}
        className={tabClass("admin")}
      >
        Admin Panel
      </button>
)}
  </nav>
</aside>
  );
}
