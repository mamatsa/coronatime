import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://coronatime-api.devtest.ge/api',
});

export default axiosInstance;
