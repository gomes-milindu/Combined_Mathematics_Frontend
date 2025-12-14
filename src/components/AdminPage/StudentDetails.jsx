import axios from "axios";
import TopNav from "./TopNav";
import { useEffect, useState } from "react";


export default function StudentDetails() {
  const [numStudent, setNumStudent] = useState([]);

  useEffect( ()=>{
    axios.get("http://localhost:8080/student/").then(
      (response)=>{
          console.log(response.data)
          setNumStudent(response.data)
      }
  )
   
  }  , [])
  

  return (
    <>
      <TopNav pageTitle="Student Details" />
      {/* <div className="w-[80%] h-[90vh] mt-64 flex justify-center items-center">
          <table className="gap-10 w-full border-collapse rounded- overflow-hidden shadow-md">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Batch</th>
                <th>Status</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {/* {students.map((data) => {
                return (
                  <tr>
                    <td>{data.studentId}</td>
                    <td>{data.firstName}</td>
                    <td>{data.batch}</td>
                    <td>{data.isActive?"Active":"Failed"}</td>
                    <td>{data.guardianContact}</td>
                  </tr>
                );
              })} */}
      {/*</tbody>
          </table>
        </div> */}

      {/* table card (you may adjust max-w if you want a wider/narrower table) */}
      {/* keep the outer parent div you already have */}
      <div className="w-full h-full flex justify-center items-center">
        {/* table card (you may adjust max-w if you want a wider/narrower table) */}
        <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-white">
          {/* card header */}
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Students</h2>
            <span className="text-sm text-gray-500">Total:</span>
          </div>

          {/* table wrapper (gives horizontal scroll on small screens) */}
          <div className="overflow-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                    Batch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                    Contact
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {numStudent.map((item) => {
                  return (
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.batch ?? item.Batch ?? item.batchName ?? "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${item.isActive?"bg-green-100 text-green-800":"bg-orange-200 text-orange-600"}`}>
                          {item.isActive?"Active":"Deactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.guardianContact ?? item.phone ?? item.contact ?? item.guardianPhone ?? "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
