"use client"

import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom" 
import api from "../utils/api.js" // Import your custom axios instance

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState("N/A")
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasReviewed, setHasReviewed] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate() 

 
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  // Effect to fetch book details and reviews
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/api/books/${id}`)
        setBook(res.data.book)
        setReviews(res.data.reviews)
        setAvgRating(res.data.avgRating)
        setLoading(false)

        // Check if current user has reviewed this book
        if (currentUser && res.data.reviews.some((r) => r.reviewer === currentUser.username)) {
          setHasReviewed(true)
        } else {
          setHasReviewed(false)
        }
      } catch (err) {
        console.error("Error fetching book details:", err)
        setError("Failed to load book details.")
        setLoading(false)
      }
    }

    fetchBook()
  }, [id, currentUser]) 
  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!reviewText || !rating) {
      alert("Review text and rating are required.")
      return
    }

    try {
      await api.post(`/api/books/${id}/reviews`, {
        review_text: reviewText,
        rating: Number.parseInt(rating),
      })
      setReviewText("")
      setRating(5)
      alert("Review submitted successfully!")
      const res = await api.get(`/api/books/${id}`)
      setBook(res.data.book)
      setReviews(res.data.reviews)
      setAvgRating(res.data.avgRating)
      setHasReviewed(true) 
    } catch (err) {
      console.error("Error submitting review:", err)
      if (err.response && err.response.status === 409) {
        alert(err.response.data.message) 
      } else if (err.response && err.response.status === 401) {
        alert("You must be logged in to submit a review.")
      } else {
        alert("Failed to submit review. Please try again.")
      }
    }
  }

  if (loading) return <p className="text-center mt-8">Loading book details...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>
  if (!book) return <p className="text-center mt-8">Book not found</p>

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg my-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          &larr; Go Back
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={book.image || "/placeholder.svg?height=400&width=300&query=book cover"}
            alt={book.title}
            className="w-full h-auto object-cover rounded-lg shadow-md max-h-96" 
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/placeholder.svg?height=400&width=300"
            }}
          />
        </div>
        <div className="md:w-2/3 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-700 mb-2">
            by <span className="font-semibold">{book.author}</span>
          </p>
          <p className="text-lg text-gray-600 mb-4">Genre: {book.genre}</p>
          <div className="flex items-center justify-center md:justify-start text-yellow-500 text-2xl font-bold mb-6">
            <span className="mr-2">⭐</span> {avgRating} (Average Rating)
          </div>
          <p className="text-gray-800 leading-relaxed mb-6">{book.description || "No description available."}</p>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h2>
      {currentUser && !hasReviewed ? (
        <form onSubmit={handleReviewSubmit} className="my-4 space-y-4 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800">Add Your Review</h3>
          <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px]"
            required
          />
          <div className="flex items-center gap-4">
            <label htmlFor="rating" className="text-gray-700 font-medium">
              Rating:
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            Submit Review
          </button>
        </form>
      ) : currentUser && hasReviewed ? (
        <p className="text-center text-gray-600 p-4 border rounded-lg bg-blue-50">
          You have already submitted a review for this book.
        </p>
      ) : (
        <p className="text-center text-gray-600 p-4 border rounded-lg bg-yellow-50">
          Please{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            sign in
          </Link>{" "}
          to add a review.
        </p>
      )}

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center mt-8">No reviews yet. Be the first to review this book!</p>
      ) : (
        <div className="space-y-4 mt-8">
          {reviews.map((r) => (
            <div key={r._id} className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-800">{r.reviewer}</p>
                <p className="text-yellow-500 font-semibold">⭐ {r.rating}</p>
              </div>
              <p className="text-gray-700">{r.review_text}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BookDetail
