// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
 
//   const isAuthenticated = localStorage.getItem("token");

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");

  // If there is no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;