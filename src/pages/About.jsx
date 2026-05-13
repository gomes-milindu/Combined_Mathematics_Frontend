import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import teacherImg from "../assets/Hero/hee.jpg";
import missionImg from "../assets/Hero/courses.png";
import visionImg from "../assets/Hero/hee.jpg";
import { Mail, Phone } from "lucide-react";
import Topic from "../components/HomePage/Topic";
import mission from "../assets/Images/mission.png";
import vission from "../assets/Images/vision.png";
import sir from "../assets/Images/sir.png";

function About() {
  return (
    <>
      <Header
        backgroundImage="bg-[url(./assets/Images/About.png)]"
        heroTitle="Passion for Teaching."
        heroSubtitle="Commitment to Results"
      />
      <NavBar />

      {/* About Teacher Section */}
      <section className="relative w-full py-12 md:py-24 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:18px_18px] opacity-40"></div>

        <div className="flex justify-center items-center mb-6 md:m-10">
          <Topic topic="About The Teacher" />
        </div>

        <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 md:px-6">
          {/* Mobile & Tablet: Stacked centered */}
          <div className="flex flex-col items-center md:hidden">
            <img
              src={sir}
              alt="Teacher"
              className="w-[200px] h-[220px] object-cover rounded-xl mb-6"
            />
            <div className="text-[14px] text-gray-600 leading-[24px] space-y-4 text-center px-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                pariatur molestias similique, natus iste, ipsam vero
                accusantium, itaque culpa fugiat maxime debitis? Quo ex totam id
                iste saepe rem eveniet!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                pariatur molestias similique, natus iste, ipsam vero
                accusantium, itaque culpa fugiat maxime debitis?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                pariatur molestias similique, natus iste, ipsam vero
                accusantium, itaque culpa fugiat maxime debitis?
              </p>
            </div>
          </div>

          {/* Tablet & Desktop: Grid layout with image left, text right */}
          <div className="hidden md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] items-start gap-8">
            <div>
              <img
                src={sir}
                alt="Teacher"
                className="w-[260px] md:w-[300px] h-[280px] md:h-[320px] object-cover rounded-xl mb-6"
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

            <div className="text-[14px] lg:text-[15px] text-gray-600 leading-[26px] lg:leading-[28px] space-y-6 text-justify">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                pariatur molestias similique, natus iste, ipsam vero
                accusantium, itaque culpa fugiat maxime debitis? Quo ex totam id
                iste saepe rem eveniet! Perspiciatis, velit! Quod voluptatum
                quidem aperiam ipsam eius repellat, aliquid molestiae quisquam
                iste eum. Tenetur ullam, harum dolores magnam facere
                consequuntur autem quibusdam nesciunt! Illum optio autem
                adipisci doloribus suscipit. ed libero! Inventore, nostrum.
                Vitae pariatur debitis eveniet, aliquid quod nesciunt labore
                dolores!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                pariatur molestias similique, natus iste, ipsam vero
                accusantium, itaque culpa fugiat maxime debitis? Quo ex totam id
                iste saepe rem eveniet! Perspiciatis, velit! Quod voluptatum
                quidem aperiam ipsam eius repellat, aliquid molestiae quisquam
                iste eum. Tenetur ullam, harum dolores magnam facere
                consequuntur autem quibusdam nesciunt! Illum optio autem
                adipisci doloribus suscipit. ed libero! Inventore, nostrum.
                Vitae pariatur debitis eveniet, aliquid quod nesciunt labore
                dolores!
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                pariatur molestias similique, natus iste, ipsam vero
                accusantium, itaque culpa fugiat maxime debitis? Quo ex totam id
                iste saepe rem eveniet! Perspiciatis, velit! Quod voluptatum
                quidem aperiam ipsam eius repellat, aliquid molestiae quisquam
                iste eum. Tenetur ullam, harum dolores magnam facere
                consequuntur autem quibusdam nesciunt! Illum optio autem
                adipisci doloribus suscipit. ed libero! Inventore, nostrum.
                Vitae pariatur debitis eveniet, aliquid quod nesciunt labore
                dolores!
              </p>

              <p>
                Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-0">
        <div className="flex flex-col md:flex-row justify-start items-start gap-6 md:gap-0">
          <div className="w-full flex justify-center md:block">
            <img
              src={mission}
              alt="Mission"
              className="w-[80%] max-w-[300px] md:max-w-none md:w-[500px] lg:w-[700px] h-auto md:h-[280px] lg:h-[350px] object-contain md:object-cover rounded-xl mb-6 bg-contain bg-center bg-no-repeat"
            />
          </div>

          <div className="w-full md:w-[450px] lg:w-[550px] text-[14px] md:text-[15px] text-gray-600 leading-[26px] md:leading-[28px] space-y-6 text-justify md:pl-10 lg:pl-15">

            <Topic topic="Our Mission" />
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              pariatur molestias similique, natus iste, ipsam vero pariatur molestias similique, natus iste, ipsam vero
              pariatur molestias similique, natus iste, ipsam vero pariatur molestias similique, natus iste, ipsam vero
              pariatur molestias similique, natus iste, ipsam vero pariatur molestias similique, natus iste, ipsam vero
            </p>
          </div>
        </div>
      </div>



      {/* Vision */}
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 md:px-6 py-8 md:mt-25 md:mb-25">
        <div className="flex flex-col-reverse md:flex-row justify-start items-start gap-6 md:gap-0">
          <div className="w-full md:w-[450px] lg:w-[550px] text-[14px] md:text-[15px] text-gray-600 leading-[26px] md:leading-[28px] space-y-6 text-justify md:pr-10 lg:pr-15">

            <Topic topic="Our Vision" />
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              pariatur molestias similique, natus iste, ipsam vero pariatur molestias similique, natus iste, ipsam vero
              pariatur molestias similique, natus iste, ipsam vero pariatur molestias similique, natus iste, ipsam vero
              pariatur molestias similique, natus iste, ipsam vero pariatur molestias similique, natus iste, ipsam vero
            </p>
          </div>

          <div className="w-full flex justify-center md:block">
            <img
              src={vission}
              alt="Vision"
              className="w-[80%] max-w-[300px] md:max-w-none md:w-[500px] lg:w-[700px] h-auto md:h-[280px] lg:h-[350px] object-contain md:object-cover rounded-xl mb-6 bg-contain bg-center bg-no-repeat"
            />
          </div>


        </div>
      </div>


      <Footer />
    </>
  );
}

export default About;
