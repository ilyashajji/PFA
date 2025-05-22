// src/services/authService.js
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const register = async (formData) => {
    const response = await axios.post(API_ENDPOINTS.REGISTER, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const login = async (credentials) => {
    const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
    if (response.data.tokens) {
        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No refresh token available');
    
    const response = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, { refresh });
    localStorage.setItem('access_token', response.data.access);
    return response.data;
};

const getProfile = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token available');
    
    const response = await axios.get(API_ENDPOINTS.PROFILE, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const getUserCourses = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token available');
    
    const response = await axios.get(API_ENDPOINTS.USER_COURSES, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const getUserAchievements = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token available');
    
    const response = await axios.get(API_ENDPOINTS.USER_ACHIEVEMENTS, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

const updateProfile = async (profileData) => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token available');
    
    const headers = { 
        Authorization: `Bearer ${token}`,
    };

    // Si c'est un FormData (pour l'avatar), ne pas définir Content-Type
    if (!(profileData instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    
    const response = await axios.put(API_ENDPOINTS.PROFILE, profileData, { headers });
    return response.data;
};

const updatePassword = async (passwordData) => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No access token available');
    
    const response = await axios.put(`${API_ENDPOINTS.PROFILE}/password`, passwordData, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export default {
    register,
    login,
    logout,
    refreshToken,
    getProfile,
    getUserCourses,
    getUserAchievements,
    updateProfile,
    updatePassword
};
