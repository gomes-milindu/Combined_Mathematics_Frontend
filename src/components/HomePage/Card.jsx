import Assets from '../../data/AssetLinks'
import { Presentation, GraduationCap, UserRound, School, Users, Laptop } from "lucide-react";
import FeatureCard from '../HomePage/FeatureCard';



const features = [
  {
    icon: <Presentation size={28} color="#1A1625" strokeWidth={1.75} />,
    title: "Sell Online Courses",
    description:
      "Simply dummy text of the printing and typesetting industry. Simply dummy text.",
  },
  {
    icon: <Users size={28} color="#1A1625" strokeWidth={1.75} />,
    title: "Our Physical Classes",
    description:
      "Simply dummy text of the printing and typesetting industry. Simply dummy text.",
  },
  {
    icon: <Laptop size={28} color="#1A1625" strokeWidth={1.75} />,
    title: "Our Online Classes",
    description:
      "Simply dummy text of the printing and typesetting industry. Simply dummy text.",
  },
];

function Card() {
    return (
        <>
            {/* Mobile: Horizontal card (icon left, text right) */}
            
            
            <div className="w-full flex justify-center items-center mt-15">
                <div className="md:hidden w-[90%] h-auto bg-[#F9F5FF] border rounded-xl border-[#B692F6] flex flex-row items-center justify-around gap-5 py-3 px-7">
                    
                    <Presentation  strokeWidth={2} className="w-[35px] h-[35px] bg-cover bg-no-repeat shrink-0" />
                    <div className="flex flex-col gap-1">
                        <div className="text-[15px] font-semibold text-[#414651]">Sell Online Courses</div>
                        <div className="text-[12px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. simply dummy text.</div>
                    </div>
                </div>
            </div>

            {/* Tablet & Desktop: Vertical card (icon top, text below) */}
            {/*
            }
            <div className="hidden md:flex w-full min-h-[200px] bg-red-500 border rounded-xl border-[#B692F6] flex-col justify-center items-center gap-4 p-5">
                <div className="w-full">
                    <div className="w-[54px] h-[54px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${Assets.Card_Icon})` }}></div>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <div className="text-[18px] lg:text-[20px] font-semibold text-[#414651]">Sell Online Courses</div>
                    <div className="text-[14px] lg:text-[16px] font-normal text-[#717680]">simply dummy text of the printing and typesetting industry. simply dummy text.</div>
                </div>
            </div>*/}
            {/*
            <div className = "w-full h-[250px] bg-red-400 flex flex-row justify-evenly items-center">
                <div className = "w-[400px] h-full bg-purple-400"></div>
                <div className = "w-[400px] h-full bg-purple-400"></div>
                <div className = "w-[400px] h-full bg-purple-400"></div>
            </div>*/}
            <div className="w-full  flex flex-col justify-center items-center mt-15 mb-10">
            <div className="w-[90%] h-[170px] flex flex-row justify-evenly items-center gap-4 px-4">
            {features.map((item, index) => (
                <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                />
            ))}
            </div>
            </div>
        </>
    )
}

export default Card