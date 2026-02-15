import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(120deg,#a6b8e9,#cbb7ea)",
        color: "white",
        fontSize: "18px"
      }}>
        Loading...
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/auth" />;
}

export default PrivateRoute;
