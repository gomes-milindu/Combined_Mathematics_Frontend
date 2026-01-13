import { useState } from "react";
import cardData from "../../../Data/CourseData";
import CourseCard from "../../components/HomePage/CourseCard";

function CourseCardSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredData = cardData.filter((item) => {
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full flex justify-center py-16">
      <div className="w-[1216px]">

        {/* 🔍 Search */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[400px] px-4 py-2 border rounded-lg outline-none"
          />
        </div>

        {/* 🏷 Categories */}
        <div className="flex justify-center gap-4 mb-10">
          {["All", "Applied Mathematics", "Pure Mathematics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat === "All" ? "All Courses" : cat}
            </button>
          ))}
        </div>

        {/*  Cards */}
        <div className="grid grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <CourseCard
              key={item.id}
              title={item.title}
              category={item.category}
              price={item.price}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default CourseCardSection;
