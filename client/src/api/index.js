import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const profile = localStorage.getItem('profile');
    if (profile) {
        req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
    }
    return req;
});

// Auth Routes
export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

// Job Routes
export const fetchJobs = () => API.get('/jobs');
export const createJob = (newJob) => API.post('/jobs/post', newJob);

// Application Routes
export const applyToJob = (id) => API.post(`/applications/apply/${id}`);
export const getEmployerApplications = () => API.get('/applications/employer');

// Admin Routes
export const getAllUsers = () => API.get('/admin/users');
export const verifyUser = (id) => API.patch(`/admin/verify-user/${id}`);

export default API;