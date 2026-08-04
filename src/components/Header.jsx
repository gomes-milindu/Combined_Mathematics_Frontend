import NavBar from "./NavBar";
import GlassBox from "./HomePage/GlassBox";

function Header({
  color2,
  backgroundImage,
  heroTitle,
  heroSubtitle,
  showHomeHero = false,
}) {
  return (
    <div>


    {/*Mobile View*/}
    <div className="block lg:hidden">
        <div className="relative w-full h-[40vh] md:hidden overflow-hidden">
          {/* Navbar */}
          <div className="relative z-30">
            <NavBar />
          </div>

          {/* Light purple layer */}
          <div
            className="absolute inset-0 w-full h-full bg-[#ede8f5] z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 93%, 0 99%)",
            }}
          />

          {/* Image layer */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center z-20"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 93%, 0 73%)",
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <div className="w-full h-full bg-[#8A38F5] opacity-20" />
          </div>
        </div>

        {showHomeHero && (
          <div className="relative z-25 -mt-8 w-fit h-fit left-5">
            <div className="text-[18px] font-medium text-[#53389e] drop-shadow-lg">
              {heroTitle || "----------"}
            </div>

            <div className="text-[24px] font-bold text-[#53389e] m-1">
              {heroSubtitle || "--------"}
            </div>
          </div>
        )}
    </div>


      {/*Desktop View*/}

      <div className="hidden lg:block">
        <div className="relative w-full h-[90vh] overflow-hidden">
          {/* Navbar */}
          <div className="relative z-30">
            <GlassBox />
          </div>

          {/* Light purple layer */}
          <div
            className="absolute inset-0 w-full h-full bg-[#ede8f5] z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
            }}
          />

          {/* Image layer */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center z-20"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 98%, 0 65%)",
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <div className="w-full h-full bg-[#8A38F5] opacity-20" />
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Header;
