export default function Services() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-100 p-6 flex-grow">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Our <span className="text-teal-600">Services</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-prose mx-auto">
          BookMandu offers a suite of services designed to enhance your reading and book management experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <div className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">Book Discovery</h2>
            <p className="text-gray-700">
              Explore a vast collection of books, filter by genre or author, and find your next favorite read with ease.
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">Community Reviews</h2>
            <p className="text-gray-700">
              Share your thoughts and insights by writing reviews and rating books. See what others are saying before
              you dive in.
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">Personalized Reading</h2>
            <p className="text-gray-700">
              Track books you've read, want to read, and get recommendations based on your preferences (coming soon!).
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">Author & Publisher Tools</h2>
            <p className="text-gray-700">
              For verified authors and publishers, add your books to our growing database and connect with readers.
            </p>
          </div>
          <div className="bg-teal-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-teal-700 mb-3">Admin Content Management</h2>
            <p className="text-gray-700">
              Admins have powerful tools to manage book listings, ensuring a high-quality and curated collection.
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-10">
          We are continuously expanding our services to bring you the best book experience!
        </p>
      </div>
    </div>
  )
}
