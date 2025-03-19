import React from "react"
import Home from "./pages/Home"
import { BrowserRouter,Route,Routes } from "react-router";
import Uploads from "./pages/Uploads";
function App() {
  

  return (
   <BrowserRouter>
   <Routes>

    <Route path="/" element={<Home/>} />
    <Route path="/uploads" element={<Uploads/>} />
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
