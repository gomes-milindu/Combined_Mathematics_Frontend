function Topic(props){
    return(
        <div className="w-fit h-fit  flex flex-col justify-center items-center">
            <div className="text-[24px] md:text-[36px] font-semibold text-[#7F56D9]">{props.topic}</div>
            <div className="text-[16px] md:text-[18px] font-normal text-[#717680]">{props.subtopic}</div>
        </div>
    )
}

export default Topic