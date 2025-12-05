import he from "../../assets/Hero/hee.jpg"

function ResultCard(){
    return(
        <div className="w-[384px] h-[624px] bg-white border border-[#E9EAEB] rounded-xl flex flex-col justify-center items-center gap-8">
            <div className="w-[352px] h-[328px] rounded-xl bg-red-200 bg-cover bg-center" style={{backgroundImage: `url(${he})`}}></div>
            <div className="w-[352px] h-[232px] flex flex-col justify-center gap-1">
                <div className="text-[24px] font-semibold text-[#414651]">Nimthara Dinekshi</div>
                <div className="w-[295px] h-7 bg-amber-950"></div>
                <div className="text-[18px] font-normal text-[#717680]">Index: 123456</div>
                <div className="text-[18px] font-normal text-[#717680]">School: Royal College</div>
                <div className="ext-[18px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. text of the printing and typesetting industry.</div>
            </div>
        </div>
    )
}

export default ResultCard