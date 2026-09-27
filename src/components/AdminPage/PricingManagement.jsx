import { useState, useEffect } from "react";
import {
  BadgeDollarSign,
  Pencil,
  PlusCircle,
  Trash2,
  Save,
  X,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../config/axios";
import Breadcrumb from "./Breadcrumb";

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
  const [pricingList, setPricingList] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // State for Delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pricingToDelete, setPricingToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all pricing records from backend
  const fetchPricing = async () => {
    try {
      setLoading(true);
      const response = await api.get("/pricing/");
      const data = response.data?.pricing || response.data || [];
      setPricingList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching pricing:", err);
      toast.error(
        err.response?.data?.message || "Failed to load pricing plans"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.institute.trim() || !formData.batch.trim()) {
      toast.error("Institute Name and Batch are required.");
      return;
    }

    if (
      formData.fullPayment === "" ||
      formData.halfPayment === "" ||
      formData.freePayment === ""
    ) {
      toast.error("All payment amount fields are required.");
      return;
    }

    const payload = {
      institute: formData.institute.trim(),
      batch: formData.batch.trim(),
      fullPayment: Number(formData.fullPayment),
      halfPayment: Number(formData.halfPayment),
      freePayment: Number(formData.freePayment),
    };

    setSubmitting(true);
    try {
      if (editingId) {
        const existingRecord = pricingList.find(
          (item) => item._id === editingId
        );
        // Update existing pricing record
        const response = await api.put("/pricing/update", {
          id: editingId,
          oldInstitute: existingRecord?.institute || "",
          ...payload,
        });
        toast.success(response.data?.message || "Pricing updated successfully");
      } else {
        // Create new pricing record
        const response = await api.post("/pricing/create", payload);
        toast.success(response.data?.message || "Pricing created successfully");
      }
      resetForm();
      fetchPricing();
    } catch (err) {
      console.error("Error saving pricing:", err);
      toast.error(err.response?.data?.message || "Failed to save pricing");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      institute: item.institute || "",
      batch: item.batch || "",
      fullPayment: item.fullPayment ?? "",
      halfPayment: item.halfPayment ?? "",
      freePayment: item.freePayment ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (item) => {
    setPricingToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!pricingToDelete) return;
    setDeletingId(pricingToDelete._id);
    try {
      const response = await api.delete(`/pricing/${pricingToDelete._id}`);
      toast.success(response.data?.message || "Pricing deleted successfully");
      setDeleteModalOpen(false);
      setPricingToDelete(null);
      fetchPricing();
    } catch (err) {
      console.error("Error deleting pricing:", err);
      toast.error(err.response?.data?.message || "Failed to delete pricing");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
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
          {/* Form Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
                <BadgeDollarSign className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {editingId ? "Edit Pricing Plan" : "Create Pricing Plan"}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {editingId
                    ? "Update the details for the selected pricing plan."
                    : "Add a new pricing structure for an institute & batch."}
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
                  required
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
                  required
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
                    placeholder="0"
                    required
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
                    placeholder="0"
                    required
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
                    placeholder="0"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 transition focus:border-purple-400 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {editingId ? "Updating..." : "Creating..."}
                    </>
                  ) : editingId ? (
                    <>
                      <Save size={16} />
                      Update Pricing
                    </>
                  ) : (
                    <>
                      <PlusCircle size={16} />
                      Create Pricing
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {editingId ? "Cancel Edit" : "Clear"}
                </button>
              </div>
            </form>
          </section>

          {/* Table / List Section */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_30px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 p-6 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Available Pricing Plans
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Review all pricing records and update or delete them as needed.
                </p>
              </div>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                {pricingList.length} records
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
                <p className="text-sm">Loading pricing plans...</p>
              </div>
            ) : pricingList.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                No pricing plans found. Create your first plan above.
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
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
                      {pricingList.map((item) => (
                        <tr
                          key={item._id}
                          className={`hover:bg-slate-50 dark:hover:bg-slate-800/60 transition ${
                            editingId === item._id
                              ? "bg-purple-50/50 dark:bg-purple-950/20"
                              : ""
                          }`}
                        >
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
                                title="Edit Pricing"
                                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-purple-300 hover:text-purple-600 dark:border-slate-700 dark:text-slate-300 cursor-pointer"
                              >
                                <Pencil size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => openDeleteModal(item)}
                                title="Delete Pricing"
                                className="rounded-lg border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400 cursor-pointer"
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

                {/* Mobile Cards View */}
                <div className="grid gap-4 p-4 lg:hidden">
                  {pricingList.map((item) => (
                    <div
                      key={item._id}
                      className={`rounded-2xl border bg-slate-50 p-4 transition dark:bg-slate-800/50 ${
                        editingId === item._id
                          ? "border-purple-400 ring-2 ring-purple-100 dark:ring-purple-900/30"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
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
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-purple-300 hover:text-purple-600 dark:border-slate-700 dark:text-slate-300 cursor-pointer"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(item)}
                          className="rounded-lg border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && pricingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <AlertTriangle size={20} />
                </div>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={deletingId !== null}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Delete Pricing Plan
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                Are you sure you want to delete the pricing record for{" "}
                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {pricingToDelete.institute} ({pricingToDelete.batch})
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={deletingId !== null}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deletingId !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium transition text-sm disabled:opacity-50 cursor-pointer"
                >
                  {deletingId ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

