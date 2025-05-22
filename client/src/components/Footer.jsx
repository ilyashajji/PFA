// components/Footer.jsx
import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        padding: '24px 0',
        background: '#f0f2f5',
        marginTop: 64
      }}
    >
      <Text type="secondary">
        © {new Date().getFullYear()} ZI LEARNING. Tous droits réservés.
      </Text>
    </Footer>
  );
};

export default AppFooter;
