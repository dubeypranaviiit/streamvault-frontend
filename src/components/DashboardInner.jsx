import { useDashboard } from "../context/DashboardContext";
import { useContext } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import VideoList from "./video/VideoList/VideoList";
import Upload from "../pages/Upload";
import AuthContext from "../context/AuthContext";
import AdminUsers from "../pages/AdminUsers";

function DashboardInner() {
  const { activeTab, setActiveTab } = useDashboard();
  const { user, loading } = useContext(AuthContext);
  if (loading || !user) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-400">
        Loading dashboard…
      </div>
    );
  }

  const canUpload =
    user.role === "editor" || user.role === "admin";

  const canViewAdminPanel =user.role === "admin";
  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      canUpload={canUpload}
    >
      {activeTab === "videos" && <VideoList />}
      {canUpload && activeTab === "upload" && <Upload />}
      {canViewAdminPanel && activeTab === "admin" && <AdminUsers/>}
    </DashboardLayout>
  );
}

export default DashboardInner;
