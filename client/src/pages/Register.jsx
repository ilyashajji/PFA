import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Space, Upload } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import authService from '../services/authService';

const { Title, Text } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('password2', values.password2);
            formData.append('role', 'student');
            if (avatar) {
                formData.append('avatar', avatar);
            }
    
            const data = await authService.register(formData);
    
            // setUser() pour activer l’état connecté dans AuthProvider
            // à condition d'utiliser `useAuth()`
            message.success('Inscription réussie!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
    
        } catch (error) {
            console.error('Erreur détaillée:', error);
            const errorData = error.response?.data;
            if (errorData) {
                Object.keys(errorData).forEach(key => {
                    const errorMessage = Array.isArray(errorData[key]) ? errorData[key].join(', ') : errorData[key];
                    message.error(`${key}: ${errorMessage}`);
                });
            } else {
                message.error('Erreur lors de l\'inscription.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (info) => {
        if (info.file.status === 'done') {
            setAvatar(info.file.originFileObj);
            message.success(`${info.file.name} téléchargé avec succès`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} échec du téléchargement.`);
        }
    };

    return (
        <div style={{ 
            maxWidth: 400, 
            margin: '50px auto',
            padding: '20px'
        }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>Inscription</Title>
                        <Text type="secondary">Créez votre compte pour commencer à apprendre</Text>
                    </div>

                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark={false}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: 'Veuillez entrer un nom d\'utilisateur' },
                                { min: 3, message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' }
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined />} 
                                placeholder="Nom d'utilisateur"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Veuillez entrer votre email' },
                                { type: 'email', message: 'Email invalide' }
                            ]}
                        >
                            <Input 
                                prefix={<MailOutlined />} 
                                placeholder="Email"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Veuillez entrer un mot de passe' },
                                { min: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' }
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Mot de passe"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password2"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Veuillez confirmer votre mot de passe' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Les mots de passe ne correspondent pas'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined />} 
                                placeholder="Confirmer le mot de passe"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item label="Photo de profil">
                            <Upload
                                name="avatar"
                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={handleAvatarChange}
                            >
                                <Button icon={<UploadOutlined />}>Choisir une photo</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading}
                                block
                                size="large"
                            >
                                S'inscrire
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'center' }}>
                            <Text>Déjà inscrit ? </Text>
                            <Link to="/login">Se connecter</Link>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Register; 