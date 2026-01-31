import hee from "../../assets/Hero/hee.jpg"

function ClassCard({ title, description, time, category }) {
  return (
    <div className="w-full bg-white border border-gray-300 rounded-2xl p-4 flex flex-col gap-4">

      {/* IMAGE */}
      <div className="w-full h-[180px] rounded-xl overflow-hidden">
        <img
          src={hee}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-3">

        {/* TITLE + BADGE */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>

          {category === "online" && (
            <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
              via Zoom
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* TIME */}
        <p className="text-sm text-gray-400">
          {time}
        </p>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 mt-2">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md text-sm">
            Enroll Now
          </button>

          <button className="text-purple-600 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
