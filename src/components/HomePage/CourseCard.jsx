function CourseCard(props){
    return(
        <div className="w-[384px] h-[605px] bg-white border border-gray-300 rounded-xl gap-10 flex flex-col justify-center items-center ">
     
            <div className="w-[351px] h-[237px] bg-gray-900"></div>

                {/* Content Section */}
                <div className="w-[352px] h-[296px] flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            {/* Title */}
                            <h2 className="w-[342px] h-8 text-[24px] font-semibold text-gray-700">
                            {props.title}
                            </h2>
                            {/* Tags */}
                            <div className="w-[292px] h-7 flex gap-2">
                            <span className="w-[178px] h-7 bg-[#f4f3ff] flex-row flex items-center justify-center gap-2 text-purple-700 text-[14px] rounded-2xl">
                                <span className="text-[14px]">•</span>
                                {props.category}
                            </span>
                            <span className="w-[102px] h-7 bg-[#ebfcf2] flex  justify-center items-center gap-2 text-sm text-[#027A48] rounded-2xl">
                                <span className="">•</span>
                                LKR {props.price}
                            </span>
                            </div>
                            {/* Description */}
                            <p className="w-[352px] h-[140px] text-gray-500 text-[18px] leading-relaxed mb-6 font-400">
                            simply dummy text of the printing and typesetting industry. simply dummy text.simply dummy text of the printing and typesetting industry. simply dummy text.
                            </p>
                        </div>

                        {/* View Details Button */}
                        <button className="w-[352px] h-10 bg-purple-200 text-[#6941C6] text-[14px] rounded border border-[#F9F5FF]">
                        View Details
                        </button>
                    </div>
    </div>
    )
}

export default CourseCard