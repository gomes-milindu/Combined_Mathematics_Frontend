// function CourseCard({ title, category, price, image }) {
//   return (
//     <div className="w-full h-125 border border-gray-200 rounded-2xl p-4 flex flex-col gap-4">

//       {/* IMAGE */}
//       <div className="w-full h-[180px] sm:h-[200px] lg:h-[220px] rounded-xl overflow-hidden bg-yellow-500">
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* CONTENT */}
//       <div className="flex flex-col gap-3">

//         {/* TITLE */}
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//           {title}
//         </h2>

//         {/* TAGS */}
//         <div className="flex gap-2 flex-wrap">
//           <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full flex items-center gap-2">
//             <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
//             {category}
//           </span>

//           <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full flex items-center gap-2">
//             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//             LKR {price}
//           </span>
//         </div>

//         {/* DESCRIPTION */}
//         <p className="text-lg text-gray-500 leading-relaxed">
//           simply dummy text of the printing and typesetting industry. simply dummy
//           text. simply dummy text of the printing and typesetting industry.simply dummy text of the printing and typesetting industry.
//         </p>

//         {/* BUTTON */}
//         <button className="mt-4 w-full py-2 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg hover:bg-purple-100 transition">
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CourseCard;

function CourseCard({ title, category, price }) {
  return (
    <div className="w-full h-auto border border-gray-200 rounded-xl p-3 flex flex-col gap-3 bg-white">
      {/* IMAGE */}
      <div className="w-full h-[140px] sm:h-[160px] lg:h-[180px] rounded-xl overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 px-1 pb-2">
        {/* TITLE */}
        <h2 className="text-[16px] md:text-[18px] font-semibold text-[#414651]">
          {title}
        </h2>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap mt-1">
          <span className="px-[10px] py-[4px] bg-[#f3f2ff] text-[#5925db] text-[11px] rounded-full flex items-center gap-[6px] font-medium">
            <span className="w-1.5 h-1.5 bg-[#5925db] rounded-full"></span>
            {category}
          </span>

          <span className="px-[10px] py-[4px] bg-[#ecfdf3] text-[#027a48] text-[11px] rounded-full flex items-center gap-[6px] font-medium">
            <span className="w-1.5 h-1.5 bg-[#12b76a] rounded-full"></span>
            LKR {price}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-[12px] md:text-[13px] text-[#717680] leading-[20px] mt-2">
          simply dummy text of the printing and typesetting industry. simply dummy
          text. simply dummy text of the printing and typesetting industry.
        </p>
      </div>
    </div>
  );
}

export default CourseCard;
