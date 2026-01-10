import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import AuthContext from "../../../context/AuthContext";
import { useDashboard } from "../../../context/DashboardContext";
export default function VideoList() {
  const { user } = useContext(AuthContext);
  const canEdit =
    user.role === "editor" || user.role === "admin";
   const { setActiveTab } = useDashboard();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [mineOnly, setMineOnly] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter) params.status = statusFilter;
      if (mineOnly) params.mine = "true";

      const res = await api.get("/videos", { params });
      setVideos(res.data.videos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [statusFilter, mineOnly]);

  const statusBadge = (video) => {
    if (video.processing.status === "processing")
      return <span className="badge bg-yellow-500/20 text-yellow-400">PROCESSING</span>;

    if (video.processing.status === "uploaded")
      return <span className="badge bg-zinc-500/20 text-zinc-400">UPLOADED</span>;

    if (video.processing.status === "completed")
      return video.processing.sensitivityResult === "safe" ? (
        <span className="badge bg-green-500/20 text-green-400">SAFE</span>
      ) : (
        <span className="badge bg-red-500/20 text-red-400">FLAGGED</span>
      );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Videos</h1>

      {(user.role === "editor" || user.role === "admin") && (
  <button
    onClick={() => setActiveTab("upload")}
    className="px-4 py-2 bg-indigo-600 rounded text-sm"
  >
    Upload Video
  </button>
)}

      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="uploaded">Uploaded</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>

        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={mineOnly}
            onChange={(e) => setMineOnly(e.target.checked)}
          />
          My uploads only
        </label>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading videos…</p>
      ) : (
        <div className="grid gap-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{video.title}</h3>
                <p className="text-xs text-zinc-400">
                  Uploaded {new Date(video.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {statusBadge(video)}

                {video.processing.status === "completed" && (
                  <Link
                    to={`/watch/${video._id}`}
                    className="px-3 py-1 rounded bg-indigo-600 text-sm"
                  >
                    Play
                  </Link>
                )}

                {canEdit && (
                  <Link
                    to={`/videos/${video._id}/edit`}
                    className="px-3 py-1 rounded bg-zinc-700 text-sm"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
