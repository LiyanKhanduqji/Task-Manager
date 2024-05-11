import axios from 'axios'

const API_URL = 'https://api.slingacademy.com/v1/sample-data/blog-posts'

export const fetchAllTasks = async () => {
  try {
    const response = await axios.get(API_URL)
    return response
  } catch (error) {
    console.error('Error fetching tasks from API:', error)
    throw error
  }
}
