import axios from 'axios'

// Allow the test harness to override the backend origin by setting
// TEST_BASE_URL in the environment. This lets the integration tests
// start the server on an ephemeral or non-default port and inform the
// client where to send requests.
const baseURL = process.env.TEST_BASE_URL || 'http://localhost:4000/api'

export const api = axios.create({
  baseURL
})

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
