import React, { useState, useEffect } from 'react'
import { Trash2, Lock, Unlock } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Devices() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    try {
      setLoading(true)
      setDevices([
        { id: 1, tenant: 'tt1', ip: '192.168.1.100', lastSeen: '2 mins ago', blocked: false },
        { id: 2, tenant: 'tt2', ip: '192.168.1.101', lastSeen: '10 mins ago', blocked: false },
        { id: 3, tenant: 'tt1', ip: '192.168.1.102', lastSeen: '1 hour ago', blocked: true },
      ])
    } catch (error) {
      toast.error('Failed to fetch devices')
    } finally {
      setLoading(false)
    }
  }

  const handleBlock = async (deviceId) => {
    try {
      toast.success('Device blocked')
      fetchDevices()
    } catch (error) {
      toast.error('Failed to block device')
    }
  }

  const handleUnblock = async (deviceId) => {
    try {
      toast.success('Device unblocked')
      fetchDevices()
    } catch (error) {
      toast.error('Failed to unblock device')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Devices</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold">IP Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Tenant</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Last Seen</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
            ) : devices.length > 0 ? (
              devices.map((device) => (
                <tr key={device.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm">{device.ip}</td>
                  <td className="px-6 py-4">{device.tenant}</td>
                  <td className="px-6 py-4 text-sm">{device.lastSeen}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${device.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {device.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2 flex">
                    {device.blocked ? (
                      <button onClick={() => handleUnblock(device.id)} className="p-2 hover:bg-green-100 rounded text-green-600">
                        <Unlock className="w-4 h-4" />
                      </button>
                    ) : (
                      <button onClick={() => handleBlock(device.id)} className="p-2 hover:bg-red-100 rounded text-red-600">
                        <Lock className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">No devices found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
