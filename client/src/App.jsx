import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ConfigProvider, Layout } from 'antd';
import frFR from 'antd/locale/fr_FR';
import AppRoutes from './routes';
import Navigation from './components/Navigation';

const { Content } = Layout;

function App() {
    return (
        <ConfigProvider locale={frFR}>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Navigation />
                        <Content style={{ padding: '20px', minHeight: 'calc(100vh - 64px)' }}>
                            <AppRoutes />
                        </Content>
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
