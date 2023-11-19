import axios from "axios";

const API_URL = "/api/clients";

const createClient = async (clientData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, clientData, config);

  return response.data;
};

const getClients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const deleteClient = async (clientId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + clientId, config);

  return response.data;
};

const clientService = {
  createClient,
  getClients,
  deleteClient
};

export default clientService;
