import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function VideoWatch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchVideo = async () => {
      try {
        const res = await api.get("/videos");
        const found = res.data.videos.find(v => v._id === id);

        if (!found) {
          throw { response: { status: 404 } };
        }

        if (mounted) setVideo(found);
      } catch (err) {
        if (mounted) {
          setError(
            err.response?.status === 404
              ? "Video not found"
              : "Unable to load video"
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchVideo();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-zinc-400">
        Loading video…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-indigo-400 underline"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  const { title, description, processing } = video;

  const isProcessing =
    processing.status === "processing" ||
    processing.status === "uploaded";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">{title}</h1>

      <div className="flex items-center gap-3 mb-4 text-sm">
        {processing.status === "processing" && (
          <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-400">
            Processing…
          </span>
        )}

        {processing.sensitivityResult === "flagged" && (
          <span className="px-2 py-1 rounded bg-red-500/10 text-red-400">
            ⚠ Sensitive content
          </span>
        )}

        {processing.sensitivityResult === "safe" && (
          <span className="px-2 py-1 rounded bg-green-500/10 text-green-400">
            Safe
          </span>
        )}
      </div>

      <div className="rounded-lg overflow-hidden bg-black">
       <video
  src={`${import.meta.env.VITE_API_URL}/videos/${id}/stream`}
  controls
/>

      </div>

      {isProcessing && (
        <p className="text-sm text-zinc-400 mt-3">
          Video is still being processed. Playback may be unavailable.
        </p>
      )}

      {description && (
        <p className="mt-4 text-zinc-300 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
