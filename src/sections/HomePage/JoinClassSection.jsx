import image from '../../assets/image.png'
import JoinClass from '../../components/HomePage/JoinClass'

function JoinClassSection(){
    return(
        <section className='w-full h-[600px]'>
        <div className='w-full h-full bg-purple-500 bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url(${image})`}}>
          <div className="w-full h-[600px] bg-[#8A38F5] opacity-35 absolute z-5"></div>
          <div className="w-full h-full   flex justify-center items-center">
            <div className="w-[1000px] h-[450px] absolute z-10 flex flex-col justify-start gap-[110px]">
               <div className='flex flex-col gap-8'>
                 <div className='flex flex-col'>
                   <div className="text-[48px] font-semibold text-[#53389E]">Join Our Classes &</div>
                   <div className="text-[60px] font-medium text-[#000000]">Start Learning Today</div>
                 </div>
                 <div className="w-[134px] h-11 bg-purple-500"></div>
               </div>

               <div className="flex flex-row gap-8">
                    <JoinClass/>
                    <JoinClass/>
                    <JoinClass/>
               </div>
            </div>
          </div>
          
            
        </div>
        
      </section>
    )
}


export default JoinClassSection