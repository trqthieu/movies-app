import axios from 'axios'

const mainAxiosClient = axios.create({
  baseURL: process.env.REACT_APP_MAIN_API_URL,
})
export const imageAxiosClient = axios.create({
  baseURL: process.env.REACT_APP_IMAGE_API_URL,
})

export default mainAxiosClient
