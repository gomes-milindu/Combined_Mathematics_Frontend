import axios from "axios";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [countStudent, setCountStudent] = useState();

  useEffect(() => {
    axios.get("http://localhost:8080/dashboard/").then((res) => {
      setCountStudent(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="">Total Students: </div>
        <div className="text-2xl font-bold">{countStudent?.totalStudents}</div>

        <div className="">Total Income: </div>
        <div className="text-2xl font-bold">{countStudent?.totalIncome}</div>

        <div className="">Net Profit: </div>
        <div className="text-2xl font-bold">{countStudent?.netProfit}</div>
      </div>

      <div className="">
        <table>
          <thead>
            <th>Institue</th>
            <th>Batch</th>
            <th>Total</th>
            <th>Revenue</th>
          </thead>

          <tbody>
            {countStudent?.activeCounts?.map((item, index) => (
              <tr key={index}>
                <td>{item.institute}</td>
                <td>{item.batch}</td>
                <td>{item.totalStudents}</td>
                <td>5000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
