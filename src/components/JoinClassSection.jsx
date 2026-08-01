import React from "react";
import { Laptop, Users } from "lucide-react";
import JoinClass from "./HomePage/JoinClass";
import Assets from "../data/AssetLinks.js";
import { classes } from "../data/Data.js";


export default function JoinClassSection() {
  
  return (
    <div className="relative w-full md:hidden overflow-hidden">
      {/* background image + white overlay so text stays readable */}
      <img
        src={Assets.BACKGROUND_IMAGE_URL}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-purple-100/70" />
 
      <div className="relative z-10 px-5 pt-10 pb-10 ">
        {/* heading */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <div className="text-[18px] md:text-[36px] lg:text-[48px] font-semibold text-[#6941C6] md:text-[#53389E]">Join Our Classes &</div>
              <div className="text-[22px] md:text-[44px] lg:text-[60px] font-medium text-[#101828] md:text-[#000000]">Start Learning Today</div>
            </div>
 
        {/* class cards */}
        <div className="mt-8 flex flex-col gap-4">
          {classes.map((item, index) => {
            const Icon = item.icon;

            return (
              <JoinClass
                key={index}
                icon={<Icon size={22} color="#241C15" strokeWidth={1.75} />}
                title={item.title}
                schedule={item.schedule}
                location={item.location}
              />
            );
          })}
        </div>
 
        {/* CTA */}
        <div className="flex justify-center mt-8">
          <button className="px-6 h-10 bg-[#7F56D9] md:bg-purple-600 rounded-lg text-white text-[14px] font-medium shadow-sm">
              Join Classes
            </button>
        </div>
      </div>
    </div>
  );
}