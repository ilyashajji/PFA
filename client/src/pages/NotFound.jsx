import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Désolé, la page que vous recherchez n'existe pas."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
        }
      />
    </div>
  );
};

export default NotFound; 