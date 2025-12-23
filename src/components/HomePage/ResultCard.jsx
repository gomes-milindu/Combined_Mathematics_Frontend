import he from "../../assets/Hero/hee.jpg"

function ResultCard(props){
    return(
        <div className="w-4/12 h-[624px] bg-white border border-[#E9EAEB] rounded-xl flex flex-col justify-center items-center gap-8 p-4">
            <div className="w-full h-[328px] rounded-xl bg-red-200 bg-cover bg-center" style={{backgroundImage: `url(${he})`}}></div>
            <div className="w-full h-[232px] flex flex-col justify-center gap-1">
                <div className="text-[1.5rem] font-semibold text-[#414651]">{props.name}</div>
                <div className="w-[295px] h-7 bg-amber-950"></div>
                <div className="text-[1.125rem] font-normal text-[#717680]">{props.index}</div>
                <div className="text-[1.125rem] font-normal text-[#717680]">{props.school}</div>
                <div className="ext-[18px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. text of the printing and typesetting industry.</div>
            </div>
        </div>
    )
}

export default ResultCard