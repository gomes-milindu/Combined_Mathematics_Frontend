import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the user is authenticated (adjust 'token' to match your storage key)
  const isAuthenticated = localStorage.getItem("token");

  // If authenticated, render the child routes (Outlet)
  // If not, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;