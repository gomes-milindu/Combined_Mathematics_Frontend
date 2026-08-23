import ChangePassword from "../ChangePassword";

export default function StudentChangePassword() {
  return (
    <main className="w-full min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your account password
          </p>
        </div>
        <div className="flex justify-center">
          <ChangePassword role="student" />
        </div>
      </div>
    </main>
  );
}
