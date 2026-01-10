// import React, { useContext, useState } from "react"
// import { Link } from "react-router-dom"
// import AuthContext from "../../context/AuthContext"
// import { LogOut } from "lucide-react"

// const Header = () => {
//   const { loading, isAuthenticated, user, logout } = useContext(AuthContext)
//   const [open, setOpen] = useState(false)

//   return (
//     <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
//         <Link to="/" className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
//             SV
//           </div>
//           <span className="text-xl font-semibold text-white tracking-tight">
//             StreamVault
//           </span>
//         </Link>
//         <div className="flex items-center gap-4 relative">
//           {!loading && !isAuthenticated && (
//             <Link
//               to="/auth"
//               className="px-5 py-2 rounded-md text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 transition shadow-md"
//             >
//               Get Started
//             </Link>
//           )}

//           {!loading && isAuthenticated && (
//             <>
//              <Link
//               to="/"
//               className="px-4 py-2 rounded-md text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 transition"
//             >
//               Home
//             </Link>
//             <Link
//               to="/dashboard"
//               className="px-4 py-2 rounded-md text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 transition"
//             >
//               Dashboard
//             </Link>
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700"
//               >
//                 <img
//                   src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
//                   alt="profile"
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//               {open && (
//                 <div className="absolute right-0 top-14 w-56 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg z-50">
//                   <div className="px-4 py-3">
//                     <p className="text-sm font-semibold text-white">
//                       {user?.name}
//                     </p>
//                     <p className="text-xs text-zinc-400 truncate">
//                       {user?.email}
//                     </p>
//                     <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-300">
//                       {user?.role || "User"}
//                     </span>
//                   </div>
//                   <div className="border-t border-zinc-800" />
//                   <button
//                     onClick={() => {
//                       logout()
//                       setOpen(false)
//                     }}
//                     className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-400 hover:bg-zinc-800 transition"
//                   >
//                     <LogOut size={16} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Header
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { LogOut } from "lucide-react";

const Header = () => {
  const { loading, isAuthenticated, user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
            SV
          </div>
          <span className="text-xl font-semibold text-white tracking-tight">
            StreamVault
          </span>
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4 relative">

          {/* ⛔ BLOCK everything until auth resolves */}
          {loading && (
            <div className="text-sm text-zinc-400">Loading…</div>
          )}

          {/* Guest */}
          {!loading && !isAuthenticated && (
            <Link
              to="/auth"
              className="px-5 py-2 rounded-md text-sm font-semibold text-white
                         bg-linear-to-r from-indigo-500 to-violet-600
                         hover:from-indigo-600 hover:to-violet-700
                         transition shadow-md"
            >
              Get Started
            </Link>
          )}

          {/* Authenticated (SAFE NOW) */}
          {!loading && isAuthenticated && user && (
            <>
              <Link
                to="/"
                className="px-4 py-2 rounded-md text-sm font-medium
                           text-white bg-zinc-800 hover:bg-zinc-700 transition"
              >
                Home
              </Link>

              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-md text-sm font-medium
                           text-white bg-zinc-800 hover:bg-zinc-700 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={() => setOpen((p) => !p)}
                className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700"
              >
                <img
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
                  }
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {open && (
                <div className="absolute right-0 top-14 w-56 rounded-xl
                                bg-zinc-900 border border-zinc-800
                                shadow-lg z-50">
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">
                      {user.email}
                    </p>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded
                                     bg-zinc-800 text-zinc-300">
                      {user.role}
                    </span>
                  </div>

                  <div className="border-t border-zinc-800" />

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="w-full px-4 py-2 flex items-center gap-2
                               text-sm text-red-400 hover:bg-zinc-800 transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
