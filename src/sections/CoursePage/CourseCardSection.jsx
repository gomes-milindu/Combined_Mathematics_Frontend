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
    <div className="w-full flex justify-center py-10 md:py-16 px-4">
      <div className="w-full max-w-[1216px] flex flex-col gap-8 items-center">

        {/* Mobile: Dropdown + Search side by side */}
        <div className="flex md:hidden w-full gap-3">
          <div className="relative w-1/2">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-100 bg-white pr-8"
            >
              <option value="All">All Courses</option>
              <option value="Applied Mathematics">Applied Mathematics</option>
              <option value="Pure Mathematics">Pure Mathematics</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▼</span>
          </div>

          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search for courses"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-100"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Tablet/Desktop: Inline search + buttons */}
        <div className="hidden md:flex flex-col items-center gap-8 w-full">
          <div className="relative w-full sm:w-[420px]">
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

          <div className="flex gap-4 flex-wrap">
            {["All", "Applied Mathematics", "Pure Mathematics"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition
                  ${activeCategory === cat
                    ? "bg-purple-50 text-purple-600"
                    : "text-gray-600"
                  }`}
              >
                {cat === "All" ? "All Courses" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 📦 CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
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
