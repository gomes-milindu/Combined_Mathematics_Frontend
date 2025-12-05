import icon from '../../assets/Hero/icon.png'

function JoinClass(){
    return(
        <div className="w-[312px] h-[98px] bg-white flex border rounded-xl border-[#B692F6]">
            <div className="w-full flex flex-row justify-center items-center gap-6">
                <div className="h-[74px] w-[74px] bg-no-repeat bg-center" style={{backgroundImage: `url(${icon})`}}></div>
                <div className="h-[74px] w-44">
                    <div className="text-[18px] font-semibold text-[#414651]">Online Class</div>
                    <div className="text-[14px] font-normal text-[#717680]">Monday 8pm - 10pm</div>
                    <div className="text-[14px] font-normal text-[#717680]">Via Zoom</div>
                </div>
            </div>
        </div>
    )
}

export default JoinClass