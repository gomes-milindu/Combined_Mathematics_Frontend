import ResultCard from "../../components/HomePage/ResultCard"
import Topic from "../../components/HomePage/Topic"

function ResultCardSection(){
    return(
        <section className='w-full h-[900px] flex flex-col justify-center items-center gap-10'>
            <Topic topic="Our Best Results" subtopic="Where hard work meet success" />
            <div className="flex flex-row gap-8">
            <ResultCard />
            <ResultCard />
            <ResultCard />
            </div>
        </section>
    )
}

export default ResultCardSection