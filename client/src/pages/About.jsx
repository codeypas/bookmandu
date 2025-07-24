export default function About() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-6 flex-grow">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to <span className="text-purple-600">BookMandu</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-prose mx-auto">
          Bookmandu is your go-to platform for discovering new books, reading honest reviews, and sharing your own thoughts with a vibrant community of book lovers. Whether you're exploring your next favorite read or sharing insights from the last one, Bookmandu connects readers through the power of stories.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-10">
          <div>
            <h2 className="text-3xl font-bold text-purple-700 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              At Bookmandu, we envision a world where every reader—regardless of background or experience—can discover books that resonate, share honest and thoughtful reviews, and connect with a vibrant community of fellow book lovers. We aim to make book exploration more meaningful by building a trusted, inclusive, and inspiring space that celebrates the power of stories and the voices of readers everywhere.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-purple-700 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Extensive collection of books across all genres.</li>
              <li>Platform for users to add and review books.</li>
              <li>Community-driven average ratings for informed choices.</li>
              <li>Easy filtering and search options to find your next read.</li>
              <li>Admin tools for content management.</li>
            </ul>
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-10">
          Join us on this literary journey and become a part of the BookMandu family!
        </p>
      </div>
    </div>
  )
}
