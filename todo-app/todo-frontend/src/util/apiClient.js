import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

console.log('apiClient: ', apiClient)
export default apiClient