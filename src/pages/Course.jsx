import Header from "../components/Header";
import CourseCard from "../components/HomePage/CourseCard";
import GlassBox from "../components/HomePage/GlassBox";

export default function Course(){
    return(
        <>
        <Header backgroundImage="bg-[url(./assets/Hero/courses.png)]"/>
        
        <GlassBox />
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[1216px] h-[2055p] flex justify-center items-center">
                <div className="w-fit h-fit grid grid-cols-3 gap-[32px]">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                    
                </div>
            </div>
        </div>
        </>
    )
}