// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function EditVideo() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   useEffect(() => {
//     let mounted = true;

//     const fetchVideo = async () => {
//       try {
//         const { data } = await api.get(`/videos/${id}`);
//         if (mounted) {
//           setTitle(data.video.title);
//           setDescription(data.video.description || "");
//         }
//       } catch (err) {
//         if (mounted) {
//           setError(
//             err.response?.status === 404
//               ? "Video not found"
//               : "Unable to load video"
//           );
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchVideo();

//     return () => {
//       mounted = false;
//     };
//   }, [id]);
//   const handleSave = async () => {
//     if (!title.trim()) {
//       setError("Title is required");
//       return;
//     }

//     try {
//       setSaving(true);
//       setError("");
//       setSuccess("");

//       await api.put(`/videos/${id}`, {
//         title,
//         description,
//       });

//       setSuccess("Changes saved successfully");
//     } catch {
//       setError("Failed to save changes");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 max-w-xl mx-auto text-zinc-400">
//         Loading video…
//       </div>
//     );
//   }

//   if (error && !saving && !success) {
//     return (
//       <div className="p-6 max-w-xl mx-auto">
//         <p className="text-red-400 mb-4">{error}</p>
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="text-indigo-400 underline"
//         >
//           Back to dashboard
//         </button>
//       </div>
//     );
//   }
//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Edit Video</h1>
//       <label className="block text-sm text-zinc-400 mb-1">
//         Title
//       </label>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full mb-4 p-3 rounded bg-zinc-900 border border-zinc-700
//                    text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       <label className="block text-sm text-zinc-400 mb-1">
//         Description
//       </label>
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         rows={4}
//         className="w-full mb-4 p-3 rounded bg-zinc-900 border border-zinc-700
//                    text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//       {error && (
//         <p className="text-red-400 text-sm mb-3">{error}</p>
//       )}
//       {success && (
//         <p className="text-green-400 text-sm mb-3">{success}</p>
//       )}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700
//                      disabled:opacity-50"
//         >
//           {saving ? "Saving…" : "Save changes"}
//         </button>

//         <button
//           onClick={() => navigate(-1)}
//           className="text-zinc-400 hover:text-white"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const res = await api.get("/videos");
        const video = res.data.videos.find(v => v._id === id);

        if (!video) {
          navigate("/dashboard");
          return;
        }

        setTitle(video.title);
        setDescription(video.description || "");
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id, navigate]);

  const handleSave = async () => {
    await api.put(`/videos/${id}`, { title, description });
    navigate("/dashboard");
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Video</h1>

      <input
        className="w-full mb-3 p-2 bg-zinc-800 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full mb-4 p-2 bg-zinc-800 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 rounded"
        >
          Save
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-zinc-700 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
