import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Book Review Platform</h1>
      <p className="intro-text">
        Discover new books, share your reviews, and rate your favorite reads!
      </p>

      <div className="nav-buttons">
        <button onClick={() => navigate("/books")} className="home-button">
          Browse Books
        </button>
        <button onClick={() => navigate("/add-book")} className="home-button">
          Add New Book
        </button>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
