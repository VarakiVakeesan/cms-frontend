import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'; // For latest v5+ (or 'antd/dist/antd.css' for older)
import './index.css'; // Your custom styles
import App from './App.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <App />
    </AdminAuthProvider>
  </StrictMode>,
)
