import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import RoleSelection from './pages/RoleSelection'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('dc_user')
  return user ? children : <Navigate to="/join" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/join" element={<RoleSelection />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
