import axios from 'axios';

const API_BASE_URL = axios.create({
    baseURL: 'https://localhost:7291/api',
});

//APIS DISPOSITIVOS
export const getAllDevices = () => API_BASE_URL.get("/Device");
export const addDevice = (data) => API_BASE_URL.post("/Device", data)
export const updateDevice = (id, data) => API_BASE_URL.put(`/Device/${id}`, data);
export const deleteDevice = (id) => API_BASE_URL.delete(`/Device/${id}`);

// PATRON MEMENTO
export const createSnapshot = (id) => API_BASE_URL.post(`Device/${id}/snapshot`); // Crear
export const getSnapshotsHistory = (id) => API_BASE_URL.get(`Device/${id}/history`); // Obtener
export const restoreSnapshot = (deviceId, snapshotId) => API_BASE_URL.post(`Device/${deviceId}/restore/${snapshotId}`); // Restaurar