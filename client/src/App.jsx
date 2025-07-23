import React from "react"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Header from "../component/Header"
import Footer from "../component/Footer"
import SignUp from "./pages/Signup"
import Signin from "./pages/Signin"

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<Signin/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
