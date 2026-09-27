import Assets from '../../data/AssetLinks'

function JoinClass({ icon, title, schedule, location }) {
  return (
    <div className="w-full md:w-[312px] h-[76px] md:h-[98px] bg-white flex border border-purple-300 shadow-sm rounded-xl">
      <div className="w-full flex flex-row items-center gap-4 md:gap-6 px-4">
        <div className="h-[38px] w-[38px] md:h-[74px] md:w-[74px] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex flex-col justify-center h-full pt-1">
          <div className="text-[14px] md:text-[18px] font-semibold text-[#414651] leading-snug">
            {title || "Online Class"}
          </div>
          <div className="text-[12px] md:text-[14px] font-normal text-[#717680] mt-[2px] leading-snug">
            {schedule || "Not Defined"}
          </div>
          <div className="text-[12px] md:text-[14px] font-normal text-[#717680] leading-snug">
            {location || "Location Not Defined"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinClass;