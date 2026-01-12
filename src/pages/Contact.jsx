import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function Contact() {
  return (
    <>
      <Header />
      <NavBar />

      {/* Contact Section */}
      <section className="relative w-full bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Title */}
          <h2 className="text-center text-3xl md:text-4xl font-semibold text-purple-600 mb-12">
            Let’s Get In Touch
          </h2>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* First Name */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                First Name*
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-purple-500"
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
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-purple-500"
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
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-purple-500"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Contact Number*
              </label>
              <div className="flex border rounded-md overflow-hidden focus-within:border-purple-500">
                <span className="px-3 py-2 bg-gray-100 text-sm text-gray-600">
                  +94
                </span>
                <input
                  type="text"
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-2 outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Your Message*
              </label>
              <textarea
                rows="6"
                placeholder="Enter your message"
                className="w-full border rounded-md px-4 py-3 outline-none resize-none focus:border-purple-500"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end items-center gap-6 mt-4">
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
