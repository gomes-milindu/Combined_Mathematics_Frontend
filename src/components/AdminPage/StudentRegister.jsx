import TopNav from "./TopNav"

function StudentRegister(){
    return(
        <>
            
                <TopNav pageTitle="Student Register" />
                <div className="w-full h-[90vh] flex flex-col justify-center items-center gap-10">
                
                    <div className="w-auto h-auto">
                        <div className="">Student ID</div>
                        <div className="">
                            <input type="text" className="w-50 border border-gray-300"></input>
                        </div>
                        <div className="">First Name</div>
                        <div className="">
                            <input type="text" className="w-50 border border-gray-300"></input>
                        </div>
                        <div className="">Last Name</div>
                        <div className="">
                            <input type="text" className="w-50 border border-gray-300"></input>
                        </div>
                        <div className="">Email</div>
                        <div className="">
                            <input type="text" className="w-50 border border-gray-300"></input>
                        </div>
                        <div className="">Password</div>
                        <div className="">
                            <input type="text" className="w-50 border border-gray-300"></input>
                        </div>
                    </div>
                </div>
            
        </>
    )
}

export default StudentRegister