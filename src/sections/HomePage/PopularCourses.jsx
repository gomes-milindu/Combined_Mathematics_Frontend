import CourseCard from "../../components/HomePage/CourseCard"
import Topic from "../../components/HomePage/Topic"

function PopularCourses(){

    const courses = [
        ["Center of Gravity", "Applied Mathematics", "2000"],
        ["Limits", "Pure Mathematics", "2500"],
        ["Vectors", "Pure Mathematics", "2200"]
    ]

    return(
        <section className="w-full h-[900px] flex flex-col justify-center items-center gap-16">
            <div className="flex justify-center items-center flex-col">
                <Topic topic="Our Popular Courses" subtopic="Discover the most loved courses by our students." />

            </div>

            <div className="w-[1216px] h-[605px] gap-8 flex flex-row">
                    {/* <CourseCard />
                    <CourseCard />
                    <CourseCard /> */}

                    {
                    courses.map(
                        (course) => (
                            <CourseCard title={course[0]} category={course[1]} price={course[2]} />
                        )
                    )
                    }
            </div>
        </section>
    )
}

export default PopularCourses