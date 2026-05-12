import icon from '../../assets/Hero/icon.png'

function JoinClass({ title }) {
    return (
        <div className="w-full md:w-[312px] h-[76px] md:h-[98px] bg-white flex border border-purple-100 shadow-sm rounded-xl">
            <div className="w-full flex flex-row items-center gap-4 md:gap-6 px-4">
                <div className="h-[36px] w-[36px] md:h-[74px] md:w-[74px] bg-no-repeat bg-center bg-contain shrink-0" style={{ backgroundImage: `url(${icon})` }}></div>
                <div className="flex flex-col justify-center h-full pt-1">
                    <div className="text-[14px] md:text-[18px] font-semibold text-[#414651] leading-snug">{title || "Online Class"}</div>
                    <div className="text-[12px] md:text-[14px] font-normal text-[#717680] mt-[2px] leading-snug">Monday 8pm - 10pm</div>
                    <div className="text-[12px] md:text-[14px] font-normal text-[#717680] leading-snug">Via Zoom</div>
                </div>
            </div>
        </div>
    )
}

export default JoinClass