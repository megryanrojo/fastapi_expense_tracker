import { useState, useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'
import LandingPage from './pages/landingpage'
import TransactionPage from './pages/transaction'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/transactions' element={<TransactionPage/>}></Route>
      </Routes>
    </>
  )
}
export default App
