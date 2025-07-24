import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  const updateCurrentUser = () => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    } else {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    updateCurrentUser()

    window.addEventListener("loginEvent", updateCurrentUser)
    window.addEventListener("logoutEvent", updateCurrentUser)

    return () => {
      window.removeEventListener("loginEvent", updateCurrentUser)
      window.removeEventListener("logoutEvent", updateCurrentUser)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
    window.dispatchEvent(new Event("logoutEvent"))
    navigate("/signin")
  }

  return (
    <header className="header fixed top-0 left-0 w-full z-50">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <span>BookMandu</span>
          </Link>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
  <li>
    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
  </li>
  <li>
    <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
  </li>
  <li>
    <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
  </li>
  <li>
    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
  </li>
</ul>


        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="navbar-actions">
          {currentUser ? (
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          ) : (
            <Link to="/signin" className="btn">
              SignIn
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
