import Assets from "../../data/AssetLinks";
import { useState } from "react";
import Card from "../../components/HomePage/Card";

const AboutTeacher = () => {
  const [expanded, setExpanded] = useState(false);

  const fullText = "This is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";
  const secondText = "This is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.";

  return (
    <section className="w-full h-auto py-10 md:py-12 lg:py-16 flex justify-center items-center">
      <div className="w-11/12 md:w-10/12 max-w-[1208px] flex flex-col justify-center items-center gap-6 md:gap-8">
        <div className="text-[24px] md:text-[30px] lg:text-[36px] font-semibold text-center text-[#7F56D9]">
          About The Teacher
        </div>

        {/* Mobile & Tablet: Stacked layout (image centered, text below) */}
        <div className="flex flex-col lg:hidden justify-center items-center gap-4">
          <div
            className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-xl bg-cover bg-center bg-no-repeat shrink-0"
            style={{ backgroundImage: `url(${Assets.Mobile_Teacher_Photo})` }}
          ></div>

          {/* Mobile: truncated with Read More */}
          <div className="md:hidden text-center flex flex-col gap-6 w-full text-left">
            <div>
              <div className="text-[14px] text-[#717680] leading-relaxed text-center px-2">
                {expanded ? fullText : fullText.slice(0, 250) + "..."}
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[14px] font-medium text-[#414651] mt-3 flex items-center gap-1 mx-auto"
              >
                {expanded ? "Show Less" : "Read More"}
                <span className="text-[16px]">{expanded ? "‹" : "›"}</span>
              </button>
            </div>
            {/*}
            <div className="w-full text-left mt-2 px-2">
              <Card />
            </div>*/}
          </div>

          {/* Tablet: full text shown */}
          <div className="hidden md:block lg:hidden">
            <div className="text-[16px] text-[#717680] text-center leading-relaxed">{fullText}</div>
            <div className="text-[16px] text-[#717680] text-center mt-4 leading-relaxed">{secondText}</div>
            <div className="flex justify-center mt-6">
              <div className="w-[134px] h-11 bg-[#7F56D9] rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="hidden lg:flex flex-row justify-center items-center gap-8">
          <div
            className="w-[416px] h-[399px] rounded-xl bg-cover bg-center bg-no-repeat shrink-0"
            style={{ backgroundImage: `url(${Assets.Teacher_Photo})` }}
          ></div>
          <div className="w-full flex flex-col gap-8">
            <div className="text-[18px] text-[#717680]">{fullText}</div>
            <div className="text-[18px] text-[#717680] mt-2">{secondText}</div>
            <div className="w-[142px] h-11 bg-[#7F56D9] rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeacher;