import api from "../../config/axios";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Video, ExternalLink, X, ChevronDown, ChevronRight } from "lucide-react";

export default function VideoManagement() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [pricingOptions, setPricingOptions] = useState([]);

    const [form, setForm] = useState({
        title: "",
        videoUrl: "",
        description: "",
    });

    // Selected targets: { "Apex": ["2027 A/L theory", "2028 A/L theory"], "Sisulka": [] }
    const [selectedTargets, setSelectedTargets] = useState({});
    // Track which institute groups are expanded in the UI
    const [expandedInstitutes, setExpandedInstitutes] = useState({});

    const fetchVideos = async () => {
        try {
            const res = await api.get("/videos/");
            setVideos(res.data.videos || []);
        } catch (err) {
            console.error("Failed to fetch videos:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPricing = async () => {
        try {
            const res = await api.get("/pricing");
            const data = Array.isArray(res.data) ? res.data : res.data.pricing || [];
            setPricingOptions(data);
        } catch (err) {
            console.error("Failed to fetch pricing:", err);
        }
    };

    useEffect(() => {
        fetchVideos();
        fetchPricing();
    }, []);

    // Group pricing data by institute
    const instituteGroups = {};
    pricingOptions.forEach((p) => {
        if (!instituteGroups[p.institute]) {
            instituteGroups[p.institute] = [];
        }
        if (!instituteGroups[p.institute].includes(p.batch)) {
            instituteGroups[p.institute].push(p.batch);
        }
    });

    // --- Checkbox logic ---
    const toggleInstitute = (inst) => {
        setSelectedTargets((prev) => {
            const batches = instituteGroups[inst] || [];
            const currentSelected = prev[inst] || [];
            const allSelected = currentSelected.length === batches.length;
            return {
                ...prev,
                [inst]: allSelected ? [] : [...batches],
            };
        });
    };

    const toggleBatch = (inst, batch) => {
        setSelectedTargets((prev) => {
            const current = prev[inst] || [];
            const isSelected = current.includes(batch);
            return {
                ...prev,
                [inst]: isSelected
                    ? current.filter((b) => b !== batch)
                    : [...current, batch],
            };
        });
    };

    const toggleExpand = (inst) => {
        setExpandedInstitutes((prev) => ({ ...prev, [inst]: !prev[inst] }));
    };

    const getInstituteState = (inst) => {
        const batches = instituteGroups[inst] || [];
        const selected = (selectedTargets[inst] || []).length;
        if (selected === 0) return "none";
        if (selected === batches.length) return "all";
        return "partial";
    };

    // Build flat targets array from selectedTargets
    const buildTargets = () => {
        const targets = [];
        Object.entries(selectedTargets).forEach(([inst, batches]) => {
            batches.forEach((batch) => {
                targets.push({ institute: inst, batch });
            });
        });
        return targets;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const targets = buildTargets();

        if (!form.title || !form.videoUrl) {
            toast.error("Title and YouTube URL are required");
            return;
        }
        if (targets.length === 0) {
            toast.error("Select at least one institute + batch target");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post("/videos/", {
                title: form.title,
                videoUrl: form.videoUrl,
                description: form.description,
                targets,
            });
            toast.success("Video added successfully");
            setForm({ title: "", videoUrl: "", description: "" });
            setSelectedTargets({});
            setShowForm(false);
            fetchVideos();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add video");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this video?")) return;
        try {
            await api.delete(`/videos/${id}`);
            toast.success("Video deleted");
            fetchVideos();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete video");
        }
    };

    // Helper: get display targets for a video (supports both legacy and new format)
    const getVideoTargets = (video) => {
        if (video.targets && video.targets.length > 0) return video.targets;
        if (video.institute && video.batch) return [{ institute: video.institute, batch: video.batch }];
        return [];
    };

    // Group targets by institute for display
    const groupTargetsByInstitute = (targets) => {
        const groups = {};
        targets.forEach((t) => {
            if (!groups[t.institute]) groups[t.institute] = [];
            groups[t.institute].push(t.batch);
        });
        return groups;
    };

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Video Management
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Manage YouTube videos for student LMS access
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition font-medium shadow-sm"
                    >
                        {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {showForm ? "Cancel" : "Add Video"}
                    </button>
                </div>

                {/* Add Video Form */}
                {showForm && (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                            Add New Video
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Video Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Integration — Part 1"
                                        required
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                {/* YouTube URL */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        YouTube URL *
                                    </label>
                                    <input
                                        type="url"
                                        name="videoUrl"
                                        value={form.videoUrl}
                                        onChange={handleChange}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        required
                                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Description (optional)
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Brief description of the video content"
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                                />
                            </div>

                            {/* Multi-Target Checkbox UI */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Assign to Classes *
                                </label>
                                <div className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden">
                                    {Object.keys(instituteGroups).length === 0 ? (
                                        <div className="p-4 text-sm text-slate-400 text-center">
                                            No institutes found. Add pricing data first.
                                        </div>
                                    ) : (
                                        Object.entries(instituteGroups).map(([inst, batches]) => {
                                            const state = getInstituteState(inst);
                                            const isExpanded = expandedInstitutes[inst] !== false; // default expanded
                                            return (
                                                <div key={inst} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                                                    {/* Institute Row */}
                                                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleExpand(inst)}
                                                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                        >
                                                            {isExpanded ? (
                                                                <ChevronDown className="w-4 h-4" />
                                                            ) : (
                                                                <ChevronRight className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                                                            <input
                                                                type="checkbox"
                                                                checked={state === "all"}
                                                                ref={(el) => {
                                                                    if (el) el.indeterminate = state === "partial";
                                                                }}
                                                                onChange={() => toggleInstitute(inst)}
                                                                className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                                            />
                                                            <span className="font-semibold text-sm text-slate-800 dark:text-white">
                                                                {inst}
                                                            </span>
                                                            <span className="text-xs text-slate-400 ml-1">
                                                                ({(selectedTargets[inst] || []).length}/{batches.length})
                                                            </span>
                                                        </label>
                                                    </div>

                                                    {/* Batch Rows */}
                                                    {isExpanded && (
                                                        <div className="bg-white dark:bg-slate-900">
                                                            {batches.map((batch) => (
                                                                <label
                                                                    key={batch}
                                                                    className="flex items-center gap-2 px-4 py-2.5 pl-12 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={(selectedTargets[inst] || []).includes(batch)}
                                                                        onChange={() => toggleBatch(inst, batch)}
                                                                        className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                                                    />
                                                                    <span className="text-sm text-slate-700 dark:text-slate-300">
                                                                        {batch}
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                                {buildTargets().length > 0 && (
                                    <p className="text-xs text-slate-500 mt-1.5">
                                        {buildTargets().length} target{buildTargets().length > 1 ? "s" : ""} selected
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-2.5 rounded-xl text-white font-medium transition ${isSubmitting
                                        ? "bg-purple-400 cursor-not-allowed"
                                        : "bg-purple-600 hover:bg-purple-700"
                                    }`}
                            >
                                {isSubmitting ? "Saving..." : "Save Video"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Video List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                        <Video className="w-5 h-5 text-purple-600" />
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            All Videos ({videos.length})
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-slate-500 mt-3">Loading videos...</p>
                        </div>
                    ) : videos.length === 0 ? (
                        <div className="p-12 text-center">
                            <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">No videos added yet</p>
                            <p className="text-slate-400 text-sm mt-1">
                                Click "Add Video" to upload your first YouTube video
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {videos.map((video) => {
                                const targets = getVideoTargets(video);
                                const grouped = groupTargetsByInstitute(targets);
                                return (
                                    <div
                                        key={video._id}
                                        className="p-4 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {video.title}
                                            </h3>
                                            {video.description && (
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                                    {video.description}
                                                </p>
                                            )}

                                            {/* Grouped targets display */}
                                            <div className="mt-2 space-y-1">
                                                {Object.entries(grouped).map(([inst, batches]) => (
                                                    <div key={inst} className="flex items-start gap-2">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800 shrink-0 mt-0.5">
                                                            {inst}
                                                        </span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {batches.map((b) => (
                                                                <span
                                                                    key={b}
                                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                                                                >
                                                                    {b}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <span
                                                className={`inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium border ${video.isActive
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
                                                        : "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                                                    }`}
                                            >
                                                {video.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <a
                                                href={video.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                Open
                                            </a>
                                            <button
                                                onClick={() => handleDelete(video._id)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 border border-rose-200 dark:border-rose-800 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 transition"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
