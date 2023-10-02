// axiosInstance.js
import axios from "axios";

// Create a custom Axios instance with your desired configuration
const axiosInstance = axios.create({
  baseURL: "https://your-api-base-url.com", // Replace with your API base URL
  // Add other configuration options as needed
});

export default axiosInstance;
