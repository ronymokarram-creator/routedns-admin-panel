import React, { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Activity, AlertCircle, CheckCircle, Users } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    connections: 0,
    requests: 0,
    errors: 0,
    uptime: 0,
  })
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStats({
          connections: Math.floor(Math.random() * 10000),
          requests: Math.floor(Math.random() * 50000),
          errors: Math.floor(Math.random() * 500),
          uptime: 99.8,
        })

        setChartData(
          Array.from({ length: 12 }, (_, i) => ({
            name: `${i}:00`,
            requests: Math.floor(Math.random() * 5000),
            errors: Math.floor(Math.random() * 200),
          }))
        )
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const StatCard = ({ icon: Icon, label, value, unit }) => (
    <div className="card flex items-center space-x-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold">{value.toLocaleString()}{unit}</p>
      </div>
    </div>
  )

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Active Connections" value={stats.connections} unit="" />
        <StatCard icon={Users} label="Total Requests" value={stats.requests} unit="" />
        <StatCard icon={AlertCircle} label="Errors" value={stats.errors} unit="" />
        <StatCard icon={CheckCircle} label="Uptime" value={stats.uptime} unit="%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Requests Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="requests" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Error Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="errors" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Tenant request from {Math.random().toString(36).substring(7)}</p>
              <span className="text-xs text-gray-500">2 mins ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
