import React from "react";

function MobileSubHeader({headerTitle, headerSubtitle}) {
    return (
        <div className="md:hidden w-full h-fit absolute z-20 top-25 ">
            <div className="text-white text-center py-2 px-4">
                 <div className="text-[20px] font-semibold text-white">{headerTitle}</div>
              <div className="text-[26px]  font-medium text-white">{headerSubtitle}</div>
            </div>
        </div>
    )

}

export default MobileSubHeader