import TopNav from "./TopNav";

export default function AddCourse() {
  return (
    <>
        
      <div className="w-full h-[90vh] bg-white flex flex-col items-center pt-5">
        
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-10 border border-gray-200">
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-purple-700">
              Add New Course
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill the course details below
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Calculus"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Course Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Applied Mathematics"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Course Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Price
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Course URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/course"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Full Width Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Description
              </label>
              <textarea
                rows="4"
                placeholder="Brief description about the course"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-8 py-3 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-8 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
