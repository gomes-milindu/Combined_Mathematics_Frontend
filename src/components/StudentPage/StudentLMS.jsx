import { useEffect, useState } from "react";
import { getRegistrations, getLmsVideos } from "../../api/LmsApi";
import {
    PlayCircle,
    Lock,
    Building2,
    Users,
    AlertCircle,
    Loader2,
    VideoOff,
    CreditCard,
} from "lucide-react";

export default function StudentLMS() {
    const [registrations, setRegistrations] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [videos, setVideos] = useState([]);
    const [loadingRegs, setLoadingRegs] = useState(true);
    const [loadingVideos, setLoadingVideos] = useState(false);
    const [error, setError] = useState("");
    const [accessDenied, setAccessDenied] = useState(false);
    const [activeVideoUrl, setActiveVideoUrl] = useState(null);

    // Fetch student registrations on mount
    useEffect(() => {
        setLoadingRegs(true);
        setError("");
        getRegistrations()
            .then((res) => {
                setStudentName(res.data.studentName || "");
                setRegistrations(res.data.registrations || []);
                setLoadingRegs(false);
            })
            .catch((err) => {
                console.error("Failed to fetch registrations", err);
                setError("Failed to load your class registrations.");
                setLoadingRegs(false);
            });
    }, []);

    // Fetch videos when selected registration changes
    useEffect(() => {
        if (registrations.length === 0) return;

        const reg = registrations[selectedIndex];
        if (!reg) return;

        setActiveVideoUrl(null);

        if (!reg.isPaid) {
            setVideos([]);
            setAccessDenied(true);
            setLoadingVideos(false);
            return;
        }

        setAccessDenied(false);
        setLoadingVideos(true);

        getLmsVideos(reg.institute, reg.batch)
            .then((res) => {
                setVideos(res.data.videos || []);
                setLoadingVideos(false);
            })
            .catch((err) => {
                console.error("Failed to fetch videos", err);
                if (err.response?.status === 403) {
                    setAccessDenied(true);
                    setVideos([]);
                } else {
                    setError("Failed to load videos.");
                }
                setLoadingVideos(false);
            });
    }, [selectedIndex, registrations]);

    /**
     * Extract YouTube embed URL from various YouTube URL formats
     */
    function getYouTubeEmbedUrl(url) {
        if (!url) return null;
        // Handle youtube.com/watch?v=ID
        const watchMatch = url.match(
            /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        if (watchMatch) {
            return `https://www.youtube.com/embed/${watchMatch[1]}`;
        }
        // Already an embed URL
        if (url.includes("youtube.com/embed/")) return url;
        return url;
    }

    const currentReg = registrations[selectedIndex];

    // ── Loading state ──
    if (loadingRegs) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        Loading your classes...
                    </p>
                </div>
            </div>
        );
    }

    // ── Error state ──
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3 text-center">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                    <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    // ── Empty registrations ──
    if (registrations.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800">
                        <VideoOff className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                        No Classes Available
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        You don't have any class registrations yet. Please contact the
                        administration.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            {/* ── Header ── */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    My Classes
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Watch your class videos here, {studentName}
                </p>
            </div>

            {/* ── Institute / Batch selector ── */}
            {registrations.length > 1 && (
                <div className="flex flex-wrap gap-3">
                    {registrations.map((reg, idx) => (
                        <button
                            key={`${reg.institute}-${reg.batch}`}
                            onClick={() => setSelectedIndex(idx)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${selectedIndex === idx
                                    ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200 dark:shadow-none"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-300 hover:text-purple-600"
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            {reg.institute}
                            <span className="text-xs opacity-75">• {reg.batch}</span>
                            {reg.isPaid ? (
                                <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400" title="Paid" />
                            ) : (
                                <Lock className="w-3.5 h-3.5 ml-1 text-amber-500" title="Unpaid" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* ── Current selection info bar ── */}
            {currentReg && (
                <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Building2 className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">{currentReg.institute}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{currentReg.batch}</span>
                    </div>
                    <div className="ml-auto">
                        {currentReg.isPaid ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                                <CreditCard className="w-3.5 h-3.5" />
                                Paid — {currentReg.month}
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
                                <Lock className="w-3.5 h-3.5" />
                                Payment Required
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* ── Payment required state ── */}
            {accessDenied && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/20 mb-5">
                        <Lock className="w-12 h-12 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                        Payment Required
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                        Payment required to access these classes. Please complete your
                        payment for{" "}
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {currentReg?.institute} — {currentReg?.batch}
                        </span>{" "}
                        to unlock the videos.
                    </p>
                </div>
            )}

            {/* ── Video player ── */}
            {activeVideoUrl && !accessDenied && (
                <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={getYouTubeEmbedUrl(activeVideoUrl)}
                            title="Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            {/* ── Video loading ── */}
            {loadingVideos && !accessDenied && (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
                </div>
            )}

            {/* ── Video list ── */}
            {!loadingVideos && !accessDenied && videos.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
                        <VideoOff className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                        No Videos Yet
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        No class videos have been uploaded for this category yet.
                    </p>
                </div>
            )}

            {!loadingVideos && !accessDenied && videos.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {videos.map((video) => {
                        const isPlaying = activeVideoUrl === video.videoUrl;
                        return (
                            <div
                                key={video._id}
                                onClick={() =>
                                    setActiveVideoUrl(isPlaying ? null : video.videoUrl)
                                }
                                className={`group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${isPlaying
                                        ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800"
                                        : "border-slate-200 dark:border-slate-800"
                                    }`}
                            >
                                {/* Thumbnail area */}
                                <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 h-40 flex items-center justify-center">
                                    <div
                                        className={`p-4 rounded-full transition-all duration-200 ${isPlaying
                                                ? "bg-purple-600 text-white scale-110"
                                                : "bg-white/80 dark:bg-slate-800/80 text-purple-600 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110"
                                            }`}
                                    >
                                        <PlayCircle className="w-8 h-8" />
                                    </div>
                                    {isPlaying && (
                                        <span className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider">
                                            Now Playing
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 mb-1">
                                        {video.title}
                                    </h4>
                                    {video.description && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                            {video.description}
                                        </p>
                                    )}
                                    <p className="text-[10px] text-slate-400 mt-2">
                                        {new Date(video.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
