function Topic(props) {
    return (
        <div className="w-fit h-fit flex flex-col justify-center items-center px-4">
            <div className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold text-[#7F56D9] text-center">{props.topic}</div>
            <div className="text-[14px] md:text-[16px] lg:text-[18px] font-normal text-[#717680] text-center">{props.subtopic}</div>
        </div>
    )
}

export default Topic