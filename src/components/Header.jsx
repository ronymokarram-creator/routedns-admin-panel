import React, { useState, useEffect } from 'react'
import { Bell, ChevronDown } from 'lucide-react'
import { haproxyAPI } from '../services/haproxy'

export default function Header() {
  const [health, setHealth] = useState({})

  useEffect(() => {
    const checkHealth = async () => {
      const data = await haproxyAPI.getHealth()
      setHealth(data)
    }
    checkHealth()
    const interval = setInterval(checkHealth, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          <p className="text-xs text-gray-500">
            System Status: <span className={`font-bold ${health.status === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {health.status === 'up' ? '✓ Healthy' : '✗ Down'}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <span className="text-sm font-medium">Admin</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
