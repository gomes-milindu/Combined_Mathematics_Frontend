import React from "react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="w-full h-full bg-[#fcfaff] border border-[#dac8fa] shadow-sm rounded-xl px-6 py-6 flex flex-col justify-center">
      <div className="mb-4">{icon}</div>
      <div className="font-semibold text-[#1A1625] text-[15px]">{title}</div>
      <div className="text-sm text-gray-500 mt-2 leading-snug">
        {description}
      </div>
    </div>
  );
}

export default FeatureCard;