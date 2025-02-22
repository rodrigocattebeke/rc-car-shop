import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLogged) return navigate(`/login?redirect=${encodeURIComponent(`${location.pathname}`)}`);
  }, [user.isLogged, navigate, location]);

  return user.isLogged ? children : null;
};
