import Card from "../../components/HomePage/Card"

function CardSection(){
    return(
        
        <section className='w-full h-[400px] flex justify-center items-center '>
          <div className="w-fit h-fit flex flex-row justify-center items-center gap-5">
            <Card />
            <Card/>
            <Card />
          </div>
        </section>
        
    )
}

export default CardSection