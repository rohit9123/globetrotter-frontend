import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || false ) {
    toast.warning("You need to log in to play!");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
