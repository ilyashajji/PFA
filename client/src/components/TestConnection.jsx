import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { courseService } from '../services/api';

const TestConnection = () => {
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        try {
            const response = await courseService.getCourses();
            message.success('Connexion à l\'API réussie!');
            console.log('Données reçues:', response.data);
        } catch (error) {
            message.error('Erreur de connexion à l\'API');
            console.error('Erreur:', error);
        }
        setLoading(false);
    };

    return (
        <Button onClick={testConnection} loading={loading}>
            Tester la connexion
        </Button>
    );
};

export default TestConnection; 