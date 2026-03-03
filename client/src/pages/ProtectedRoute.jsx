import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  // If no profile exists in localStorage, send them back to Login
  if (!profile || !profile.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
