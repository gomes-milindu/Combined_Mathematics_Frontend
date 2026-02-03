// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Breadcrumb from "./BreadCrumb";

// export default function ViewStudent() {
//   const { id } = useParams(); // 👈 VERY IMPORTANT
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     axios
//       .get(`http://localhost:8080/student/getOne/${id}`)
//       .then((res) => {
//         setStudent(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, [id]);

//   if (!student) {
//     return <p className="p-8">Loading...</p>;
//   }

//   return (
//     <main className="w-full min-h-screen bg-gray-50 p-8">
//       {/* Header */}
//         <div className="mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-800">
//                 Student Info
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Enter student personal and academic details
//               </p>
//             </div>
//             <Breadcrumb />
//           </div>
//         </div>
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border">
        
//         <h1 className="text-2xl font-semibold mb-4">Student Details</h1>

//         <p>
//           <strong>Name:</strong> {student.firstName} {student.lastName}
//         </p>
//         <p>
//           <strong>Student Id:</strong> {student.studentId}
//         </p>
//         <p>
//           <strong>Email:</strong> {student.email}
//         </p>
//         <p>
//           <strong>Phone:</strong> {student.phone}
//         </p>
//         <p>
//           <strong>Date of Birth:</strong> {student.dateOfBirth}
//         </p>
//         <p>
//           <strong>Batch:</strong> {student.batch}
//         </p>
//         <p>
//           <strong>Course:</strong> {student.course}
//         </p>
//         <p>
//           <strong>Contact:</strong> {student.phone}
//         </p>
//         <p>
//           <strong>Status:</strong> {student.isActive ? "Active" : "Inactive"}
//         </p>
//       </div>
//     </main>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";

export default function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:8080/student/getOne/${id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!student) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <main className="w-full min-h-screen bg-[#faf9ff] p-8 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Student Info
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Student personal and academic details
              </p>
            </div>
            <Breadcrumb />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* LEFT: Student Details */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Student Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Detail label="Full Name" value={`${student.firstName} ${student.lastName}`} />
                <Detail label="Student ID" value={student.studentId} />
                <Detail label="Email" value={student.email} />
                <Detail label="Phone" value={student.phone} />
                <Detail label="Date of Birth" value={student.dateOfBirth} />
                <Detail label="Batch" value={student.batch} />
                <Detail label="Course" value={student.course} />
                <Detail
                  label="Status"
                  value={student.isActive ? "Active" : "Inactive"}
                  badge
                  active={student.isActive}
                />
              </div>
            </div>

            {/* RIGHT: QR Code Placeholder */}
            <div className="flex flex-col items-center justify-start border border-dashed border-gray-300 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Student QR Code
              </h3>

              {/* QR PLACEHOLDER */}
              <div className="w-40 h-40 bg-gray-100 flex items-center justify-center rounded-md">
                <span className="text-xs text-gray-500">
                  QR Code Here
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Use this QR code for quick student verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* Reusable detail row */
function Detail({ label, value, badge, active }) {
  return (
    <div>
      <p className="text-gray-500 text-xs mb-1">{label}</p>

      {badge ? (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
            active
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {value}
        </span>
      ) : (
        <p className="text-gray-800 font-medium">{value}</p>
      )}
    </div>
  );
}

