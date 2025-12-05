import icon from '../../assets/Hero/icon.png'

function Card(){
    return(
        <div className="w-[383px] h-[200px] bg-[#F9F5FF] border rounded-xl border-[#B692F6] flex flex-col justify-center items-center gap-4">
            <div className="w-[351px]">
                <div className="w-[54px] h-[54px] bg-cover bg-no-repeat" style={{backgroundImage: `url(${icon})`}}></div>
            </div>
            <div className="w-[351px] h-[82px] flex flex-col gap-1">
                <div className="text-[20px] font-[600px] text-[#414651]">Sell Online Courses</div>
                <div className="text-[16px] font-[400px] text-[#717680]">simply dummy text of the printing and typesetting industry. simply dummy text.</div>
            </div>
        </div>
    )
}

export default Card