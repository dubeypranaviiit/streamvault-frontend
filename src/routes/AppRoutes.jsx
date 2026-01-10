import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Upload from "../pages/Upload";
import VideoWatch from "../pages/VideoWatch";
import EditVideo from "../pages/EditVideo";
import AdminUsers from "../pages/AdminUsers"; 

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/:id/edit"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["editor", "admin"]}>
                <EditVideo />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <ProtectedRoute>
              <VideoWatch />
            </ProtectedRoute>
          }
        />
    
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
