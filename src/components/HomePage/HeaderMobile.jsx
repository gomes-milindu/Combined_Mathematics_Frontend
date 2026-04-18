import he from "../../assets/Hero/hee.jpg"

export default function HeaderMobile({color2,backgroundImage}){
    return(
        <div className='w-full h-screen'>
            <div className="w-full h-full bg-red-500 bg-cover bg-center" style={{clipPath: 'polygon(0 0, 100% 0, 100% 48%, 0 53%)'}}>
                
            </div>
            <div className={`w-full h-full absolute  top-0 bg-cover bg-center ${backgroundImage}`} style={{clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 40%)'}}> 
                <div className="w-full h-full bg-[#8A38F5] opacity-20"></div>
            </div>
        </div>
        
    )
}