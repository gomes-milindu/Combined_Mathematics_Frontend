import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { ChevronDown } from "lucide-react";
import Assets from "../data/AssetLinks";

function Contact() {
  return (
    <>
      <Header
        backgroundImage={Assets.Hero_Contact}
        heroTitle="Get in Touch and"
        heroSubtitle="Start Your Learning Journey"
      />
      <NavBar />

      {/* Contact Section */}
      <section className="relative w-full bg-white py-10 md:py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Title */}
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-600 mb-8 md:mb-12">
            Let's Get In Touch
          </h2>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            {/* First Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                First Name*
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-purple-500 border-[#D5D7DA]"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Last Name*
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-purple-500 border-[#D5D7DA]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-purple-500 border-[#D5D7DA]"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contact Number*
              </label>
              <div className="flex border rounded-md overflow-hidden focus-within:border-purple-500 border-[#D5D7DA]">
                <div className="flex items-center px-3 py-2 bg-white border-r border-[#D5D7DA] text-sm text-gray-600 shrink-0 cursor-pointer">
                  <span>+94</span>
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-2 outline-none border-[#D5D7DA]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Your Message*
              </label>
              <textarea
                rows="5"
                placeholder="Enter your message"
                className="w-full border rounded-md px-4 py-3 outline-none resize-none focus:border-purple-500 border-[#D5D7DA]"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-center md:justify-end items-center gap-4 md:gap-6 mt-2 md:mt-4">
              <button
                type="reset"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-md transition"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
