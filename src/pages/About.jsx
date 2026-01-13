import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import teacherImg from "../assets/Hero/hee.jpg";
import missionImg from "../assets/Hero/courses.png";
import visionImg from "../assets/Hero/hee.jpg";

function About() {
  return (
    <>
      <Header />
      <NavBar />

      {/* ================= ABOUT THE TEACHER ================= */}
      <section className="relative w-full py-24 bg-white">
        {/* dotted background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-center text-[26px] font-medium text-[#6b46c1] mb-16">
            About The Teacher
          </h2>

          <div className="grid md:grid-cols-[340px_1fr] gap-16 items-start">
            {/* LEFT CARD */}
            <div>
              <img
                src={teacherImg}
                alt="Teacher"
                className="w-[320px] h-[320px] object-cover rounded-xl mb-6"
              />

              <h3 className="text-[18px] font-semibold text-gray-800">
                Mr. Sunil Edirisinghe
              </h3>

              <p className="text-[14px] text-gray-600 mb-4">
                Msc Mathematics(Hons) in UOR
              </p>

              <div className="text-[14px] text-gray-700 space-y-2">
                <p>✉️ sunil@gmail.com</p>
                <p>📞 +94 78 78 78 950</p>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="text-[15px] text-gray-600 leading-[28px] space-y-6">
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.
              </p>

              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for
                'lorem ipsum' will uncover many web sites still in their infancy.
              </p>

              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters.
              </p>

              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for
                'lorem ipsum' will uncover many web sites still in their infancy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="relative w-full py-28 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 px-6 items-center">
          <img
            src={missionImg}
            alt="Mission"
            className="w-full max-w-[520px]"
          />

          <div>
            <h2 className="text-[26px] font-medium text-[#6b46c1] mb-6">
              Our Mission
            </h2>

            <p className="text-[15px] text-gray-600 leading-[28px]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text.
            </p>
          </div>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="relative w-full py-28 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 px-6 items-center">
          <div>
            <h2 className="text-[26px] font-medium text-[#6b46c1] mb-6">
              Our Vision
            </h2>

            <p className="text-[15px] text-gray-600 leading-[28px]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text.
            </p>
          </div>

          <img
            src={visionImg}
            alt="Vision"
            className="w-full max-w-[520px]"
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
