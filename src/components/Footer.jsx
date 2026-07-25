import Assets from "../data/AssetLinks";

function Footer() {
  return (
    <>
      <section className="relative w-full h-auto">
        {/* Background decorative layers */}
        <div
          className="w-full h-[50px] md:h-[115px] bg-cover bg-no-repeat relative"
          style={{ backgroundImage: `url(${Assets.Footer_Rect6})` }}
        >
          <div
            className="w-full h-full bg-cover absolute z-1 bg-no-repeat right-0 top-0"
            style={{ backgroundImage: `url(${Assets.Footer_Rect7})` }}
          ></div>
        </div>

        {/* Main footer content */}
        <div className="w-full bg-gray-900">
          {/* ===== MOBILE LAYOUT (< 768px) ===== */}
          <div className="block md:hidden px-6 py-8">
            {/* Logo + Description - centered */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="w-[200px] h-[100px] bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${Assets.Footer_Name})` }}
              ></div>
              <div className="text-white text-[12px] font-light text-center mt-2 px-4 leading-5">
                At Tuition Master, we make learning simple, fun, and
                effective. Our goal is to help every student understand
                better, perform higher, and reach their full potential.and
                reach their full potential.
              </div>
            </div>

            {/* Contact Us + Quick Links - side by side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Contact Us */}
              <div className="flex flex-col text-white gap-3">
                <div className="text-[16px] text-purple-300 font-semibold">Contact Us</div>
                <div className="flex flex-col gap-2 text-[11px]">
                  <div className="flex flex-row items-center gap-2">
                    <div
                      className="w-[18px] h-[15px] bg-contain bg-no-repeat bg-center shrink-0"
                      style={{ backgroundImage: `url(${Assets.Footer_Mail})` }}
                    ></div>
                    <div>info@mathteacher.com</div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div
                      className="w-[18px] h-[15px] bg-contain bg-no-repeat bg-center shrink-0"
                      style={{ backgroundImage: `url(${Assets.Footer_Call})` }}
                    ></div>
                    <div>+94 78 778 78 456</div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div
                      className="w-[18px] h-[15px] bg-contain bg-no-repeat bg-center shrink-0"
                      style={{ backgroundImage: `url(${Assets.Footer_Map})` }}
                    ></div>
                    <div>MathsKing, Colombo 12</div>
                  </div>
                </div>
                {/* Social Icons */}
                <div className="flex flex-row gap-3 mt-3">
                  <div
                    className="w-[22px] h-[22px] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url('https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/fb.png')` }}
                  ></div>
                  <div
                    className="w-[22px] h-[22px] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url('https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/insta.png')` }}
                  ></div>
                  <div
                    className="w-[22px] h-[22px] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url('https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/youtube.png')` }}
                  ></div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col text-white gap-3">
                <div className="text-[16px] text-purple-300 font-semibold">Contact Us</div>
                <div className="flex flex-col gap-2 text-[12px]">
                  <div>Home</div>
                  <div>Classes</div>
                  <div>Courses</div>
                  <div>About Us</div>
                  <div>Contact Us</div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== TABLET LAYOUT (768px - 1023px) ===== */}
          <div className="hidden md:block lg:hidden px-8 py-10">
            <div className="grid grid-cols-3 gap-6">
              {/* Logo + Description */}
              <div className="flex flex-col items-center">
                <div
                  className="w-[180px] h-[90px] bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url(${Assets.Footer_Name})` }}
                ></div>
                <div className="text-white text-[11px] font-light text-center mt-2 leading-5 px-2">
                  At Tuition Master, we make learning simple, fun, and
                  effective. Our goal is to help every student understand
                  better, perform higher, and reach their full potential.
                </div>
                {/* Social Icons - under description on tablet */}
                <div className="flex flex-row gap-3 mt-4">
                  <div
                    className="w-[24px] h-[24px] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${Assets.Footer_Fb})` }}
                  ></div>
                  <div
                    className="w-[24px] h-[24px] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${Assets.Footer_Insta})` }}
                  ></div>
                  <div
                    className="w-[24px] h-[24px] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${Assets.Footer_Youtube})` }}
                  ></div>
                </div>
              </div>

              {/* Contact Us */}
              <div className="flex flex-col text-white gap-4 justify-center">
                <div className="text-[18px] text-purple-300 font-semibold">Contact Us</div>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div className="flex flex-row items-center gap-3">
                    <div
                      className="w-[20px] h-[18px] bg-contain bg-no-repeat bg-center shrink-0"
                      style={{ backgroundImage: `url(${Assets.Footer_Mail})` }}
                    ></div>
                    <div>info@mathteacher.com</div>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div
                      className="w-[20px] h-[18px] bg-contain bg-no-repeat bg-center shrink-0"
                      style={{ backgroundImage: `url(${Assets.Footer_Call})` }}
                    ></div>
                    <div>+94 78 778 78 456</div>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <div
                      className="w-[20px] h-[18px] bg-contain bg-no-repeat bg-center shrink-0"
                      style={{ backgroundImage: `url(${Assets.Footer_Map})` }}
                    ></div>
                    <div>MathsKing, Colombo 12</div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col text-white gap-4 justify-center">
                <div className="text-[18px] text-purple-300 font-semibold">Quick Links</div>
                <div className="flex flex-col gap-2 text-[13px]">
                  <div>Home</div>
                  <div>Classes</div>
                  <div>Courses</div>
                  <div>About</div>
                  <div>Contact</div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== DESKTOP LAYOUT (≥ 1024px) ===== */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-5 h-[415px] place-items-center justify-items-center">
              {/* Logo + Description */}
              <div className="w-2/3 h-[90%]">
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <div
                    className="w-full h-[200px] bg-contain bg-no-repeat bg-center scale-75"
                    style={{ backgroundImage: `url(${Assets.Footer_Name})` }}
                  ></div>
                  <div className="w-[70%] h-[100px] text-white text-[13px] font-light text-center">
                    At Tuition Master, we make learning simple, fun, and
                    effective. Our goal is to help every student understand
                    better, perform higher, and reach their full potential.
                  </div>
                </div>
              </div>

              {/* Contact Us */}
              <div className="w-2/3 h-[90%]">
                <div className="w-full h-full flex flex-col justify-center items-left text-white gap-5">
                  <div className="text-[24px] text-purple-300">Contact Us</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-center items-center gap-3">
                      <div
                        className="w-[25px] h-[20px] bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${Assets.Footer_Mail})` }}
                      ></div>
                      <div className="w-full">info@mathteacher.com</div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-3">
                      <div
                        className="w-[25px] h-[20px] bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${Assets.Footer_Call})` }}
                      ></div>
                      <div className="w-full">+94 78 778 78 456</div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-3">
                      <div
                        className="w-[25px] h-[20px] bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${Assets.Footer_Map})` }}
                      ></div>
                      <div className="w-full">MathsKing, Colombo 12</div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 mt-5">
                    <div
                      className="w-[28px] h-[25px] bg-contain bg-no-repeat bg-center"
                      style={{ backgroundImage: `url(${Assets.Footer_Fb})` }}
                    ></div>
                    <div
                      className="w-[28px] h-[25px] bg-contain bg-no-repeat bg-center"
                      style={{ backgroundImage: `url(${Assets.Footer_Insta})` }}
                    ></div>
                    <div
                      className="w-[28px] h-[25px] bg-contain bg-no-repeat bg-center"
                      style={{ backgroundImage: `url(${Assets.Footer_Youtube})` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="w-2/3 h-[90%]">
                <div className="w-full h-full flex flex-col justify-center items-left text-white gap-5">
                  <div className="text-2xl text-purple-300">Quick Links</div>
                  <div className="flex flex-col gap-3 text-[14px]">
                    <div>Home</div>
                    <div>Classes</div>
                    <div>Courses</div>
                    <div>About us</div>
                    <div>Contact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom text - all breakpoints */}
          <div className="w-full flex justify-center items-center bg-gray-900">
            <div className="w-[85%] text-[#8d9199] flex items-center justify-center border-t-1 border-amber-10 p-3 md:p-5 text-[11px] md:text-[14px]">
              Implement by Threads Software Solutions
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;

