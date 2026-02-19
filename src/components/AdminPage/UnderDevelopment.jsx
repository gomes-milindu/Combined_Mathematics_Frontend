import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnderDevelopment() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[80vh] items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
      <div className="z-10 w-full max-w-lg rounded-xl bg-white dark:bg-slate-800 p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-full  dark:bg-purple-900/30">
            <AlertCircle className="h-16 w-16 text-purple-600 dark:text-purple-400" />
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-purple-500 dark:text-gray-100">
            Page Under Construction
          </h1>

          <p className="mb-6 text-gray-600 dark:text-gray-300">
            This section is currently being improved. We appreciate your
            patience and invite you to check back soon for the latest
            updates.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>

      {/* subtle background accents */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-purple-300 opacity-20 blur-2xl dark:bg-purple-700/20" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-indigo-300 opacity-20 blur-2xl dark:bg-indigo-700/20" />
    </div>
  );
}
