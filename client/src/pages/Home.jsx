"use client"
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

  const handleLogout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
    window.dispatchEvent(new Event("logoutEvent"))
    navigate("/signin")
  }

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
          <Link
            to="/booklist"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            Browse Books
          </Link>
          {currentUser?.isAdmin && ( // Only show if admin
            <Link
              to="/addbook"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              Add New Book
            </Link>
          )}
        </div>

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/signin"
            className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}
