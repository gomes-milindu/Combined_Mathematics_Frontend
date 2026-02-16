import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  studentName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
            >
              <X size={20} />
            </button>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Delete Restricted
          </h3>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You can't delete Student.{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {studentName}
            </span>
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
