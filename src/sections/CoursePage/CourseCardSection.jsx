import { useState } from "react";
import cardData from "../../../Data/CourseData";
import CourseCard from "../../components/HomePage/CourseCard";
import { Search } from "lucide-react";

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
      <div className="w-[1216px] flex flex-col gap-8 items-center">

        {/* 🔍 SEARCH (FIGMA STYLE) */}
        <div className="relative w-[420px] ">
          <input
            type="text"
            placeholder="Search for courses"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-100"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* 🏷 CATEGORY FILTER (FIGMA STYLE) */}
        <div className="flex gap-6">
          {["All", "Applied Mathematics", "Pure Mathematics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  activeCategory === cat
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-600"
                }`}
            >
              {cat === "All" ? "All Courses" : cat}
            </button>
          ))}
        </div>

        {/* 📦 CARDS */}
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
