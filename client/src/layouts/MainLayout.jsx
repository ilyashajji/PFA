import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import "../styles/global.css";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ marginTop: '64px' }}> {/* Décale le contenu sous la navbar */}
        <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
          <Outlet /> {/* Le contenu des pages s'affiche ici */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
