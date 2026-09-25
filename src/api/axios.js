import axios from 'axios';

// ⭐️ Creamos una instancia de Axios con la Base URL de nuestro backend
const api = axios.create({
    baseURL: 'http://localhost:4000/api', // Asegúrate de que el puerto coincida con tu Express
    headers: {
        'Content-Type': 'application/json',
    },
    // Opcional: para manejar credenciales/cookies si fuera necesario
    // withCredentials: true, 
});

// Interceptor: Antes de enviar cualquier petición, adjunta el Token si existe
api.interceptors.request.use(
  (configuracion) => {
    const tokenGuardado = localStorage.getItem('tokenAcceso');
    if (tokenGuardado) {
      configuracion.headers.Authorization = `Bearer ${tokenGuardado}`;
    }
    if (configuracion.data instanceof FormData) {
      delete configuracion.headers['Content-Type'];
    }
    return configuracion;
  },
  (error) => Promise.reject(error)
);


export default api;
