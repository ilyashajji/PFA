import React from 'react';
import { Layout, Avatar, Dropdown, Button, Badge } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  HomeOutlined,
  BookOutlined,
  InfoCircleOutlined,
  FileDoneOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/LOGO.png';


const { Header } = Layout;

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/dashboard/profile">Profil</Link>,
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      danger: true,
      label: 'Déconnexion'
    }
  ];

  return (
    <Header className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="IZ Learning Logo" />
        </Link>
      </div>

      {/* Title */}
      <div className="navbar-title">
        ZI LEARNING
      </div>

      {/* Menu */}
      <div className="navbar-menu">
        <Link to="/" className="navbar-link">
          <HomeOutlined /> Accueil
        </Link>
        <Link to="/courses" className="navbar-link">
          <BookOutlined /> Cours
        </Link>
        <Link to="/StaticQuizComponent" className="navbar-link">
          <FileDoneOutlined /> Quizz
        </Link>
        <Link to="/about" className="navbar-link">
          <InfoCircleOutlined /> À propos
        </Link>

        {isLoggedIn && (
          <>
            <Badge count={5} size="small" style={{ marginRight: '8px' }}>
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: '20px' }} />}
                className="navbar-notification-btn"
              />
            </Badge>

            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
                className: 'navbar-dropdown-menu'
              }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className="navbar-avatar"
              />
            </Dropdown>
          </>
        )}

        {!isLoggedIn && (
          <Button
            type="link"
            icon={<LoginOutlined />}
            className="navbar-link"
            onClick={() => navigate('/login')}
          >
            Connexion
          </Button>
        )}
      </div>
    </Header>
  );
};

export default Navigation;
