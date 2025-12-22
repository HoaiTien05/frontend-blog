import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux";
import { Spin } from "antd";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Spin fullscreen />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
