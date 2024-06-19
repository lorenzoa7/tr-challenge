import { apiBaseUrl } from '@/config/site'
import axios from 'axios'

export const api = axios.create({
  baseURL: apiBaseUrl,
})
