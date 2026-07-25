import Assets from '../../data/AssetLinks'

function Card() {
    return (
        <>
            {/* Mobile: Horizontal card (icon left, text right) */}
            <div className="md:hidden w-full h-auto bg-[#F9F5FF] border rounded-xl border-[#B692F6] flex flex-row items-center gap-4 py-3 px-4">
                <div className="w-[46px] h-[46px] bg-cover bg-no-repeat shrink-0" style={{ backgroundImage: `url(${Assets.Card_Icon})` }}></div>
                <div className="flex flex-col gap-1">
                    <div className="text-[15px] font-semibold text-[#414651]">Sell Online Courses</div>
                    <div className="text-[12px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. simply dummy text.</div>
                </div>
            </div>

            {/* Tablet & Desktop: Vertical card (icon top, text below) */}
            <div className="hidden md:flex w-full min-h-[200px] bg-[#F9F5FF] border rounded-xl border-[#B692F6] flex-col justify-center items-center gap-4 p-5">
                <div className="w-full">
                    <div className="w-[54px] h-[54px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Assets.Card_Icon})` }}></div>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <div className="text-[18px] lg:text-[20px] font-semibold text-[#414651]">Sell Online Courses</div>
                    <div className="text-[14px] lg:text-[16px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. simply dummy text.</div>
                </div>
            </div>
        </>
    )
}

export default Card