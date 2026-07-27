import { useEffect, useState } from "react";
import api from "../../config/axios";
import { BookOpen, CreditCard, CalendarCheck, MessageSquare, CheckCircle2, XCircle, Mail, Phone, Building2, User, Calendar } from "lucide-react";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Decode JWT payload (base64url)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const studentId = payload.id;
      
      api.get(`/student/${studentId}`)
        .then((res) => {
          setStudent(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch student profile", err);
          setLoading(false);
        });
    } catch (e) {
      console.error("Failed to decode token", e);
      setLoading(false);
    }
  }, []);

  const PlaceholderCard = ({ title, icon: Icon, colorClass, bgClass }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-5 transition-transform hover:scale-[1.02] duration-300 relative overflow-hidden">
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-xl ${bgClass} flex items-center justify-center shadow-sm`}>
          <Icon className={`w-8 h-8 ${colorClass}`} />
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide uppercase">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Coming Soon
          </h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[1px]" />
    </div>
  );

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {value || "-"}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen">
      {student && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Info */}
            <div className="flex-1 space-y-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {student.firstName} {student.lastName}
                    </h2>
                    {student.isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <CheckCircle2 size={12} strokeWidth={3} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                        <XCircle size={12} strokeWidth={3} />
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-purple-600 dark:text-purple-400 font-mono font-medium mt-1 text-lg">
                    {student.studentId}
                  </p>
                  <p className="inline-block mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium">
                    Payment Type: {student.paymentType || "Full Payment"}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem icon={Mail} label="Email Address" value={student.email} />
                <InfoItem icon={Phone} label="Phone Number" value={student.phone} />
                <InfoItem icon={Building2} label="Institute" value={Array.isArray(student.institute) ? student.institute.join(', ') : student.institute || "Not Assigned"} />
                <InfoItem icon={User} label="Batch" value={student.batch} />
                <InfoItem icon={Calendar} label="Date of Birth" value={student.dateOfBirth ? student.dateOfBirth.substring(0, 10) : ""} />
              </div>
            </div>

            {/* Right: QR Code */}
            <div className="flex flex-col items-center justify-center lg:items-end">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center gap-4 w-full max-w-[240px]">
                <div className="bg-white p-3 rounded-xl shadow-sm w-full flex justify-center">
                  {student.qrCode ? (
                    <img
                      src={student.qrCode}
                      alt="Student QR Code"
                      className="w-40 h-40 object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  ) : (
                    <div className="w-40 h-40 bg-slate-100 flex items-center text-center justify-center rounded-lg text-slate-400 text-sm font-medium p-4">
                      No QR Code Available
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Student QR
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Scan for attendance & payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PlaceholderCard
          title="My Courses"
          icon={BookOpen}
          colorClass="text-blue-600"
          bgClass="bg-blue-50 dark:bg-blue-900/20"
        />
        <PlaceholderCard
          title="My Payments"
          icon={CreditCard}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <PlaceholderCard
          title="Attendance"
          icon={CalendarCheck}
          colorClass="text-amber-600"
          bgClass="bg-amber-50 dark:bg-amber-900/20"
        />
        <PlaceholderCard
          title="Messages"
          icon={MessageSquare}
          colorClass="text-pink-600"
          bgClass="bg-pink-50 dark:bg-pink-900/20"
        />
      </div>
    </div>
  );
}
