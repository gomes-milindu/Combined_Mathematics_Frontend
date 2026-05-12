import he from "../../assets/Hero/hee.jpg"
import student from "../../assets/Images/student.png"


function ResultCard(props) {

  return (
    <div className="w-full md:w-4/12 h-auto bg-white border border-[#E9EAEB] rounded-xl flex flex-col items-center p-3 gap-4">
      {/* IMAGE */}
      <div className="w-full h-[160px] md:h-[200px] lg:h-[240px] rounded-xl bg-red-200 bg-cover bg-center" style={{ backgroundImage: `url(${student})` }}></div>
      
      {/* CONTENT */}
      <div className="w-full flex flex-col gap-2 px-1">
        {/* TITLE */}
        <div className="text-[16px] md:text-[20px] font-semibold text-[#414651]">{props.name}</div>

        {/* BADGES ROW */}
        <div className="w-full flex items-center gap-3">
          {/* Avatar group */}
          <div className="flex gap-[6px]">
            <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center bg-[#fcf2fa] text-[#c21574] text-[11px] font-semibold shadow-sm">
              A
            </div>
            <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center bg-[#fcf2fa] text-[#c21574] text-[11px] font-semibold shadow-sm">
              A
            </div>
            <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center bg-[#fcf2fa] text-[#c21574] text-[11px] font-semibold shadow-sm">
              A
            </div>
          </div>

          {/* Badge label */}
          <div className="bg-[#f3f2ff] px-[10px] h-[26px] rounded-lg flex items-center text-[#5925db] text-[11px] md:text-[12px] font-medium whitespace-nowrap">
            District 1st - 2023 A/L
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-[2px] mt-1">
          <div className="text-[13px] md:text-[14px] font-normal text-[#717680]">{props.index}</div>
          <div className="text-[13px] md:text-[14px] font-normal text-[#717680]">{props.school}</div>
        </div>
        
        {/* DESCRIPTION */}
        <div className="text-[12px] md:text-[13px] font-normal text-[#717680] leading-[20px] mt-1 mb-1">
          simply dummy text of the printing and typesetting industry. text of the printing and typesetting industry.
        </div>
      </div>
    </div>
  )
}

export default ResultCard