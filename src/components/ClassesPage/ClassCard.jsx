function ClassCard({title, description, time, category}){
    return(
        <>
            <div className="w-10/12 h-full bg-white border border-gray-400 p-4 flex flex-col justify-center items-start gap-8 rounded-2xl">

                <div className="w-full h-[206px] bg-green-300 rounded-xl" ></div>
                <div className="w-full flex flex-col gap-6">
                    <div className="text-[1.5rem]">{title}</div>
                    <div className="text-[1.25rem] text-[#A4A7AE]">{description}</div>
                    <div className="text-[1.25rem] text-[#A4A7AE]">{time}</div>
                    <div className="w-8/12 flex flex-row h-[45px]">
                        <button className="w-8/6 bg-purple-300 text-[1rem]">Enroll Now</button>
                        <button className="w-8/6 text-[1rem]">View Details</button>
                        
                    </div>

                     {/* Badge */}
                    <span className="text-sm text-purple-500">{category}</span>
                </div>
            </div>
        </>
    )
}

export default ClassCard