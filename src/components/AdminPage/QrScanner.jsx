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
        }, 800);
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
    <div className="p-6">
      <div className="w-full max-w-6xl rounded-2xl border border-purple-100 bg-white shadow-[0_8px_30px_rgba(88,28,135,0.08)] overflow-hidden">
        <div className="px-8 py-6 border-b border-purple-50 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
                QR Scanner
              </p>
              <h2 className="text-2xl font-semibold text-slate-800">
                Scan Student QR Code
              </h2>
              <p className="text-sm text-slate-500">
                Keep the code centered inside the frame.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm text-purple-700">
              <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
              {status === "scanning" ? "Live scanning" : "Scan completed"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start p-8">
          {/* CAMERA */}
          <div className="flex flex-col items-center">
            <div className="relative w-[320px] h-[320px] rounded-2xl overflow-hidden border-2 border-purple-500 bg-white shadow-[0_0_0_10px_rgba(124,58,237,0.08)]">
              <div
                id="qr-reader"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-purple-100/20 pointer-events-none" />

              {/* Scan corners */}
              <span className="scan-corner tl" />
              <span className="scan-corner tr" />
              <span className="scan-corner bl" />
              <span className="scan-corner br" />

              {status === "scanning" && (
                <>
                  <div className="scan-line" />
                  <div className="absolute inset-0 ring-1 ring-purple-400/40 animate-pulse" />
                </>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {status === "scanning"
                ? "Hold steady while we read the code."
                : "Scan completed successfully."}
            </p>
          </div>

          {/* RESULT */}
          <div>
            {status === "scanning" && (
              <div className="rounded-2xl border border-dashed border-purple-200 bg-purple-50/40 p-6">
                <p className="text-sm font-semibold text-slate-700">
                  Waiting for QR code
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Once detected, you will be redirected automatically.
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold">
                  OK
                </div>

                <h3 className="text-lg font-semibold text-slate-800 mt-3">
                  Scan Successful
                </h3>

                <p className="text-sm text-slate-500 mt-2">Student ID</p>

                <p className="text-xl font-bold text-slate-900 mt-1">{result}</p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
                >
                  Scan Another Student
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
