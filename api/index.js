import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import bookRoutes from "./routes/books.js"
import cookieParser from "cookie-parser" // Import cookie-parser

dotenv.config()

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser()) // Use cookie-parser middleware

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "API is working" })
})

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000....!")
})
