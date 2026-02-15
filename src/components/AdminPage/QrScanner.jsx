import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import successSound from "../../assets/sounds/beep.mp3";
import { useNavigate } from "react-router-dom";

export default function QrScanner() {
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("scanning");
  const navigate = useNavigate();

  const qrRef = useRef(null);
  const runningRef = useRef(false);

  // keep audio ref (comment usage only)
  const audioRef = useRef(new Audio(successSound));

  useEffect(() => {
    const qr = new Html5Qrcode("qr-reader");
    qrRef.current = qr;

    qr.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 260, height: 260 } },
      (decodedText) => {
        if (!runningRef.current) return;

        // TEMPORARILY DISABLED SOUND
        audioRef.current.play();

        setResult(decodedText);
        setStatus("success");

        qr.stop().catch(() => {});
        runningRef.current = false;

        setTimeout(() => {
          navigate(`/admin/students/studentView/${decodedText}`);
        }, 500);
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
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="w-full max-w-6xl mx-auto rounded-2xl border border-purple-100 bg-white shadow-[0_8px_30px_rgba(88,28,135,0.08)] overflow-hidden">
        <div className="px-6 py-6 border-b border-purple-50 bg-white">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-bold">
                QR Scanner
              </p>
              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                Scan Student QR Code
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Keep the code centered inside the frame.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm text-purple-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
              {status === "scanning" ? "Live scanning" : "Scan completed"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start p-6 md:p-10">
          {/* CAMERA */}
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border-2 border-purple-500 bg-slate-50 shadow-[0_0_0_8px_rgba(124,58,237,0.08)]">
              <div
                id="qr-reader"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-purple-100/10 pointer-events-none" />

              {/* Scan corners - visual only */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-purple-500 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-purple-500 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-purple-500 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-purple-500 rounded-br-lg" />

              {status === "scanning" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[90%] h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-scan-line" />
                </div>
              )}
            </div>

            <p className="mt-6 text-sm text-slate-500 text-center">
              {status === "scanning"
                ? "Hold steady while we read the code."
                : "Scan completed successfully."}
            </p>
          </div>

          {/* RESULT */}
          <div className="w-full">
            {status === "scanning" && (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 p-8">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 17h.01M9 20h.01M9 17h.01M12 20h.01M15 20h.01M15 17h.01M15 14h.01M9 14h.01M17 14h.01m-2.5 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-10-5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm10 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                    />
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

            {status === "success" && (
              <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-sm text-center md:text-left">
                <div className="mx-auto md:mx-0 h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  Scan Successful!
                </h3>
                <p className="text-slate-500 mt-1">
                  Student has been identified.
                </p>

                <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Student ID
                  </p>
                  <p className="text-2xl font-mono font-bold text-purple-600">
                    {result}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-slate-500 mb-2">
                    Redirecting momentarily...
                  </p>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 animate-[progress_1s_ease-in-out_infinite]" />
                  </div>
                </div>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium py-2.5 rounded-lg transition"
                >
                  Scan Another
                </button>
              </div>
            )}
          </div>
        </div>
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
        @keyframes progress {
            0% { width: 0%; margin-left: 0; }
            50% { width: 100%; margin-left: 0; }
            100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
