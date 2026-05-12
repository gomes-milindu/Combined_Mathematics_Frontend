import { useState, useRef, useEffect } from "react"
import ResultCard from "../../components/HomePage/ResultCard"
import Topic from "../../components/HomePage/Topic"

function ResultCardSection() {

    const results = [
        ["Nimthara Dinekshi", "Index: 123456", "School: Royal College"],
        ["Kaveesha Perera", "Index: 654321", "School: Ananda College"],
        ["Sahan Wijesinghe", "Index: 112233", "School: St. Thomas College"]
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
            setCurrent((prev) => (prev === results.length - 1 ? 0 : prev + 1));
        } else if (diff < -50) {
            setCurrent((prev) => (prev === 0 ? results.length - 1 : prev - 1));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === results.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className='w-full h-auto py-10 md:py-12 lg:py-16 flex flex-col justify-center items-center gap-8 md:gap-10'>
            <Topic topic="Our Best Results" subtopic="Where hard work meet success" />

            {/* Desktop/Tablet: side by side */}
            <div className="hidden md:flex w-10/12 flex-row gap-8">
                {results.map((result, index) => (
                    <ResultCard key={index} name={result[0]} index={result[1]} school={result[2]} />
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
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className={`w-[75%] shrink-0 px-2 transition-all duration-500 ${index === current ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.90]'
                                }`}
                        >
                            <ResultCard name={result[0]} index={result[1]} school={result[2]} />
                        </div>
                    ))}
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {results.map((_, index) => (
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

export default ResultCardSection