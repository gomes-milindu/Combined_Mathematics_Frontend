import NavBar from "./NavBar";

function Header({ color2, backgroundImage, heroTitle, heroSubtitle }) {
    return (
        <div>

            <div className="relative w-full h-[40vh] md:hidden overflow-hidden">

                {/* Navbar */}
                <div className="relative z-30">
                    <NavBar />
                </div>

                {/* Light purple layer */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#ede8f5] z-10"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 93%, 0 100%)",
                    }}
                />

                {/* Image layer */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center z-20"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 78%)",
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                >
                    <div className="w-full h-full bg-[#8A38F5] opacity-20" />
                </div>

            </div>

            {/* RED SECTION */}
            <div className="relative z-25 -mt-8 w-fit h-fit left-5">
                    <div className="text-[18px] font-medium text-[#53389e] drop-shadow-lg ">
                    {heroTitle || "Join Our Classes  &"}
                </div>
                <div className="text-[24px] font-bold text-[#53389e] m-1">
                    {heroSubtitle || "Online | Panadura | Kalutara"}
                </div>

            </div>

        </div>
    );
}

export default Header;