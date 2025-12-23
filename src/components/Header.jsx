import he from "../assets/Hero/hee.jpg"

function Header({color2,backgroundImage}){
    return(
        <div className='w-full h-screen'>
            <div className="w-full h-full bg-[#F9F5FF] bg-cover bg-center" style={{clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)'}}>
                
            </div>
            <div className={`w-full h-full absolute z-10 top-0 bg-cover bg-center ${backgroundImage}`} style={{clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 60%)'}}> 
                <div className="w-full h-full bg-[#8A38F5] opacity-20"></div>
            </div>
        </div>
        
    )
}

export default Header;