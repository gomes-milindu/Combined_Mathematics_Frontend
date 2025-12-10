import CourseCard from "../../components/HomePage/CourseCard"
import Topic from "../../components/HomePage/Topic"

function PopularCourses(){
    return(
        <section className="w-full h-[900px] flex flex-col justify-center items-center gap-16">
            <div className="flex justify-center items-center flex-col">
                <Topic topic="Our Popular Courses" subtopic="Discover the most loved courses by our students." />

            </div>

            <div className="w-[1216px] h-[605px] gap-8 flex flex-row">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
            </div>
        </section>
    )
}

export default PopularCourses