import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use the environment variable for the base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;