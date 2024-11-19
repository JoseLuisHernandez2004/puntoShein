// src/libs/axiosConfig.js
import axios from 'axios';
import { MIS_URL } from '../MiVariable';

const axiosInstance = axios.create({
  baseURL: MIS_URL,
  withCredentials: true, // Asegura que las cookies se envíen con cada solicitud
});

export default axiosInstance;
