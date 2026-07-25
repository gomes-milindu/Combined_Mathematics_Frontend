import { useState, useRef, useEffect } from "react"
import CourseCard from "../../components/HomePage/CourseCard"
import Topic from "../../components/HomePage/Topic"

function PopularCourses() {

    const courses = [
        ["Center of Gravity", "Appl Mathematics", "2000","https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop"],
        // ["Limits", "Pure Mathematics", "2500","https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop"],
        // ["Vectors", "Pure Mathematics", "2200","https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop"]
    ]

    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) {
            setCurrent((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
        } else if (diff < -50) {
            setCurrent((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full h-auto py-10 md:py-12 lg:py-16 flex flex-col justify-center items-center gap-8 md:gap-12 lg:gap-16">
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