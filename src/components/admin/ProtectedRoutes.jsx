import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, requiredRole }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {

    // If user is not logged in
    if (!user) {
      navigate("/login");
    }

    // If a role is required and user's role doesn't match
    else if (requiredRole && user.role !== requiredRole) {
      navigate("/");
    }

  }, [user, navigate, requiredRole]);

  if (!user || (requiredRole && user.role !== requiredRole)) return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
