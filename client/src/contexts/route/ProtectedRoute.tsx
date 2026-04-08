import { Navigate } from "react-router-dom";
import { useUser } from "../auth/UserContext";

const ProtectedRoute = ({ children }: { children: any }) => {
    const { user } = useUser();

    const token = localStorage.getItem("token");

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;