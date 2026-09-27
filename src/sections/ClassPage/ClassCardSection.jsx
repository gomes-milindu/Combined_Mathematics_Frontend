import { useState } from "react";
import ClassCard from "../../components/ClassesPage/ClassCard";
import {classdata} from "../../data/Data";


function ClassCardSection() {
  const [activeCategory, setActiveCategory] = useState("online");

  const filteredClasses = classdata.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="w-full flex justify-center pt-8 pb-20 md:py-20 px-4">
      <div className="w-full max-w-[1216px] flex flex-col items-center gap-12">

        {/* 🔹 FILTER TABS */}
        <div className="flex gap-6 sm:gap-10 flex-wrap justify-center">
          <button
            onClick={() => setActiveCategory("online")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition
              ${
                activeCategory === "online"
                  ? "bg-white text-[#7f56d9]"
                  : "text-gray-600"
              }`}
          >
            Online Classes
          </button>

          <button
            onClick={() => setActiveCategory("physical")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition
              ${
                activeCategory === "physical"
                  ? "bg-white text-[#7f56d9]"
                  : "text-gray-600"
              }`}
          >
            Physical Classes
          </button>
        </div>

        {/* 🔹 CLASS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          {filteredClasses.map((cls) => (
            <ClassCard
              key={cls.id}
              title={cls.title}
              description={cls.description}
              time={cls.time}
              category={cls.category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ClassCardSection;
