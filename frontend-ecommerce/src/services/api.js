import axios from 'axios';
const backend_url = import.meta.env.VITE_BACKEND_URL
const baseurl = backend_url + "/api/v1"
const api = axios.create({
   
    baseURL: {baseurl},
    withCredentials: true,

});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);