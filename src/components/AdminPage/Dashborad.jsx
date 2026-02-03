export function Dashboard() {
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="text-sm uppercase tracking-wide text-slate-500">
          Admin Overview
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Dashboard Summary
        </h1>
        <p className="mt-1 text-slate-600">
          Professional snapshot of student volumes and live courses.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Total Students</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">
            1,248
          </div>
          <div className="mt-3 text-xs text-emerald-600">All intakes</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">2025 Revision</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">286</div>
          <div className="mt-3 text-xs text-slate-500">Active batch</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">2025 Theory</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">462</div>
          <div className="mt-3 text-xs text-slate-500">Main intake</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">2024 Theory</div>
          <div className="mt-2 text-3xl font-semibold text-slate-900">318</div>
          <div className="mt-3 text-xs text-slate-500">Continuing</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                2025 Theory Intake by Institute
              </h2>
              <div className="text-xs text-slate-500">Two categories</div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-800">
                    Main Campus
                  </div>
                  <div className="text-sm font-semibold text-slate-900">275</div>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-white">
                  <div className="h-2 w-[60%] rounded-full bg-indigo-600" />
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  60% of 2025 Theory
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-800">
                    Partner Institute
                  </div>
                  <div className="text-sm font-semibold text-slate-900">187</div>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-white">
                  <div className="h-2 w-[40%] rounded-full bg-emerald-600" />
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  40% of 2025 Theory
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Live Courses
              </h2>
              <div className="text-xs text-slate-500">Currently running</div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900">
                    2025 Theory — Unit 4
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                    Live
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Tue, 6:00 PM • Hall A
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900">
                    2025 Revision — Mock Test
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">
                    Live
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Wed, 4:30 PM • Hall C
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900">
                    2024 Theory — Past Papers
                  </div>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
                    Ongoing
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Thu, 5:00 PM • Lab 2
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900">
                    Enrichment — Q&A Clinic
                  </div>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700">
                    Scheduled
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Fri, 7:00 PM • Online
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Enrollment Mix
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Quick view of key student segments.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-700">2025 Theory</span>
                <span className="font-medium text-slate-900">462</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-[70%] rounded-full bg-indigo-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-700">2025 Revision</span>
                <span className="font-medium text-slate-900">286</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-[48%] rounded-full bg-emerald-600" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-700">2024 Theory</span>
                <span className="font-medium text-slate-900">318</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 w-[55%] rounded-full bg-amber-500" />
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Total Students</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                1,248
              </div>
              <div className="mt-2 text-xs text-emerald-600">
                Stable enrollment this term
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
