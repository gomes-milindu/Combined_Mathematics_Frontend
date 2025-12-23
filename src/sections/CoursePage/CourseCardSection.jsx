import cardData from "../../../Data/CourseData";
import CourseCard from "../../components/HomePage/CourseCard";

function CourseCardSection() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[1216px] h-[2100px] flex justify-center items-center">
          <div className="w-fit h-fit grid grid-cols-3 gap-8">
            {cardData.map((item) => (
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
    </>
  );
}

export default CourseCardSection;
