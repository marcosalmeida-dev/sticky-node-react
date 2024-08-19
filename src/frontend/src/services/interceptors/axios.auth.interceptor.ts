import axios from "axios";

const baseURL = "http://localhost:5000/api";

// Create an instance of Axios
const axiosInterceptorInstance = axios.create({
  baseURL: baseURL, // Adjust the baseURL as needed
});

// Add a request interceptor to include the JWT token
axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    // Retrieve the JWT token from localStorage or any other secure storage
    const token = localStorage.getItem("jwtToken");
    if (token) {
      console.log("Existing token: " + token);
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      // Redirect to login page if token is not found
      console.log("No token found, redirecting to login...");
      window.location.href = "/login"; // Redirect to login route
    }
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 || error.response && error.response.status === 400) {
      // If the response status is 401 (Unauthorized), the token might be invalid
      console.log("Invalid token, redirecting to register...");
      window.location.href = "/login"; // Redirect to register route
    }
    // Handle other errors
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
