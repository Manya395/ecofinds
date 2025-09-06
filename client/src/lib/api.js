import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

const api = axios.create({
  baseURL: API_BASE,
})

export function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  localStorage.setItem('ecofinds_token', token)
}
export function clearToken() {
  delete api.defaults.headers.common['Authorization']
  localStorage.removeItem('ecofinds_token')
}
export function getToken() {
  return localStorage.getItem('ecofinds_token')
}

export default api
