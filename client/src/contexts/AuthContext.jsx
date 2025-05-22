import React, { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                const userData = await authService.getProfile();
                setUser(userData);
            }
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'authentification:', error);
            if (error.response?.status === 401) {
                try {
                    await authService.refreshToken();
                    const userData = await authService.getProfile();
                    setUser(userData);
                } catch (refreshError) {
                    console.error('Erreur de rafraîchissement du token:', refreshError);
                    logout();
                }
            } else {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            setUser(response.user);
            message.success('Connexion réussie!');
            navigate('/dashboard');
            return response.user;
        } catch (error) {
            console.error('Erreur de connexion:', error);
            message.error(error.response?.data?.message || 'Erreur de connexion');
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return context;
};
