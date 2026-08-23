import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Decode JWT payload without a library (base64url decode).
 * Returns null if token is invalid or expired.
 */
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));

    // Check expiry
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null; // expired
    }

    return decoded;
  } catch {
    return null;
  }
}

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = decodeToken(token);

  if (!decoded) {
    // Token expired or malformed — clear and redirect
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // Role-based frontend guard
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStudentRoute = location.pathname.startsWith("/student");

  if (isAdminRoute && decoded.role !== "admin") {
    return <Navigate to="/student" replace />;
  }

  if (isStudentRoute && decoded.role !== "student" && decoded.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;