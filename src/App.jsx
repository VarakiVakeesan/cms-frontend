import './App.css'
import ComplaintPage from './pages/ComplaintPortalPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/navbar/NavBar'
import AdminLoginPage from './pages/AdminLoginPage'
import ResponsePage from './pages/ResponsePage'

function App() {

  return (
   <BrowserRouter>
   <NavBar/>
    <Routes>
    <Route path="/complaint" element={<ComplaintPage/>} />
    <Route path="/" element={<HomePage/>} />
    <Route path="/admin-login" element={<AdminLoginPage/>} />
    <Route path='/response' element={<ResponsePage/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
