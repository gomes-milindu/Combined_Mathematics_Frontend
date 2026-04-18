// import he from "../../assets/Hero/hee.jpg"
// import student from "../../assets/Images/Student.png";


// function ResultCard(props){
    
//     return(
//         <div className="w-4/12 h-[624px] bg-white border border-[#E9EAEB] rounded-xl flex flex-col justify-center items-center gap-8 p-4">
//             <div className="w-full h-[328px] rounded-xl bg-red-200 bg-cover bg-center" style={{backgroundImage: `url(${student})`}}></div>
//             <div className="w-full h-[232px] flex flex-col justify-center gap-1">
//                 <div className="text-[1.5rem] font-semibold text-[#414651]">{props.name}</div>
//                 {/* <div className="w-[300px] h-7 flex flex-row gap-10 mt-2">
//                     <div className="">AAA</div>
//                     <div className="flex justify-center items-center">
//                         <div className="bg-[#f3f2ff] rounded-lg w-[180px] flex justify-center text-[#5925db]">District 1st - 2023 A/L</div>
//                     </div>
//                 </div> */}

//              <div className="w-[300px] h-7 flex items-center justify-between mt-2">

//   {/* Avatar group with spacing */}
//   <div className="flex gap-2">
//     <div className="w-7 h-7 rounded-full flex items-center justify-center
//                     bg-[#fcf2fa] text-[#c21574] text-xs font-semibold
//                      shadow-sm">
//       A
//     </div>

//     <div className="w-7 h-7 rounded-full flex items-center justify-center
//                     bg-[#fcf2fa] text-[#c21574] text-xs font-semibold
//                      shadow-sm">
//       A
//     </div>

//     <div className="w-7 h-7 rounded-full flex items-center justify-center
//                     bg-[#fcf2fa] text-[#c21574] text-xs font-semibold
//                      shadow-sm">
//       A
//     </div>
//   </div>

//   {/* Badge label */}
//   <div className="bg-[#f3f2ff] px-3 h-7 rounded-lg flex items-center
//                   text-[#5925db] text-sm font-medium whitespace-nowrap">
//     District 1st - 2023 A/L
//   </div>

// </div>

//                 <div className="text-[1.125rem] font-normal text-[#717680] mt-2">{props.index}</div>
//                 <div className="text-[1.125rem] font-normal text-[#717680]">{props.school}</div>
//                 <div className="ext-[18px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. text of the printing and typesetting industry.</div>
//             </div>
//         </div>
//     )
// }

// export default ResultCard






function ResultCard(props) {

  return (
    <div className="w-full md:w-4/12 h-auto bg-white border border-[#E9EAEB] rounded-xl flex flex-col justify-center items-center gap-6 md:gap-8 p-4">
      <div className="w-full h-[220px] md:h-[280px] lg:h-[328px] rounded-xl bg-red-200 bg-cover bg-center" style={{ backgroundImage: `url('https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/Student.png')` }}></div>
      <div className="w-full flex flex-col justify-center gap-1">
        <div className="text-[1.2rem] md:text-[1.5rem] font-semibold text-[#414651]">{props.name}</div>

        <div className="w-full md:w-[300px] h-7 flex items-center justify-between mt-2">

          {/* Avatar group with spacing */}
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center
                    bg-[#fcf2fa] text-[#c21574] text-xs font-semibold
                     shadow-sm">
              A
            </div>

            <div className="w-7 h-7 rounded-full flex items-center justify-center
                    bg-[#fcf2fa] text-[#c21574] text-xs font-semibold
                     shadow-sm">
              A
            </div>

            <div className="w-7 h-7 rounded-full flex items-center justify-center
                    bg-[#fcf2fa] text-[#c21574] text-xs font-semibold
                     shadow-sm">
              A
            </div>
          </div>

          {/* Badge label */}
          <div className="bg-[#f3f2ff] px-3 h-7 rounded-lg flex items-center
                  text-[#5925db] text-xs md:text-sm font-medium whitespace-nowrap">
            District 1st - 2023 A/L
          </div>

        </div>

        <div className="text-[0.95rem] md:text-[1.125rem] font-normal text-[#717680] mt-2">{props.index}</div>
        <div className="text-[0.95rem] md:text-[1.125rem] font-normal text-[#717680]">{props.school}</div>
        <div className="text-[13px] md:text-[16px] lg:text-[18px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. text of the printing and typesetting industry.</div>
      </div>
    </div>
  )
}

export default ResultCard