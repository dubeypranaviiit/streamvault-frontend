import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { DashboardProvider } from "../context/DashboardContext";
import DashboardInner from "../components/DashboardInner";

export default function Dashboard() {
      const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-zinc-400">
        Loading dashboard…
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardProvider>
      <DashboardInner />
    </DashboardProvider>
  );
}
