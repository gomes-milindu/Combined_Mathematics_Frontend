// 

import he from "../assets/Hero/hee.jpg"

function Header({ color2, backgroundImage, heroTitle, heroSubtitle }) {
    return (
        <div className='w-full h-[60vh] md:h-[70vh] lg:h-screen relative'>
            <div className="w-full h-full bg-[#E9D7FE] bg-cover bg-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)' }} >

            </div>
            <div className={`w-full h-full absolute z-10 top-0 bg-cover bg-center ${backgroundImage}`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 60%)' }}>
                <div className="w-full h-full bg-[#8A38F5] opacity-20"></div>
            </div>

            {/* Hero text overlay */}
            {heroTitle && (
                <div className="absolute z-12 bottom-[32%] md:bottom-[20%] left-1/2 -translate-x-1/2 text-center w-[90%] md:w-auto">
                    <div className="text-[18px] md:text-[24px] lg:text-[30px] font-medium text-white drop-shadow-lg">
                        {heroTitle}
                    </div>
                    <div className="text-[24px] md:text-[32px] lg:text-[42px] font-bold text-white drop-shadow-lg">
                        {heroSubtitle}
                    </div>
                </div>
            )}
        </div>

    )
}

export default Header;