import { Link, useLocation } from "react-router-dom";
import {breadcrumbConfig} from "../../../Data/breadcrumbConfig.js";

export default function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  let currentPath = "";

  return (
    <nav className="mb-4 text-sm text-gray-600">
      <ul className="flex items-center gap-2">
        <li>
          <Link to="/admin" className="text-purple-600 hover:underline">
            Admin
          </Link>
        </li>

        {paths.map((segment, index) => {
          currentPath += `/${segment}`;
          const isLast = index === paths.length - 1;
          const label = breadcrumbConfig[currentPath];

          if (!label) return null; // skip technical routes

          return (
            <li key={currentPath} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="font-semibold">{label}</span>
              ) : (
                <Link
                  to={currentPath}
                  className="text-purple-600 hover:underline"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
