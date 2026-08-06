import { useState } from "react";
import { BadgeDollarSign, Pencil, PlusCircle, Trash2 } from "lucide-react";
import Breadcrumb from "./Breadcrumb";

const initialPricing = [
  {
    _id: "pricing-1",
    institute: "Samathwee",
    batch: "2028 Theory",
    fullPayment: 3800,
    halfPayment: 2000,
    freePayment: 0,
  },
  {
    _id: "pricing-2",
    institute: "New Sense",
    batch: "2028 Theory",
    fullPayment: 5000,
    halfPayment: 2500,
    freePayment: 0,
  },
  {
    _id: "pricing-3",
    institute: "ABC Mathematics Institute",
    batch: "2026 A/L",
    fullPayment: 25000,
    halfPayment: 15000,
    freePayment: 0,
  },
];

const emptyForm = {
  institute: "",
  batch: "",
  fullPayment: "",
  halfPayment: "",
  freePayment: "",
};

function formatCurrency(value) {
  const safe = Number(value || 0);
  return `Rs. ${safe.toLocaleString()}`;
}

export default function PricingManagement() {
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Administration
            </p>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
              Course Pricing Management
            </h1>
          </div>
          <Breadcrumb />
        </div>

        <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                <BadgeDollarSign className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Pricing Form
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  UI ready for backend create and update integration.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Institute Name
                </label>
                <input
                  type="text"
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  placeholder="ABC Mathematics Institute"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-purple-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Batch
                </label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  placeholder="2026 A/L"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-purple-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Full Payment
                  </label>
                  <input
                    type="number"
                    name="fullPayment"
                    min="0"
                    value={formData.fullPayment}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-purple-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Half Payment
                  </label>
                  <input
                    type="number"
                    name="halfPayment"
                    min="0"
                    value={formData.halfPayment}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-purple-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Free Payment
                  </label>
                  <input
                    type="number"
                    name="freePayment"
                    min="0"
                    value={formData.freePayment}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-purple-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
                >
                  <PlusCircle size={16} />
                  Create Pricing
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Clear
                </button>
              </div>
            </form>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_30px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Available Pricing Plans
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Review all pricing records and update them as needed.
                </p>
              </div>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                {initialPricing.length} records
              </span>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Institute</th>
                    <th className="px-6 py-4 font-medium">Batch</th>
                    <th className="px-6 py-4 font-medium">Full</th>
                    <th className="px-6 py-4 font-medium">Half</th>
                    <th className="px-6 py-4 font-medium">Free</th>
                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {initialPricing.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">
                        {item.institute}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {item.batch}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {formatCurrency(item.fullPayment)}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {formatCurrency(item.halfPayment)}
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {formatCurrency(item.freePayment)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-purple-300 hover:text-purple-600 dark:border-slate-700 dark:text-slate-300"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className="rounded-lg border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 p-4 lg:hidden">
              {initialPricing.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                        {item.institute}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.batch}
                      </p>
                    </div>
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      {formatCurrency(item.fullPayment)}
                    </span>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Full
                      </p>
                      <p>{formatCurrency(item.fullPayment)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Half
                      </p>
                      <p>{formatCurrency(item.halfPayment)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400">
                        Free
                      </p>
                      <p>{formatCurrency(item.freePayment)}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-purple-300 hover:text-purple-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="rounded-lg border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
