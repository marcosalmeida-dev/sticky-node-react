import axios from "axios";

const PORT = process.env.PORT || 5000;
const baseURL = `http://localhost:${PORT}/api`;

const tokenKey = "jwtToken"; // Key used to store the JWT in localStorage
const userKey = "loggedInUser"; // Key used to store the logged-in user's name in localStorage

// Register a new user
export const registerUser = async (username: string, email: string, password: string) => {
  console.log(`Port env: ${PORT}`);
  try {
    const response = await axios.post(`${baseURL}/auth/register`, {
      username,
      email,
      password,
    });

    const token = response.data.token;
    if (token) {
      storeUserData(token, email);
      return true;
    }

    console.error("Registration error:", response);
    return false;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Log in a user and store the token and email in localStorage
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, {
      email,
      password,
    });

    const token = response.data.token;
    if (token) {
      storeUserData(token, email);
      return true;
    }

    console.error("Login error:", response);
    return false;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Store user data after register or login success
const storeUserData = (token: string, email: string) => {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, email);
};

// Get the current token from localStorage
export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

// Get the logged-in user's name from localStorage
export const getLoggedInUser = () => {
  return localStorage.getItem(userKey);
};

// Log out the user by removing the token and user name from localStorage
export const logoutUser = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
};

