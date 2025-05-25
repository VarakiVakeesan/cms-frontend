import './App.css'
import ComplaintPage from './pages/ComplaintPortalPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/navbar/NavBar'
import AdminLoginPage from './pages/AdminLoginPage'
import ResponsePage from './pages/ResponsePage'
import AdminProtectedRoute from './components/adminLogin/AdminProtectedRoute'
import AdminComplaintListPage from './pages/AdminComplaintListPage'
import AdminDashboard from './components/adminDashboard/AdminDashboard'
import AdminDashBoardPage from './pages/AdminDashBoardPage'
import AdminPanel from './components/adminPanel/AdminPanel'
import AdminFlatOwnerList from './components/adminPanel/AdminFlatOwnerList'

function App() {

  return (
   <BrowserRouter>
   <NavBar/>
    <Routes>
    <Route path="/complaint" element={<ComplaintPage/>} />
    <Route path="/" element={<HomePage/>} />
    <Route path="/admin-login" element={<AdminLoginPage/>} />
    <Route path='/response' element={<ResponsePage/>} />
    <Route path="/admin/complaints" element={
          <AdminProtectedRoute>
            <AdminComplaintListPage/>
          </AdminProtectedRoute>
        } />
    
    <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
    <AdminDashBoardPage/>
          </AdminProtectedRoute>
    } />
    <Route path="/admin-panel" element={
      <AdminProtectedRoute>
        <AdminPanel/>
      </AdminProtectedRoute>
    } />
    <Route path="/admin-flat-owners" element={
      <AdminProtectedRoute>
        <AdminFlatOwnerList/>
      </AdminProtectedRoute>
    } />
    </Routes>
   </BrowserRouter>
  )
}

export default App
