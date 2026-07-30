import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import successSound from "../../assets/sounds/beep.mp3";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import toast from "react-hot-toast";

export default function QrScanner() {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("setup"); // setup → scanning → success → duplicate → error
  const [attendanceResult, setAttendanceResult] = useState(null);
  const navigate = useNavigate();

  // Institute/Batch selection
  const [institute, setInstitute] = useState("");
  const [batch, setBatch] = useState("");
  const [institutes, setInstitutes] = useState([]);
  const [batches, setBatches] = useState([]);

  const qrRef = useRef(null);
  const runningRef = useRef(false);
  const audioRef = useRef(new Audio(successSound));

  // Load institutes on mount
  useEffect(() => {
    api.get("/pricing/institutes")
      .then((res) => setInstitutes(res.data.institutes || []))
      .catch(() => {});
  }, []);

  // Load batches when institute changes
  const handleInstituteChange = async (value) => {
    setInstitute(value);
    setBatch("");
    setBatches([]);
    if (!value) return;
    try {
      const res = await api.get(`/pricing/institutes/${encodeURIComponent(value)}/batches`);
      setBatches(res.data.batches || []);
    } catch {
      setBatches([]);
    }
  };

  // Start scanning
  const startScanning = () => {
    if (!institute || !batch) {
      toast.error("Select institute and batch first.");
      return;
    }
    setStatus("scanning");
    setResult("");
    setAttendanceResult(null);
  };

  // Initialize camera when status becomes "scanning"
  useEffect(() => {
    if (status !== "scanning") return;

    const qr = new Html5Qrcode("qr-reader");
    qrRef.current = qr;

    qr.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 260, height: 260 } },
      async (decodedText) => {
        if (!runningRef.current) return;
        runningRef.current = false;

        audioRef.current.play();
        setResult(decodedText);

        qr.stop().catch(() => {});

        // Call attendance API
        try {
          const res = await api.post("/attendance/mark", {
            studentObjectId: decodedText,
            institute,
            batch,
          });
          setAttendanceResult({
            studentName: res.data.studentName,
            scanTime: new Date().toLocaleTimeString(),
          });
          setStatus("success");
          toast.success("Attendance recorded!");
        } catch (err) {
          if (err.response?.status === 409) {
            setAttendanceResult({
              studentName: err.response?.data?.message || "Already recorded",
              scanTime: new Date().toLocaleTimeString(),
            });
            setStatus("duplicate");
            toast("Attendance already recorded.", { icon: "⚠️" });
          } else if (err.response?.status === 403) {
            setStatus("error");
            toast.error(err.response?.data?.message || "Student is inactive.");
          } else {
            setStatus("error");
            toast.error(err.response?.data?.message || "Scan failed.");
          }
        }
      },
    )
      .then(() => {
        runningRef.current = true;
      })
      .catch(() => {});

    return () => {
      if (qrRef.current && runningRef.current) {
        qrRef.current.stop().catch(() => {});
        runningRef.current = false;
      }
    };
  }, [status]);

  const scanAnother = () => {
    setStatus("scanning");
    setResult("");
    setAttendanceResult(null);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="w-full max-w-6xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-100 bg-white">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-600 font-bold">
                QR Scanner
              </p>
              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                Scan Student QR Code
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {status === "setup"
                  ? "Select class details to start scanning."
                  : "Keep the code centered inside the frame."}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 font-medium">
              <span
                className={`h-2 w-2 rounded-full ${
                  status === "scanning"
                    ? "bg-purple-600 animate-pulse"
                    : status === "success"
                    ? "bg-emerald-500"
                    : status === "duplicate"
                    ? "bg-amber-500"
                    : "bg-slate-400"
                }`}
              />
              {status === "setup" && "Ready"}
              {status === "scanning" && "Live scanning"}
              {status === "success" && "Attendance recorded"}
              {status === "duplicate" && "Already recorded"}
              {status === "error" && "Scan failed"}
            </div>
          </div>
        </div>

        {/* Setup — Institute/Batch Selection */}
        {status === "setup" && (
          <div className="p-6 md:p-10">
            <div className="max-w-md mx-auto space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Institute
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 bg-white"
                  value={institute}
                  onChange={(e) => handleInstituteChange(e.target.value)}
                >
                  <option value="">Select Institute</option>
                  {institutes.map((inst) => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Batch
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 bg-white"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  disabled={!institute}
                >
                  <option value="">Select Batch</option>
                  {batches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={startScanning}
                disabled={!institute || !batch}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-medium py-3 rounded-lg transition text-sm"
              >
                Start Scanning
              </button>
            </div>
          </div>
        )}

        {/* Scanning / Result */}
        {status !== "setup" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start p-6 md:p-10">
            {/* CAMERA */}
            <div className="flex flex-col items-center w-full">
              {status === "scanning" && (
                <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50 shadow-inner">
                  <div
                    id="qr-reader"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-lg" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[90%] h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-scan-line" />
                  </div>
                </div>
              )}

              {status !== "scanning" && (
                <div className="w-full max-w-[320px] aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-3 ${
                      status === "success" ? "bg-emerald-100 text-emerald-600" :
                      status === "duplicate" ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-600"
                    }`}>
                      {status === "success" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      )}
                      {status === "duplicate" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                      {status === "error" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-700">
                      {status === "success" && "Scan Complete"}
                      {status === "duplicate" && "Duplicate Scan"}
                      {status === "error" && "Scan Failed"}
                    </p>
                  </div>
                </div>
              )}

              <p className="mt-6 text-sm text-slate-500 text-center">
                {status === "scanning"
                  ? "Hold steady while we read the code."
                  : `${institute} — ${batch}`}
              </p>
            </div>

            {/* RESULT */}
            <div className="w-full">
              {status === "scanning" && (
                <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 17h.01M9 20h.01M9 17h.01M12 20h.01M15 20h.01M15 17h.01M15 14h.01M9 14h.01M17 14h.01m-2.5 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-10-5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm10 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    </svg>
                  </div>
                  <p className="text-base font-medium text-slate-700">
                    Waiting for QR code
                  </p>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs">
                    Position the QR code within the frame to scan automatically.
                  </p>
                </div>
              )}

              {(status === "success" || status === "duplicate") && (
                <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-sm text-center md:text-left">
                  <div className={`mx-auto md:mx-0 h-14 w-14 rounded-full flex items-center justify-center mb-4 ${
                    status === "success" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                  }`}>
                    {status === "success" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {status === "success" ? "Attendance Recorded!" : "Already Recorded"}
                  </h3>
                  <p className="text-slate-500 mt-1">
                    {status === "success"
                      ? `${attendanceResult?.studentName} has been marked present.`
                      : "This student was already scanned for today's class."}
                  </p>

                  {attendanceResult && (
                    <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                      {attendanceResult.studentName && status === "success" && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Student</p>
                          <p className="text-lg font-semibold text-purple-600">{attendanceResult.studentName}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Time</p>
                        <p className="text-sm font-medium text-slate-700">{attendanceResult.scanTime}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Class</p>
                        <p className="text-sm font-medium text-slate-700">{institute} — {batch}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={scanAnother}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition text-sm"
                    >
                      Scan Another
                    </button>
                    <button
                      onClick={() => navigate(`/admin/students/studentView/${result}`)}
                      className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-2.5 rounded-lg transition text-sm"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-2xl border border-red-100 bg-white p-8 shadow-sm text-center">
                  <h3 className="text-xl font-bold text-slate-800">Scan Failed</h3>
                  <p className="text-slate-500 mt-2">The QR code could not be processed. Please try again.</p>
                  <button
                    onClick={scanAnother}
                    className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition text-sm"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 2s linear infinite;
          position: absolute;
          width: 90%;
        }
      `}</style>
    </div>
  );
}
