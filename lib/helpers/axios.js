const axios = require('axios');

let axiosInstance;

const Client = () => {
  if (axiosInstance !== undefined) {
    return axiosInstance;
  }

  axiosInstance = axios.create();

  return axiosInstance;
};

module.exports = Client;
