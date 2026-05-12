import { useState, useRef, useEffect } from "react"
import CourseCard from "../../components/HomePage/CourseCard"
import Topic from "../../components/HomePage/Topic"

function PopularCourses() {

    const courses = [
        ["Center of Gravity", "Applied Mathematics", "2000"],
        ["Limits", "Pure Mathematics", "2500"],
        ["Vectors", "Pure Mathematics", "2200"]
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

            {/* Desktop/Tablet: side by side */}
            <div className="hidden md:flex w-10/12 max-w-[1216px] gap-6 lg:gap-8 flex-row">
                {courses.map((course, index) => (
                    <CourseCard key={index} title={course[0]} category={course[1]} price={course[2]} />
                ))}
            </div>

            {/* Mobile: Swipeable carousel with peek */}
            <div
                className="md:hidden w-full overflow-hidden relative"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(calc(-${current * 75}% + 12.5%))`,
                    }}
                >
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className={`w-[75%] shrink-0 px-2 transition-all duration-500 ${index === current ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.90]'
                                }`}
                        >
                            <CourseCard title={course[0]} category={course[1]} price={course[2]} />
                        </div>
                    ))}
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {courses.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === current ? 'bg-[#7F56D9] w-6' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PopularCourses