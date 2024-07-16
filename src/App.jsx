import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import TenderDetails from './pages/tenderDetails/TenderDetails'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/view-tender' element={<TenderDetails />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App
