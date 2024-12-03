import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }

});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
            console.log('entrou');
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default api;
