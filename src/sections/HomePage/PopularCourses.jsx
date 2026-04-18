import CourseCard from "../../components/HomePage/CourseCard"
import Topic from "../../components/HomePage/Topic"

function PopularCourses(){

    const courses = [
        ["Center of Gravity", "Appl Mathematics", "2000","https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop"],
        // ["Limits", "Pure Mathematics", "2500","https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop"],
        // ["Vectors", "Pure Mathematics", "2200","https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop"]
    ]

    return(
        <section className="w-full h-[900px] flex flex-col justify-center items-center gap-16">
            <div className="flex justify-center items-center flex-col">
                <Topic topic="Our Popular Courses" subtopic="Discover the most loved courses by our students." />

            </div>

            <div className=" w-[90%] lg:max-w-7xl h-[605px] gap-8 flex flex-row">
                 

                    {
                    courses.map(
                        (course) => (
                            <CourseCard title={course[0]} category={course[1]} price={course[2]} image={course[3]} />
                        )
                    )
                    }
            </div>
        </section>
    )
}

export default PopularCourses