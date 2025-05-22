import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await login({
                email: values.email,
                password: values.password
            });
        } catch (error) {
            console.error('Erreur de connexion:', error);
            if (error.response?.data) {
                const errorData = error.response.data;
                message.error(errorData.message || errorData.detail || 'Erreur de connexion');
            } else {
                message.error('Erreur de connexion. Veuillez vérifier vos identifiants.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '50px auto', padding: '20px' }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>Connexion</Title>
                        <Text type="secondary">Connectez-vous pour accéder à votre espace</Text>
                    </div>

                    <Form
                        form={form}
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark={false}
                    >
                        {/* Champ Email */}
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
                            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Mot de passe"
                                size="large"
                            />
                        </Form.Item>

                        {/* Bouton de soumission */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                size="large"
                            >
                                Se connecter
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'center' }}>
                            <Text>Pas encore de compte ? </Text>
                            <Link to="/register">S'inscrire</Link>
                        </div>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default Login;
