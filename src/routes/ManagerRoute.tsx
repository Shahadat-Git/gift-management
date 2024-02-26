import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";

const ManagerRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth);
  const userData = useAppDispatch();
  console.log(user);
  if (user?.user?.role !== "manager") {
    userData(logOut());
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default ManagerRoute;
