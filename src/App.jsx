import { useState } from 'react'
import './App.css'
import Signup from './pages/Signup'
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
function App() {

  return (
    <Router>
      <Routes>
      <Route path='/'  element={<Home/>}/>
        <Route path='/signup'  element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
