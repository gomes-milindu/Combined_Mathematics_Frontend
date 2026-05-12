import he from "../assets/Hero/hee.jpg"

function Header({ color2, backgroundImage, heroTitle, heroSubtitle }) {
    return (
        <div className='w-full h-[35vh] md:h-[70vh] lg:h-screen relative'>
            <div className="w-full h-full bg-[#E9D7FE] bg-cover bg-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)' }} >

            </div>
            <div className={`w-full h-full absolute z-10 top-0 bg-cover bg-center ${backgroundImage}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 75%)' }}>
                <div className="w-full h-full bg-[#8A38F5] opacity-20"></div>
            </div>

            {/* Mobile hero text - centered white on image */}
            <div className="absolute z-12 top-[30%] left-1/2 -translate-x-1/2 text-center w-[90%] md:hidden">
                <div className="text-[16px] font-medium text-white drop-shadow-lg">
                    Join Our Classes &
                </div>
                <div className="text-[24px] font-bold text-white drop-shadow-lg mt-1">
                    Online | Colombo | Kandy
                </div>
            </div>

            {/* Desktop/Tablet hero text overlay */}
            {heroTitle && (
                <div className="absolute z-12 bottom-[20%] left-1/2 -translate-x-1/2 text-center w-auto hidden md:block">
                    <div className="md:text-[24px] lg:text-[30px] font-medium text-white drop-shadow-lg">
                        {heroTitle}
                    </div>
                    <div className="md:text-[32px] lg:text-[42px] font-bold text-white drop-shadow-lg">
                        {heroSubtitle}
                    </div>
                </div>
            )}
        </div>

    )
}

export default Header;