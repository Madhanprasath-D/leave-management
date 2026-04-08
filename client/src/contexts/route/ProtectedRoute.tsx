import { Navigate } from "react-router-dom";
import { useUser } from "../auth/UserContext";

const ProtectedRoute = ({ children }: { children: any }) => {

  const { user, login } = useUser();

  const storedAuth = localStorage.getItem("auth");

  if (!user && storedAuth) {
    const parsed = JSON.parse(storedAuth);

    if (Date.now() < parsed.expiry) {
      login(parsed.user); // restore session
      return children;
    } else {
      localStorage.removeItem("auth");
      return <Navigate to="/login" replace />;
    }
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;

};

export default ProtectedRoute;