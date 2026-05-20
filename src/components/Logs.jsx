import React, { useState, useEffect } from 'react'
import { Download, Filter } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      setLogs([
        { id: 1, timestamp: '2025-01-20 10:30:45', type: 'DNS', query: 'google.com', tenant: 'tt1', status: 'success', responseTime: '12ms' },
        { id: 2, timestamp: '2025-01-20 10:30:44', type: 'Connection', action: 'auth_success', ip: '192.168.1.100', tenant: 'tt1', status: 'success' },
        { id: 3, timestamp: '2025-01-20 10:30:40', type: 'DNS', query: 'facebook.com', tenant: 'tt2', status: 'blocked', responseTime: '-' },
      ])
    } catch (error) {
      toast.error('Failed to fetch logs')
    } finally {
      setLoading(false)
    }
  }

  const downloadLogs = () => {
    const csv = 'Timestamp,Type,Details,Status\n' + logs.map(l => `${l.timestamp},"${l.type}","${l.query || l.action || ''}","${l.status}"`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'routedns-logs.csv'
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Logs</h1>
        <button onClick={downloadLogs} className="flex items-center space-x-2 btn-primary">
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="card flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="outline-none bg-transparent">
          <option value="all">All Events</option>
          <option value="dns">DNS Queries</option>
          <option value="connection">Connections</option>
          <option value="error">Errors</option>
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left font-semibold">Timestamp</th>
              <th className="px-6 py-3 text-left font-semibold">Type</th>
              <th className="px-6 py-3 text-left font-semibold">Details</th>
              <th className="px-6 py-3 text-left font-semibold">Tenant</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{log.timestamp}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">{log.type}</span></td>
                  <td className="px-6 py-4">{log.query || log.action || log.ip}</td>
                  <td className="px-6 py-4">{log.tenant}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${log.status === 'success' ? 'bg-green-100 text-green-800' : log.status === 'blocked' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No logs found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
