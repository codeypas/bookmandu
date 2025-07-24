export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 p-6 flex-grow">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Contact <span className="text-orange-600">BookMandu</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-prose mx-auto">
          Have questions, feedback, or just want to say hello? We'd love to hear from you! Reach out to us through the
          channels below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-10">
          <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-orange-700 mb-3">General Inquiries</h2>
            <p className="text-gray-700 mb-2">
              Email:{" "}
              <a href="mailto:info@bookmandu.com" className="text-blue-600 hover:underline">
                info@bookmandu.com
              </a>
            </p>
            <p className="text-gray-700">Phone: +91-7019739574</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-orange-700 mb-3">Support</h2>
            <p className="text-gray-700 mb-2">
              Email:{" "}
              <a href="mailto:support@bookmandu.com" className="text-blue-600 hover:underline">
                support@bookmandu.com
              </a>
            </p>
            <p className="text-gray-700">Available: Mon-Fri, 9 AM - 5 PM EST</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 md:col-span-2">
            <h2 className="text-2xl font-bold text-orange-700 mb-3">Our Location</h2>
            <p className="text-gray-700">
              BMS College of Engineering,
              <br />
              Bull Temple Road,
              <br />
              Bangalore - 560019
              <br />
              Nepal
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-10">We look forward to connecting with you!</p>
      </div>
    </div>
  )
}
