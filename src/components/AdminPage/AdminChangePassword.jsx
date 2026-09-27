import ChangePassword from "../ChangePassword";
import Breadcrumb from "./BreadCrumb";

export default function AdminChangePassword() {
  return (
    <main className="w-full min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>
            <p className="text-sm text-gray-500 mt-1">
              Update your admin account password
            </p>
          </div>
          <Breadcrumb />
        </div>

        <div className="flex justify-center">
          <ChangePassword role="admin" />
        </div>
      </div>
    </main>
  );
}
