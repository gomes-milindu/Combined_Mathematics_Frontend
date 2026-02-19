import { useState } from "react";
import ClassCard from "../../components/ClassesPage/ClassCard";

const classdata = [
  {
    id: 1,
    title: "2024 A/L Revision",
    description: "Long established fact readable content.",
    time: "Monday 8am - 10am",
    category: "online",
  },
  {
    id: 2,
    title: "2024 A/L Physics",
    description: "Focused physical class session.",
    time: "Tuesday 9am - 11am",
    category: "physical",
  },
  {
    id: 3,
    title: "2024 A/L Maths",
    description: "Online maths revision class.",
    time: "Wednesday 1pm - 3pm",
    category: "online",
  },
  {
    id: 4,
    title: "2024 A/L Chemistry",
    description: "Advanced chemistry revision.",
    time: "Thursday 8am - 10am",
    category: "online",
  },
  {
    id: 5,
    title: "2024 A/L Biology",
    description: "Theory + discussion class.",
    time: "Friday 9am - 11am",
    category: "physical",
  },
  {
    id: 6,
    title: "2024 A/L ICT",
    description: "Practical focused ICT class.",
    time: "Saturday 1pm - 3pm",
    category: "online",
  },
  {
    id: 7,
    title: "2024 A/L Combined Maths",
    description: "Problem solving session.",
    time: "Sunday 8am - 10am",
    category: "physical",
  },
  {
    id: 8,
    title: "2024 A/L English",
    description: "Paper discussion & writing.",
    time: "Sunday 2pm - 4pm",
    category: "online",
  },
];

function ClassCardSection() {
  const [activeCategory, setActiveCategory] = useState("online");

  const filteredClasses = classdata.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="w-full flex justify-center py-20 px-4">
      <div className="w-full max-w-[1216px] flex flex-col items-center gap-12">

        {/* 🔹 FILTER TABS */}
        <div className="flex gap-6 sm:gap-10 flex-wrap justify-center">
          <button
            onClick={() => setActiveCategory("online")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition
              ${
                activeCategory === "online"
                  ? "bg-white text-purple-600"
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
                  ? "bg-white text-purple-600"
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
