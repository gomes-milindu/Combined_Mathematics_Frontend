// import ResultCard from "../../components/HomePage/ResultCard"
// import Topic from "../../components/HomePage/Topic"

// function ResultCardSection(){

//     const results = [
//         ["Nimthara Dinekshi", "Index: 123456", "School: Royal College"],
//         ["Kaveesha Perera", "Index: 654321", "School: Ananda College"],
//         ["Sahan Wijesinghe", "Index: 112233", "School: St. Thomas College"]
//     ]       
    
    
//     return(
//         <section className='w-full h-[900px] flex flex-col justify-center items-center gap-10'>
//             <Topic topic="Our Best Results" subtopic="Where hard work meet success" />
//             <div className="w-10/12 flex flex-row gap-8">
            

//             {
//             results.map(
//                 (result) => (
//                     <ResultCard name={result[0]} index={result[1]} school={result[2]} />
//                 )
                
//             )
//         }
//             </div>
//         </section>
//     )
// }

// export default ResultCardSection

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
        if (diff > 50 && current < results.length - 1) {
            setCurrent(current + 1);
        } else if (diff < -50 && current > 0) {
            setCurrent(current - 1);
        }
    };

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
                    className="flex transition-transform duration-400 ease-out"
                    style={{
                        transform: `translateX(calc(-${current * 85}% + 7.5%))`,
                    }}
                >
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className={`w-[85%] shrink-0 px-3 transition-all duration-400 ${index === current ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.92]'
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