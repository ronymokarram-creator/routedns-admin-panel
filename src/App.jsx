import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './components/Dashboard'
import Tenants from './components/Tenants'
import Devices from './components/Devices'
import Logs from './components/Logs'
import Settings from './components/Settings'
import { useAuthStore } from './store/authStore'

export default function App() {
  const { token } = useAuthStore()

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={token ? <Home /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="devices" element={<Devices />} />
          <Route path="logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="" element={<Navigate to="dashboard" />} />
        </Route>
      </Routes>
    </Router>
  )
}
