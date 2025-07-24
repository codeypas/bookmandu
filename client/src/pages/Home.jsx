import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      setCurrentUser(null)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex-grow">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-2xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to <span className="text-blue-600">BookMandu</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-prose mx-auto">
          Your ultimate platform to discover new books, share insightful reviews, and rate your favorite reads. Dive
          into a world of literature!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
          {currentUser ? (
            // If user is logged in, show "Browse Books"
            <Link
              to="/booklist"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              Browse Books
            </Link>
          ) : (
            // If user is not logged in, show "Sign Up or Login to see Book Review"
            <Link
              to="/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center text-center"
            >
              Sign Up or Login to see Book Review
            </Link>
          )}

          {currentUser?.isAdmin && ( // Only show if admin
            <Link
              to="/addbook"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              Add New Book
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
