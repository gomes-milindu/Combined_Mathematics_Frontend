import Card from "../../components/HomePage/Card"

function CardSection(){
    return(
        
        <section className='w-full h-[400px] flex justify-center items-center '>
          <div className="w-10/12 h-fit flex flex-row justify-center items-center gap-5">
            <Card />
            <Card/>
            <Card />
          </div>
        </section>
        
    )
}

export default CardSection