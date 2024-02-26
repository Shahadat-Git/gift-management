import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

const ManagerRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  if (user?.user?.role === "manager") {
    return children;
  }
  return <Navigate to="/inventory" replace={true}></Navigate>;
};

export default ManagerRoute;
