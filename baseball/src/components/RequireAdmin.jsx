// src/components/RequireAdmin.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function RequireAdmin({ children }) {
  const { user } = useContext(UserContext);

  if (!user || !user.is_admin) {
    alert("접근 권한이 없습니다.");
    return <Navigate to="/" replace />;
  }

  return children;
}
