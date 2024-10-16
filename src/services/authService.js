import axios from "axios";

// Create an Axios instance with the base URL and default headers
const apiClient = axios.create({
  baseURL: "http://localhost:8000/auth", // Update this URL as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (userInfo) => {
  try {
    const response = await apiClient.post(`/register`, userInfo);

    return { success: true, data: response.data };
  } catch (error) {
    // If the server provides an error message, use it
    if (error.response && error.response.data && error.response.data.message) {
      // throw new Error(error.response.data.message);
      return { success: false, error: error.response.data.message };
    }
    // throw new Error("Registration Failed");
    return { success: false, error: "Registration Failed" };
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await apiClient.post(`/verifyemail?token=${token}`);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      // throw new Error(error.response.data.message);
      return { success: false, error: error.response.data.message };
    }
    return { success: false, error: "Verification failed" };
  }
};
