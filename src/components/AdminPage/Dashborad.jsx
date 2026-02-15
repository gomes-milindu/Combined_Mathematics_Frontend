export function Dashboard() {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="w-[90%] h-50 bg-red-300 flex flex-row justify-around gap-5">
          <div className="bg-green-400 w-[20%]">
            <div className="text-center">Total Students</div>
            <div className="text-center">120</div>
          </div>
          <div className="bg-green-400 w-[20%]">
            <div className="text-center">Total Income</div>
            <div className="text-center">$1200</div>
          </div>
          <div className="bg-green-400 w-[20%]">
            <div className="text-center">Total Net Profit</div>
            <div className="text-center">$120</div>
          </div>
        </div>

        <div className="w-[90%] ">
          <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 text-sm text-center">
    
    <thead className="bg-gray-100">
      <tr>
        <th className="border px-4 py-2">Institute</th>
        <th className="border px-4 py-2">2028 T</th>
        <th className="border px-4 py-2">2029 T</th>
        <th className="border px-4 py-2">2030 T</th>
        <th className="border px-4 py-2">2030 R</th>
        <th className="border px-4 py-2">2030 P</th>
        <th className="border px-4 py-2">Total</th>
        <th className="border px-4 py-2">Net Profit</th>
      </tr>
    </thead>

    <tbody>
      <tr className="hover:bg-gray-50">
        <td className="border px-4 py-2">Samathwee</td>
        <td className="border px-4 py-2">2</td>
        <td className="border px-4 py-2">3</td>
        <td className="border px-4 py-2">10</td>
        <td className="border px-4 py-2">1</td>
        <td className="border px-4 py-2">10</td>
        <td className="border px-4 py-2 font-semibold">26</td>
        <td className="border px-4 py-2 text-green-600 font-semibold">
          $10000
        </td>
      </tr>
    </tbody>

  </table>
</div>
        </div>
      </div>
    </>
  );
}
