import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
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
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>

        <main className="flex-grow overflow-y-auto pt-[64px] pb-[64px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </main>

       
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
