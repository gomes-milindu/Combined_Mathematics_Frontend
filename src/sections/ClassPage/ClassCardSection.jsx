import ClassCard from "../../components/ClassesPage/ClassCard";

function ClassCardSection() {
  return (
    <>
      <div className="w-10/12 h-full flex justify-center items-center">
        <div className="w-12/10 grid grid-cols-2 gap-4 place-items-center">
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
        </div>
      </div>
    </>
  );
}

export default ClassCardSection;
