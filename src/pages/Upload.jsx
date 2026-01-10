import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";
import { useDashboard } from "../context/DashboardContext";

export default function Upload() {
  const { user } = useContext(AuthContext);
  
const { setActiveTab } = useDashboard();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle");
  const [sensitivityResult, setSensitivityResult] = useState(null);
  const [error, setError] = useState("");

   useSocket(
  user?.id,
  (data) => {
    setProgress(data.progress);

    setStatus((prev) => {
      if (prev === "completed") return prev; // 🔒 protect state
      if (data.progress < 100) return "processing";
      return prev;
    });
  },
  (data) => {
    setProgress(100);
    setStatus("completed");
    setSensitivityResult(data.sensitivityResult);
  }
);
    useEffect(() => {
  if (status === "completed") {
    const timer = setTimeout(() => {
      setActiveTab("videos"); 
    }, 1500);

    return () => clearTimeout(timer);
  }
}, [status, setActiveTab]);

  const handleUpload = async () => {
    if (!file || !title) return;

    try {
      setError("");
      setProgress(0);
      setStatus("uploading");
      setSensitivityResult(null);

      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);
await api.post("/videos/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,   
});




      
    } catch (err) {
      console.log(err);
      setError("Upload failed. Please try again.");
      setStatus("idle");
    }
  };

  const statusLabel = {
    idle: "Waiting for upload",
    uploading: "Uploading video…",
    processing: "Processing video…",
    completed: "Processing completed",
  };

  return (
    <div className="min-h-screen  bg-linear-to-br from-zinc-800 to-zinc-900 flex items-start justify-center py-12">
      <div
        className="relative w-full max-w-xl rounded-2xl
        bg-linear-to-br from-zinc-900 to-zinc-950
        border border-zinc-700/50
        p-8 shadow-2xl shadow-black/60"
      >
        <h1 className="text-2xl font-semibold text-white mb-1">
          Upload Video
        </h1>

        <p className="text-sm text-zinc-400 mb-6">
          Upload a video and track real-time processing progress
        </p>

        <input
          className="w-full mb-3 px-4 py-2.5 rounded-lg
          bg-zinc-900 border border-zinc-700/60
          text-zinc-100 placeholder-zinc-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-4 px-4 py-2.5 rounded-lg
          bg-zinc-900 border border-zinc-700/60
          text-zinc-100 placeholder-zinc-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500"
          placeholder="Description (optional)"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-4 cursor-pointer">
          <div
            className="rounded-lg border border-dashed border-zinc-600
            bg-zinc-900/60 p-5 text-center
            text-zinc-400
            hover:border-indigo-500/60 hover:text-indigo-400
            transition"
          >
            {file ? file.name : "Click to select a video file"}
          </div>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || !title || status !== "idle"}
          className="w-full py-2.5 rounded-lg font-medium
          bg-linear-to-r from-indigo-500 to-violet-500
          text-white
          hover:opacity-90
          disabled:opacity-40 disabled:cursor-not-allowed
          transition shadow-lg shadow-indigo-500/30"
        >
          Upload Video
        </button>

        {error && (
          <p className="text-sm text-red-400 mt-3 text-center">
            {error}
          </p>
        )}

        {status !== "idle" && (
          <div className="mt-6">
            <div className="flex justify-between text-xs text-zinc-400 mb-1">
              <span>{statusLabel[status]}</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 bg-zinc-800 rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {status === "completed" && sensitivityResult && (
          <div className="mt-4 text-center">
            {sensitivityResult === "safe" && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium
              bg-emerald-500/20 text-emerald-400">
                SAFE
              </span>
            )}

            {sensitivityResult === "flagged" && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium
              bg-rose-500/20 text-rose-400">
                FLAGGED
              </span>
            )}

            <p className="text-xs text-zinc-400 mt-2">
              Redirecting to video list…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
