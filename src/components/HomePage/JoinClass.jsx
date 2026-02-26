import icon from '../../assets/Hero/icon.png'

function JoinClass() {
    return (
        <div className="w-full md:w-[312px] h-[90px] md:h-[98px] bg-white flex border rounded-xl border-[#B692F6]">
            <div className="w-full flex flex-row justify-center items-center gap-4 md:gap-6 px-4">
                <div className="h-[60px] w-[60px] md:h-[74px] md:w-[74px] bg-no-repeat bg-center bg-contain shrink-0" style={{ backgroundImage: `url(${icon})` }}></div>
                <div className="h-auto w-full md:w-44">
                    <div className="text-[16px] md:text-[18px] font-semibold text-[#414651]">Online Class</div>
                    <div className="text-[13px] md:text-[14px] font-normal text-[#717680]">Monday 8pm - 10pm</div>
                    <div className="text-[13px] md:text-[14px] font-normal text-[#717680]">Via Zoom</div>
                </div>
            </div>
        </div>
    )
}

export default JoinClass