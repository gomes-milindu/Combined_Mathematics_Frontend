// import image from '../../assets/sounds/image.png'
import image from '../../assets/image.png'
import JoinClass from '../../components/HomePage/JoinClass'

function JoinClassSection() {
  return (
    <section className='w-full h-auto min-h-[auto] md:min-h-[500px] lg:min-h-[600px] relative bg-white md:bg-transparent'>
      {/* Background image */}
      <div className='w-full h-full bg-cover bg-center bg-no-repeat absolute inset-0' style={{ backgroundImage: `url(${image})` }}>
        {/* Mobile: light white overlay for readability. Desktop: original purple overlay */}
        <div className="w-full h-full bg-white/90 md:bg-[#8A38F5] md:opacity-30 absolute z-5"></div>
      </div>
      
      <div className="w-full h-full flex justify-center items-center relative z-10 py-10 md:py-12">
        <div className="w-[90%] md:w-10/12 max-w-[1000px] flex flex-col justify-start gap-6 md:gap-16 lg:gap-[110px]">
          
          <div className='flex flex-col gap-1 md:gap-8'>
            <div className='flex flex-col items-center md:items-start text-center md:text-left'>
              <div className="text-[18px] md:text-[36px] lg:text-[48px] font-semibold text-[#6941C6] md:text-[#53389E]">Join Our Classes &</div>
              <div className="text-[22px] md:text-[44px] lg:text-[60px] font-medium text-[#101828] md:text-[#000000]">Start Learning Today</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-8">
            <JoinClass title="Online Class" />
            <JoinClass title="XYZ - Nugegoda" />
            <JoinClass title="XYZ - Nugegoda" />
          </div>

          <div className="flex justify-center md:justify-start w-full mt-2 md:mt-0">
            <button className="px-6 h-10 bg-[#7F56D9] md:bg-purple-600 rounded-lg text-white text-[14px] font-medium shadow-sm">
              Join Classes
            </button>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default JoinClassSection