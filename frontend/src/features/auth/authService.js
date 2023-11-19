import axios from "axios";

const API_URL = "/api/admin";

const login = async (adminData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.config.data));
  }

  return response.data
};

const logout = () => {
  localStorage.removeItem("admin");
};

const authService = {
    login,
    logout
};

export default authService;
