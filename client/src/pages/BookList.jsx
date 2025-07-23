"use client"

import { useEffect, useState } from "react"
import api from "../utils/api.js"
import { Link } from "react-router-dom"

const DEFAULT_IMAGE = "/placeholder.svg?height=400&width=200"

// Fallback sample data (for development/empty state)
const sampleBooks = [
  {
    _id: "sample1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    avgRating: 4.5,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    _id: "sample2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    avgRating: 4.7,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    _id: "sample3",
    title: "No Image Book",
    author: "Unknown",
    genre: "Mystery",
    avgRating: 3.2,
    image: "",
  },
]

const BookList = () => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState("")
  const [author, setAuthor] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const fetchBooks = async () => {
    try {
      const res = await api.get("/api/books", {
        params: { genre, author, page },
      })
      if (res.data?.books?.length > 0) {
        setBooks(res.data.books)
        setTotalPages(res.data.totalPages || 1)
      } else {
        setBooks(sampleBooks) // fallback if no books returned
        setTotalPages(1)
      }
    } catch (err) {
      console.error("Error fetching books", err)
      setBooks(sampleBooks) // fallback on error
      setTotalPages(1)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [genre, author, page])

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book and all its reviews?")) {
      return
    }
    try {
      await api.delete(`/api/books/${bookId}`)
      alert("Book deleted successfully!")
      fetchBooks() // Refresh the list
    } catch (err) {
      console.error("Error deleting book:", err)
      if (err.response && err.response.status === 403) {
        alert("You do not have permission to delete books.")
      } else {
        alert("Failed to delete book. Please try again.")
      }
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Browse Books</h1>

      {/* Filters and Add Book Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center sm:justify-between bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            placeholder="Filter by Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
          />
          <input
            placeholder="Filter by Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
          />
          <button
            onClick={() => {
              setGenre("")
              setAuthor("")
              setPage(1)
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md transition duration-300 w-full sm:w-auto"
          >
            Clear Filters
          </button>
        </div>
        {currentUser?.isAdmin && (
          <Link
            to="/addbook"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-md shadow-md transition duration-300 w-full sm:w-auto text-center"
          >
            + Add New Book
          </Link>
        )}
      </div>

      {/* Book Cards */}
      {books.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">No books found matching your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden flex flex-col"
            >
              <Link to={`/book/${book._id}`} className="block">
                <img
                  src={book.image?.trim() ? book.image : DEFAULT_IMAGE}
                  alt={book.title}
                  className="w-full h-60 object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = DEFAULT_IMAGE
                  }}
                />
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                <Link to={`/book/${book._id}`} className="block">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h2>
                </Link>
                <p className="text-gray-700 text-lg mb-1">by {book.author}</p>
                <p className="text-gray-500 text-base mb-3">{book.genre}</p>
                <div className="flex items-center text-yellow-600 font-semibold text-lg mb-4">
                  <span className="mr-1">⭐</span> {book.avgRating || "0.0"}
                </div>
                {currentUser?.isAdmin && (
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 self-start"
                  >
                    Delete Book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-center gap-4 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-300"
        >
          Previous
        </button>
        <span className="font-medium text-lg text-gray-800">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default BookList
