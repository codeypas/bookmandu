import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "../component/Header"
import Footer from "../component/Footer"
import SignUp from "./pages/Signup"
import Signin from "./pages/Signin"
import BookList from "./pages/BookList"
import AddBook from "./pages/AddBook"
import BookDetail from "./pages/BookDetail"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {" "}
        <Header />
        <main className="flex-grow">
          {" "}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
