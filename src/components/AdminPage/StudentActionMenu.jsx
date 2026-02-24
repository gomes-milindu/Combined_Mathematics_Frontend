import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { Edit, Eye, Trash2 } from "lucide-react";


export default function StudentActionMenu({
  student,
  position,
  onClose,
  onDeleteClick,
}) {
  if (!student) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      <div
        className="fixed z-50 bg-white shadow-lg rounded-xl border border-slate-100 w-44 overflow-hidden"
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <Link
          to={`/admin/students/studentView/${student._id}`}
          onClick={onClose}
          className="block px-4 py-3 hover:bg-slate-50 flex items-center gap-2"
        >
          <Eye size={16} />
          View
        </Link>

        <Link
          to={`/admin/students/studentEdit/${student._id}`}
          onClick={onClose}
          className="block px-4 py-3 hover:bg-slate-50 flex items-center gap-2"
        >
          <Edit size={16} />
          Edit
        </Link>

        <button
          onClick={() => onDeleteClick(student)}
          className="block w-full text-left px-4 py-3 hover:bg-rose-50 text-rose-600 flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </>,
    document.body
  );
}
