import Assets from "../data/AssetLinks";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { quickLinks } from "../data/Data";
function Footer() {
  const socials = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Twitter, href: "#" },
  ];
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
            {/* Logo + Description */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="w-[200px] h-[100px] bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${Assets.Footer_Name})` }}
              ></div>

              <div className="text-white text-[12px] font-light text-center mt-2 px-4 leading-5">
                At Tuition Master, we make learning simple, fun, and effective.
                Our goal is to help every student understand better, perform
                higher, and reach their full potential.
              </div>
            </div>

            {/* Contact Us + Quick Links */}
            <div className="grid grid-cols-2 place-items-center gap-5">
              {/* Contact Us */}
              <div className="flex flex-col text-white gap-3">
                <div className="text-[16px] text-purple-300 font-semibold">
                  Contact Us
                </div>

                <div className="flex flex-col gap-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Mail size={14} color="#FFFFFF" strokeWidth={1.8} />
                    <span>info@mathteacher.com</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={14} color="#FFFFFF" strokeWidth={1.8} />
                    <span>+94 78 778 78 456</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={14} color="#FFFFFF" strokeWidth={1.8} />
                    <span>MathsKing, Colombo 12</span>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-2.5 mt-3">
                  {socials.map(({ icon: Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#34245a] hover:bg-purple-500/20 transition"
                    >
                      <Icon size={16} color="#FFFFFF" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col text-white gap-3 w-fit">
                <div className="text-[16px] text-purple-300 font-semibold">
                  Quick Links
                </div>

                <div className="flex flex-col gap-2 text-[12px]">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.path}
                      className="hover:text-purple-300 transition"
                    >
                      {link.name}
                    </a>
                  ))}
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
                  {socials.map(({ icon: Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      className="w-11 h-11 flex items-center justify-center rounded-full border border-purple-400/40 hover:border-purple-400 hover:bg-purple-500/10 transition"
                    >
                      <Icon size={18} color="#B794F4" strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Us */}
              <div className="flex flex-col text-white gap-4 justify-center">
                <div className="text-[18px] text-purple-300 font-semibold">
                  Contact Us
                </div>
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
                <div className="text-[18px] text-purple-300 font-semibold">
                  Quick Links
                </div>
                <div className="flex flex-col gap-2 text-[13px]">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.path}
                      className="hover:text-purple-300 transition cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ))}
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
                        style={{
                          backgroundImage: `url(${Assets.Footer_Mail})`,
                        }}
                      ></div>
                      <div className="w-full">info@mathteacher.com</div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-3">
                      <div
                        className="w-[25px] h-[20px] bg-contain bg-no-repeat bg-center"
                        style={{
                          backgroundImage: `url(${Assets.Footer_Call})`,
                        }}
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
                      style={{
                        backgroundImage: `url(${Assets.Footer_Youtube})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="w-2/3 h-[90%]">
                <div className="w-full h-full flex flex-col justify-center items-left text-white gap-5">
                  <div className="text-2xl text-purple-300">Quick Links</div>
                  <div className="flex flex-col gap-3 text-[14px]">
                    {quickLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.path}
                        className="hover:text-purple-300 transition cursor-pointer"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom text - all breakpoints */}
          <div className="w-full flex justify-center items-center bg-gray-900">
            <div className="w-[85%] text-[#8d9199] flex flex-col items-center justify-center border-t border-gray-300 p-3 md:p-5 text-[12px] md:text-[14px]">
              <div className="mb-1">
                {new Date().getFullYear()} © All Rights Reserved.
              </div>

              <div>
                Implement by{" "}
                <a
                  href="https://www.facebook.com/share/1EoHRj1dXy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 cursor-pointer hover:underline hover:text-white text-[12px]"
                >
                  Threads Software Solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
