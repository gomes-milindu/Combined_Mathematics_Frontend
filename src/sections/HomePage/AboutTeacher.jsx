import sir from "../../assets/Images/sir.png";
const AboutTeacher = () => {
  return (
    <section className="w-full h-[600px] flex justify-center items-center">
            <div className="w-[1208px] h-[475px] flex flex-col justify-center items-center gap-8">
                <div className="text-[36px]">About the Teacher</div>
                <div className="flex flex-row justify-center items-center gap-8">
                    <div className="w-[416px] h-[399px] bg-green-200 rounded-xl bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${sir})`}}></div>
                    <div className="w-[767px] h-[374px]  flex flex-col  gap-8">
                        <div className="text-[18px] text-[#717680]">t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</div>
                        <div className="text-[18px] text-[#717680] mt-10"> tis a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</div>
                        <div className="w-[142px] h-11 bg-[#7F56D9] rounded-lg"></div>
                    </div>
                </div>
            </div>
    </section>
  );
};

export default AboutTeacher;