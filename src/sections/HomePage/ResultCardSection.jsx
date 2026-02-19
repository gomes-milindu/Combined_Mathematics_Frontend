import ResultCard from "../../components/HomePage/ResultCard"
import Topic from "../../components/HomePage/Topic"

function ResultCardSection(){

    const results = [
        ["Nimthara Dinekshi", "Index: 123456", "School: Royal College"],
        ["Kaveesha Perera", "Index: 654321", "School: Ananda College"],
        ["Sahan Wijesinghe", "Index: 112233", "School: St. Thomas College"]
    ]       
    
    
    return(
        <section className='w-full h-[900px] flex flex-col justify-center items-center gap-10'>
            <Topic topic="Our Best Results" subtopic="Where hard work meet success" />
            <div className="w-10/12 flex flex-row gap-8">
            

            {
            results.map(
                (result) => (
                    <ResultCard name={result[0]} index={result[1]} school={result[2]} />
                )
                
            )
        }
            </div>
        </section>
    )
}

export default ResultCardSection