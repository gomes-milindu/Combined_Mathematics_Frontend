import React from "react";
import { Laptop, Users, Icon } from "lucide-react";
import JoinClass from "./HomePage/JoinClass";
import Assets from "../data/AssetLinks.js";
import { classes } from "../data/Data.js";

export default function JoinClassSection() {
  return (
    <>
      {/* Mobile View*/}
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
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-[18px] md:text-[36px] lg:text-[48px] font-semibold text-[#6941C6] md:text-[#53389E]">
              Join Our Classes &
            </div>
            <div className="text-[22px] md:text-[44px] lg:text-[60px] font-medium text-[#101828] md:text-[#000000]">
              Start Learning Today
            </div>
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
            <button className="w-100 px-6 h-10 bg-[#7F56D9] md:bg-purple-600 rounded-lg text-white text-[14px] font-medium shadow-sm">
              Join Classes
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View*/}

   
      <div className="relative w-full hidden md:flex md:flex-col md:justify-between h-[600px] overflow-hidden bg-red-300">
        <img
          src={Assets.BACKGROUND_IMAGE_URL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
  
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 38% 38%, rgba(255, 255, 255,0.45) 0%, rgba(255, 255, 255,0.45) 45%, rgba(255, 255, 255,0.45) 75%, rgba(255, 255, 255,0.45) 100%)",
          }}
        />
 

        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-16">
          <div className="flex justify-start items-center w-[80%]">
            <div className="text-start mr-[10%]">
              <h2 className="text-5xl font-semibold text-[#6941C6] leading-tight">
                Join Our Classes &
              </h2>
              <h2 className="text-6xl font-medium text-[#101828] leading-tight mt-1">
                Start Learning Today
              </h2>
 
              <button className="mt-8 bg-[#7F56D9] text-white font-medium text-[16px] px-6 h-10 rounded-lg shadow-sm">
                Join Classes
              </button>
            </div>
          </div>
        </div>
 
        
        <div className="relative hidden pb-10 justify-center md:flex">
          <div className="flex flex-row gap-35">
            {classes.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="w-[220px]">
                  <JoinClass
                    icon={<Icon size={22} color="#241C15" strokeWidth={1.75} />}
                    title={item.title}
                    schedule={item.schedule}
                    location={item.location}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
