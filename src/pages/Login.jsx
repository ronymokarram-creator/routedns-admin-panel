import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Lock } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { authAPI } from '../services/api'

export default function Login() {
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setToken, setUser } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!apiKey.trim()) {
      toast.error('Please enter API key')
      return
    }

    setLoading(true)
    try {
      const response = await authAPI.login(apiKey)
      setToken(response.data.token)
      setUser(response.data.user)
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid API key')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">RouteDNS Admin</h1>
        <p className="text-gray-600 text-center mb-6">Enter your API key to login</p>

        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="input-field mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          API key from HAProxy Stats page
        </p>
      </div>
    </div>
  )
}
