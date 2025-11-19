import axios from 'axios';

const API_BASE_URL = axios.create({
    baseURL: 'https://localhost:7291/api',
});

export const getAllDevices = () => API_BASE_URL.get("Device");