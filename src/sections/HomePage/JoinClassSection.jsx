// import image from '../../assets/sounds/image.png'
import image from '../../assets/image.png'
import JoinClass from '../../components/HomePage/JoinClass'

function JoinClassSection() {
  return (
    <section className='w-full h-auto min-h-[400px] md:min-h-[500px] lg:min-h-[600px] relative'>
      <div className='w-full h-full bg-purple-500 bg-cover bg-center bg-no-repeat absolute inset-0' style={{ backgroundImage: `url(${image})` }}>
        <div className="w-full h-full bg-[#8A38F5] opacity-30 absolute z-5"></div>
      </div>
      <div className="w-full h-full flex justify-center items-center relative z-10 py-8 md:py-12">
        <div className="w-11/12 md:w-10/12 max-w-[1000px] flex flex-col justify-start gap-6 md:gap-16 lg:gap-[110px]">
          <div className='flex flex-col gap-4 md:gap-8'>
            <div className='flex flex-col'>
              <div className="text-[20px] md:text-[36px] lg:text-[48px] font-semibold text-[#53389E]">Join Our Classes &</div>
              <div className="text-[24px] md:text-[44px] lg:text-[60px] font-medium text-[#000000]">Start Learning Today</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-8">
            <JoinClass />
            <JoinClass />
            <JoinClass />
          </div>

          <button className="w-[130px] h-10 bg-purple-600 rounded-lg text-white text-[14px] font-medium ">
            Join Classes
          </button>
        </div>
      </div>
    </section>
  )
}

export default JoinClassSection