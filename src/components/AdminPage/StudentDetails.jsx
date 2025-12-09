import axios from "axios";
import TopNav from "./TopNav";

export default function StudentDetails() {

    axios.get("http://localhost:8080/student/").then(
        (response)=>{
            console.log(response.data)
        }
    )
//   const students = [
//     {
//       studentId: "STU001",
//       firstName: "Kavindu",
//       lastName: "Perera",
//       email: "kavindu.perera@example.com",
//       phone: "0771234567",
//       password: "hashedpassword1",
//       course: ["Pure Maths", "Applied Maths"],
//       batch: "2025-A",
//       qrCode: "qrcode_STU001.png",
//       isActive: true,
//       address: "Colombo 05, Sri Lanka",
//       dateOfBirth: new Date("2006-04-15"),
//       guardianContact: "0714567890",
//     },

//     {
//       studentId: "STU002",
//       firstName: "Sachini",
//       lastName: "Fernando",
//       email: "sachini.fernando@example.com",
//       phone: "0789876543",
//       password: "hashedpassword2",
//       course: ["Applied Maths"],
//       batch: "2025-B",
//       qrCode: "qrcode_STU002.png",
//       isActive: true,
//       address: "Gampaha, Sri Lanka",
//       dateOfBirth: new Date("2005-11-22"),
//       guardianContact: "0751122334",
//     },

//     {
//       studentId: "STU003",
//       firstName: "Isuru",
//       lastName: "Gamage",
//       email: "isuru.gamage@example.com",
//       phone: "0765544332",
//       password: "hashedpassword3",
//       course: ["Pure Maths"],
//       batch: "2025-A",
//       qrCode: "qrcode_STU003.png",
//       isActive: false,
//       address: "Matara, Sri Lanka",
//       dateOfBirth: new Date("2006-01-10"),
//       guardianContact: "0723344556",
//     },

//     {
//       studentId: "STU004",
//       firstName: "Nethmi",
//       lastName: "Jayasinghe",
//       email: "nethmi.jaya@example.com",
//       phone: "0746789123",
//       password: "hashedpassword4",
//       course: ["Pure Maths", "Applied Maths"],
//       batch: "2025-C",
//       qrCode: "qrcode_STU004.png",
//       isActive: true,
//       address: "Kandy, Sri Lanka",
//       dateOfBirth: new Date("2005-09-05"),
//       guardianContact: "0709988776",
//     },

//     {
//       studentId: "STU005",
//       firstName: "Tharindu",
//       lastName: "Silva",
//       email: "tharindu.silva@example.com",
//       phone: "0712244668",
//       password: "hashedpassword5",
//       course: ["Applied Maths"],
//       batch: "2025-B",
//       qrCode: "qrcode_STU005.png",
//       isActive: true,
//       address: "Kurunegala, Sri Lanka",
//       dateOfBirth: new Date("2006-07-30"),
//       guardianContact: "0757788990",
//     },
//   ];

  return (
    <>
      
      
        <TopNav pageTitle="Student Details" />
        <div className="w-full h-[90vh] mt-64 flex justify-center items-center">
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
            </tbody>
          </table>
        </div>
     
    </>
  );
}
