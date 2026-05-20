import axios from 'axios'

const HAPROXY_BASE = import.meta.env.VITE_HAPROXY_URL || 'http://localhost:8404'

const haproxy = axios.create({
  baseURL: HAPROXY_BASE,
})

export const haproxyAPI = {
  getStats: async () => {
    try {
      const response = await haproxy.get('/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch HAProxy stats:', error)
      return null
    }
  },

  getMetrics: async () => {
    try {
      const response = await haproxy.get('/metrics')
      return response.data
    } catch (error) {
      console.error('Failed to fetch HAProxy metrics:', error)
      return null
    }
  },

  getHealth: async () => {
    try {
      const response = await haproxy.get('/health')
      return response.data
    } catch (error) {
      return { status: 'down' }
    }
  },
}

export default haproxy
