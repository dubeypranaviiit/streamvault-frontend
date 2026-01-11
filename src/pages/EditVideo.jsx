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
