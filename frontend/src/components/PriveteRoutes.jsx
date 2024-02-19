import { Outlet, Navigate } from "react-router-dom";

export default function PriveteRoutes({ user }) {
  return user?.isLoggedIn ? <Outlet /> : <Navigate replace to="/" />;
}
