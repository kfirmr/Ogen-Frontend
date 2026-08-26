import { Navigate } from "react-router-dom";
import { type FC, type ReactNode } from "react";
import { authStore } from "../../store/auth.store";
import { AUTH_ROUTES } from "../../constants/auth.constants";

interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const accessToken = authStore((state) => state.accessToken);

  if (accessToken === null) {
    return <Navigate replace to={AUTH_ROUTES.LOGIN} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
