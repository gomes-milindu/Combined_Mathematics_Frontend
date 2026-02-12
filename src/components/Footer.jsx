import rect6 from "../assets/Footer/Rectangle 6.png";
import rect7 from "../assets/Footer/Rectangle 7.png";
import name from   "../assets/Footer/name.png";
import mail from  "../assets/Footer/mail.png";
import call from "../assets/Footer/call.png";
import map from "../assets/Footer/map.png";
import fb from "../assets/Footer/fb.png";
import insta from "../assets/Footer/insta.png";
import youtube from "../assets/Footer/youtube.png";

function Footer() {


  return (
    <>
      <section className="relative w-full h-[530px]">
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${rect6})` }}
        >
          <div
            className="w-full h-full bg-cover absolute z-1 bg-no-repeat right-0 top-0"
            style={{ backgroundImage: `url(${rect7})` }}
          ></div>
          <div className="w-full h-[415px] bottom-0 bg-gray-900 absolute z-2 ">
            <div className="grid grid-cols-3 gap-5 h-full place-items-center justify-items-center">
              
              
              <div className="w-2/3 h-[90%] ">
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <div
                    className="w-full h-[200px] bg-contain bg-no-repeat bg-center scale-75 "
                    style={{ backgroundImage: `url(${name})` }}
                  ></div>
                  <div className="w-[70%] h-[100px]  text-white text-[13px] font-light text-center">
                    At Tuition Master, we make learning 
                    simple, fun, and
                    effective. Our goal is to help every student understand
                    better, perform higher, and reach their full potential.
                  </div>
                </div>
              </div>
              
              
              
              <div className="w-2/3 h-[90%] ">
                <div className="w-full h-full flex flex-col justify-center items-left text-white gap-5">
                    <div className="text-[24px] text-purple-300">Contact Us</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-center items-center gap-3">
                            <div className="w-[25px] h-[20px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${mail})` }}></div>
                            <div className="w-full ">info@mathteacher.com</div>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-3">  
                            <div className="w-[25px] h-[20px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${call})` }}></div>
                            <div className="w-full">+94 78 778 78 456</div>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-3">
                            <div className="w-[25px] h-[20px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${map})` }}></div>
                            <div className="w-full">MathsKing, Colombo 12</div>
                        </div>
                    </div>
                        <div className="flex flex-row gap-4 mt-5">
                            <div className="w-[28px] h-[25px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${fb})` }}></div>
                            <div className="w-[28px] h-[25px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${insta})` }}></div>
                            <div className="w-[28px] h-[25px] bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${youtube})` }}></div>
                    </div>
                </div>
              </div>
              
              
              <div className="w-2/3 h-[90%]">
                <div className="w-full h-full flex flex-col justify-center items-left text-white gap-5">
                    <div className="text-2xl text-purple-300">Quick Links</div>
                    <div className="flex flex-col gap-3 text-[14px] ">
                        <div className="">Home</div>
                        <div className="">Classes</div>
                        <div className="">Courses</div>
                        <div className="">About us</div>
                        <div className="">Contact</div>
                    </div>
                </div>
              </div>
              
            </div>
            <div className="w-full flex justify-center items-center bg-gray-900">
              <div className="w-[85%] text-[#8d9199] flex items-center justify-center border-t-1 border-amber-10 p-5">Implement by Threads Software Solutions</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
