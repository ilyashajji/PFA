import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour gérer le refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Si l'erreur est 401 et que nous n'avons pas déjà essayé de rafraîchir le token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await axios.post(API_ENDPOINTS.REFRESH_TOKEN, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('access_token', access);
                
                // Mettre à jour le header de la requête originale
                originalRequest.headers.Authorization = `Bearer ${access}`;
                
                // Réessayer la requête originale
                return api(originalRequest);
            } catch (refreshError) {
                // Si le refresh token échoue, déconnecter l'utilisateur
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (credentials) => {
        const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
        const { access, refresh, user } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        return { data: user };
    },

    register: async (userData) => {
        const response = await api.post(API_ENDPOINTS.REGISTER, userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    getProfile: async () => {
        const response = await api.get(API_ENDPOINTS.PROFILE);
        return response;
    },

    updateProfile: async (userData) => {
        const response = await api.patch(API_ENDPOINTS.PROFILE, userData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.post(API_ENDPOINTS.CHANGE_PASSWORD, passwordData);
        return response.data;
    },

    uploadAvatar: async (formData) => {
        const response = await api.post(API_ENDPOINTS.UPLOAD_AVATAR, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

export const courseService = {
    getCourses: () => api.get(API_ENDPOINTS.COURSES),
    getCourse: (id) => api.get(`${API_ENDPOINTS.COURSES}${id}/`),
    getCategories: () => api.get(API_ENDPOINTS.CATEGORIES),
};

export const lessonService = {
    getLessons: (courseId) => api.get(`${API_ENDPOINTS.LESSONS}?course=${courseId}`),
    getLesson: (id) => api.get(`${API_ENDPOINTS.LESSONS}${id}/`),
};

export const quizService = {
    getQuizzes: (courseId) => api.get(`${API_ENDPOINTS.QUIZZES}?course=${courseId}`),
    getQuiz: (id) => api.get(`${API_ENDPOINTS.QUIZZES}${id}/`),
    submitQuiz: (id, answers) => api.post(`${API_ENDPOINTS.QUIZZES}${id}/submit/`, { answers }),
};

export const progressService = {
    getProgress: (courseId) => api.get(`${API_ENDPOINTS.PROGRESS}?course=${courseId}`),
    updateProgress: (courseId, lessonId, status) => 
        api.post(API_ENDPOINTS.PROGRESS, { course: courseId, lesson: lessonId, status }),
};

export default api; 