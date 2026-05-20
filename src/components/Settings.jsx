import React, { useState } from 'react'
import { Save } from 'lucide-react'
import { toast } from 'react-toastify'

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'RouteDNS',
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8404',
    prometheusUrl: import.meta.env.VITE_PROMETHEUS_URL || 'http://localhost:9090',
    refreshInterval: 30,
    logRetention: 30,
    enableNotifications: true,
  })

  const handleSave = () => {
    localStorage.setItem('routedns-settings', JSON.stringify(settings))
    toast.success('Settings saved')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Settings</h1>

      <div className="card space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">API URL</label>
          <input
            type="text"
            value={settings.apiUrl}
            onChange={(e) => setSettings({ ...settings, apiUrl: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Prometheus URL</label>
          <input
            type="text"
            value={settings.prometheusUrl}
            onChange={(e) => setSettings({ ...settings, prometheusUrl: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Refresh Interval (seconds)</label>
          <input
            type="number"
            value={settings.refreshInterval}
            onChange={(e) => setSettings({ ...settings, refreshInterval: parseInt(e.target.value) })}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Log Retention (days)</label>
          <input
            type="number"
            value={settings.logRetention}
            onChange={(e) => setSettings({ ...settings, logRetention: parseInt(e.target.value) })}
            className="input-field"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.enableNotifications}
            onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
            id="notifications"
            className="w-4 h-4"
          />
          <label htmlFor="notifications" className="text-sm font-medium">Enable Notifications</label>
        </div>

        <button onClick={handleSave} className="flex items-center space-x-2 btn-primary">
          <Save className="w-5 h-5" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  )
}
