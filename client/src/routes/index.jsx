import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import Profile from '../pages/Profile';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import StaticQuizComponent from '../components/QuizComponent';

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            <Route path="/courses" element={
                <ProtectedRoute>
                    <Courses />
                </ProtectedRoute>
            } />
            <Route path="/courses/:id" element={
                <ProtectedRoute>
                    <CourseDetails />
                </ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
              <Route path="/StaticQuizComponent" element={
                <ProtectedRoute>
                    <StaticQuizComponent />
                </ProtectedRoute>
            } />
 

            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes; 