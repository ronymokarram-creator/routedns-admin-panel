import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('routedns-token') || null,
  user: JSON.parse(localStorage.getItem('routedns-user') || 'null'),
  
  setToken: (token) => {
    localStorage.setItem('routedns-token', token)
    set({ token })
  },
  
  setUser: (user) => {
    localStorage.setItem('routedns-user', JSON.stringify(user))
    set({ user })
  },
  
  logout: () => {
    localStorage.removeItem('routedns-token')
    localStorage.removeItem('routedns-user')
    set({ token: null, user: null })
  },
}))
