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
                {/* Social Icons - Small thin outlined circles matching Figma */}
                <div className="flex flex-row gap-2.5 mt-3">
                  {/* Facebook */}
                  <a href="#" className="w-[24px] h-[24px] rounded-full border border-white/70 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="white">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="#" className="w-[24px] h-[24px] rounded-full border border-white/70 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  {/* Twitter/X */}
                  <a href="#" className="w-[24px] h-[24px] rounded-full border border-white/70 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a href="#" className="w-[24px] h-[24px] rounded-full border border-white/70 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="white">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
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
