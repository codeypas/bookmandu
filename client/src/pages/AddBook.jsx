"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../utils/api.js" 

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    image: "",
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      setCurrentUser(parsedUser)
      if (!parsedUser.isAdmin) {
        alert("You must be an admin to add books.")
        navigate("/") // Redirect non-admins
      }
    } else {
      alert("You must be logged in to add books.")
      navigate("/signin") // Redirect if not logged in
    }
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result) 
        setForm((prevForm) => ({ ...prevForm, image: reader.result }))
      }
      reader.readAsDataURL(file)
    } else {
      setImageFile(null)
      setImagePreview("")
      setForm((prevForm) => ({ ...prevForm, image: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currentUser?.isAdmin) {
      alert("You do not have permission to add books.")
      return
    }

    try {

      await api.post("/api/books", form)
      alert("Book added successfully!")
      navigate("/booklist")
    } catch (err) {
      console.error("Error adding book:", err)
      if (err.response && err.response.status === 403) {
        alert("You do not have permission to add books.")
      } else {
        alert("Error adding book. Please try again.")
      }
    }
  }

  if (!currentUser || !currentUser.isAdmin) {
    return null
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Add New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Book Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author Name"
            value={form.author}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Genre (e.g., Fiction, Fantasy)"
            value={form.genre}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Book Cover Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <div className="mt-4 text-center">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Image Preview"
                className="max-w-full h-48 object-contain mx-auto rounded-md shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-2">Image Preview</p>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300 shadow-md"
        >
          Add Book
        </button>
      </form>
    </div>
  )
}

export default AddBook
