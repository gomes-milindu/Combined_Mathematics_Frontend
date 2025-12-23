//

import React, { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminStudentRegister from "./AdminStudentRegister";

export default function StudentDetails() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/student/").then((response) => {
      console.log(response.data);
      setStudents(response.data);
    });
  }, []);

  return (
    <main className="w-full min-h-screen bg-slate-50 flex justify-center py-10">
      <div className="">
        <table>
          <thead>
            <tr>
              <th>Student Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              
            </tr>
          </thead>

          <tbody>

            {students.map((items)=>(

              <tr>
              <td>{items.studentId}</td>
              <td>{items.firstName}</td>
              <td>{items.lastName}</td>
              <td>{items.email}</td>
              
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </main>
  );
}
