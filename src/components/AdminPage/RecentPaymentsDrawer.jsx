import { X } from "lucide-react";
import PaymentStudent from "./PaymentStudent";

export default function RecentPaymentsDrawer({ isOpen, onClose, studentId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-2xl md:rounded-2xl shadow-xl transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom md:slide-in-from-bottom-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Payment Status
            </h3>
            <p className="text-xs text-slate-500">
              Latest payment updates for this student
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <PaymentStudent studentId={studentId} />
        </div>
      </div>
    </div>
  );
}
