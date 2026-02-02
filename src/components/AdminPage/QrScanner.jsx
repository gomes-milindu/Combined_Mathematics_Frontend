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

  // 🔊 keep audio ref (comment usage only)
  const audioRef = useRef(new Audio(successSound));

  useEffect(() => {
    const qr = new Html5Qrcode("qr-reader");
    qrRef.current = qr;

    qr.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 260, height: 260 } },
      (decodedText) => {
        if (!runningRef.current) return;

        // 🔇 TEMPORARILY DISABLED SOUND
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
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-purple-100 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Scan Student QR Code
          </h2>
          <p className="text-sm text-gray-500">
            Align the QR code inside the box
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* CAMERA */}
          <div className="flex flex-col items-center">
            <div className="relative w-[300px] h-[300px] rounded-xl overflow-hidden border-2 border-purple-500">
              <div
                id="qr-reader"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Scan corners */}
              <span className="scan-corner tl" />
              <span className="scan-corner tr" />
              <span className="scan-corner bl" />
              <span className="scan-corner br" />

              {status === "scanning" && <div className="scan-line" />}
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {status === "scanning" ? "Scanning…" : "Scan completed"}
            </p>
          </div>

          {/* RESULT */}
          <div>
            {status === "scanning" && (
              <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-600">
                Waiting for QR code
              </div>
            )}

            {status === "success" && (
              <div className="success-card">
                <div className="checkmark">✓</div>

                <h3 className="text-lg font-semibold text-green-700 mt-2">
                  Scan Successful
                </h3>

                <p className="text-sm text-gray-600 mt-2">Student ID</p>

                <p className="text-xl font-bold text-gray-900 mt-1">{result}</p>

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
