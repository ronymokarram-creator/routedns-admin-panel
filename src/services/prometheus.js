import axios from 'axios'

const PROMETHEUS_BASE = import.meta.env.VITE_PROMETHEUS_URL || 'http://localhost:9090'

const prometheus = axios.create({
  baseURL: PROMETHEUS_BASE,
})

export const prometheusAPI = {
  query: (query) => 
    prometheus.get('/api/v1/query', { params: { query } }),
  
  queryRange: (query, start, end, step = '15s') =>
    prometheus.get('/api/v1/query_range', {
      params: { query, start, end, step }
    }),
  
  getMetrics: async () => {
    try {
      const response = await prometheus.get('/api/v1/label/__name__/values')
      return response.data.data || []
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
      return []
    }
  },
}

export default prometheus
