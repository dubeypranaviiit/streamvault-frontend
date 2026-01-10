import AppRoutes from "./routes/AppRoutes";
import {   useRefreshToken} from "./hooks/useTokenRefresh";
import { useAuth } from "./context/AuthContext";
export default function App() {
  const { user } = useAuth();

  useRefreshToken(user);
  return( <AppRoutes />);
}
