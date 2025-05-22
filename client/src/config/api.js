const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_BASE_URL}/users/login/`,
    REFRESH_TOKEN: `${API_BASE_URL}/users/token/refresh/`,

    // Users
    USERS: `${API_BASE_URL}/users/`,
    REGISTER: `${API_BASE_URL}/users/register/`,
    PROFILE: `${API_BASE_URL}/users/me/`,
    USER_COURSES: `${API_BASE_URL}/users/me/courses/`,
    USER_ACHIEVEMENTS: `${API_BASE_URL}/users/me/achievements/`,

    // Courses
    COURSES: `${API_BASE_URL}/courses/`,
    COURSE_DETAILS: (id) => `${API_BASE_URL}/courses/${id}/`,
    CATEGORIES: `${API_BASE_URL}/courses/categories/`,

    // Lessons
    LESSONS: `${API_BASE_URL}/lessons/`,

    // Quizzes
    QUIZZES: `${API_BASE_URL}/quizzes/`,

    // Progress
    PROGRESS: `${API_BASE_URL}/progress/`,
};

export const getAuthHeader = () => {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};
