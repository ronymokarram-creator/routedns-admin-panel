import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8404'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (apiKey) => api.post('/auth/login', { apiKey }),
}

export const tenantAPI = {
  getAll: () => api.get('/tenants'),
  getOne: (id) => api.get(`/tenants/${id}`),
  create: (data) => api.post('/tenants', data),
  update: (id, data) => api.put(`/tenants/${id}`, data),
  delete: (id) => api.delete(`/tenants/${id}`),
}

export const deviceAPI = {
  getAll: (tenantId) => api.get(`/devices?tenant=${tenantId}`),
  block: (deviceId) => api.post(`/devices/${deviceId}/block`),
  unblock: (deviceId) => api.delete(`/devices/${deviceId}/block`),
}

export const logsAPI = {
  getDNSLogs: (limit = 100) => api.get(`/logs/dns?limit=${limit}`),
  getConnectionLogs: (limit = 100) => api.get(`/logs/connections?limit=${limit}`),
}

export default api
