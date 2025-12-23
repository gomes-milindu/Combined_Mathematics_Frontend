import { FiEdit2, FiTrash2 } from "react-icons/fi";


export default function PreviousAddedCourse() {
  return (
    <div className="w-full bg-white px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200">

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-lg font-semibold text-purple-700">
            Added Courses
          </h2>
          <p className="text-sm text-slate-500">
            Previously created courses
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full text-sm border-separate border-spacing-y-1">

            {/* Head */}
            <thead>
              <tr className="text-slate-500">
                <th className="py-3 text-left font-medium">Course</th>
                <th className="py-3 text-left font-medium">Category</th>
                <th className="py-3 text-left font-medium">Price</th>
                <th className="py-3 text-left font-medium">Link</th>
                <th className="py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-slate-700">

              {/* Row 1 */}
              <tr className="rounded-lg hover:bg-slate-50 transition">
                <td className="py-4 font-medium">
                  Advanced Calculus
                </td>

                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                    Pure Mathematics
                  </span>
                </td>

                <td className="py-4 text-slate-600">
                  Rs. 2000
                </td>

                <td className="py-4 text-purple-600 hover:underline cursor-pointer">
                  View
                </td>

                <td className="py-4 text-center">
                  <div className="flex justify-center gap-4 text-slate-400">
                    <button className="hover:text-purple-600 transition">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="hover:text-red-500 transition">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="rounded-lg hover:bg-slate-50 transition">
                <td className="py-4 font-medium">
                  Differential Equations
                </td>

                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700">
                    Applied Mathematics
                  </span>
                </td>

                <td className="py-4 text-slate-600">
                  Rs. 1800
                </td>

                <td className="py-4 text-purple-600 hover:underline cursor-pointer">
                  View
                </td>

                <td className="py-4 text-center">
                  <div className="flex justify-center gap-4 text-slate-400">
                    <button className="hover:text-purple-600 transition">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="hover:text-red-500 transition">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
