import express from "express"
import Book from "../models/Book.js"
import Review from "../models/Review.js"
import jwt from "jsonwebtoken"

const router = express.Router()

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.cookies.access_token // Get token from httpOnly cookie
  if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
}

// Middleware to verify Admin role
function verifyAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admin access required" })
  }
  next()
}

// GET /books?title=&author=&page=  => List with filter, rating, pagination
router.get("/", async (req, res) => {
  try {
    const { title, author, page = 1 } = req.query 
    const limit = 12 
    const skip = (page - 1) * limit

    const filter = {}
    if (title) filter.title = { $regex: title, $options: "i" } // Case-insensitive regex for title
    if (author) filter.author = { $regex: author, $options: "i" }

    const books = await Book.find(filter).skip(skip).limit(limit)

    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ bookId: book._id })
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)
        return { ...book._doc, avgRating: avgRating.toFixed(1) }
      }),
    )

    const total = await Book.countDocuments(filter)

    res.json({
      books: booksWithRatings,
      currentPage: Number.parseInt(page),
      totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
})

// POST /books => Add new book (JWT Protected, Admin Only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const { title, author, genre, image } = req.body
  if (!title || !author || !genre) {
    return res.status(400).json({ message: "All fields are required" })
  }

  try {
    const newBook = new Book({ title, author, genre, image })
    await newBook.save()
    res.status(201).json({ message: "Book added successfully", book: newBook })
  } catch (err) {
    res.status(500).json({ message: "Failed to add book" })
  }
})

// DELETE /books/:id => Delete a book (JWT Protected, Admin Only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const bookId = req.params.id
    const book = await Book.findByIdAndDelete(bookId)

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    // Also delete all reviews associated with this book
    await Review.deleteMany({ bookId: bookId })

    res.status(200).json({ message: "Book and associated reviews deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete book" })
  }
})

// GET /books/:id => Book detail with reviews
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: "Book not found" })

    const reviews = await Review.find({ bookId: book._id })
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1)

    res.json({
      book,
      reviews,
      avgRating: avgRating.toFixed(1),
    })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// POST /books/:id/reviews => Add a review (JWT Protected, One per user per book)
router.post("/:id/reviews", verifyToken, async (req, res) => {
  const { review_text, rating } = req.body
  const bookId = req.params.id
  const reviewerUsername = req.user.username 

  if (!review_text || !rating) {
    return res.status(400).json({ message: "Review text and rating are required" })
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" })
  }

  try {
    // Check if the user has already reviewed this book
    const existingReview = await Review.findOne({ bookId: bookId, reviewer: reviewerUsername })
    if (existingReview) {
      return res.status(409).json({ message: "You have already reviewed this book." })
    }

    const review = new Review({
      bookId: bookId,
      reviewer: reviewerUsername, // Use the username from the token
      review_text,
      rating,
    })

    await review.save()
    res.status(201).json({ message: "Review added", review })
  } catch (err) {
    res.status(500).json({ message: "Failed to add review" })
  }
})

export default router
