// import Card from "../../components/HomePage/Card"

// function CardSection(){
//     return(
        
//         <section className='w-full h-[400px] flex justify-center items-center '>
//           <div className="w-10/12 h-fit flex flex-row justify-center items-center gap-5">
//             <Card />
//             <Card/>
//             <Card />
//           </div>
//         </section>
        
//     )
// }

// export default CardSection

import Card from "../../components/HomePage/Card"

function CardSection() {
  return (

    <section className='w-full h-auto py-8 md:py-10 lg:py-12 flex justify-center items-center'>
      <div className="w-11/12 md:w-10/12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-5">
      </div>
    </section>

  )
}

export default CardSection