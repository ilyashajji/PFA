import React, { useState, useEffect } from 'react';
import { Layout, Card, Form, Input, Button, Upload, Avatar, Typography, Tabs, List, Space, message, Row, Col, Spin } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
  BookOutlined,
  TrophyOutlined,
  SettingOutlined
} from '@ant-design/icons';
import authService from '../services/authService';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Profile = ({ userRole }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await authService.getProfile();
        setUserData(data);
      } catch (error) {
        message.error('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Ici, vous pourriez appeler une API pour mettre à jour le profil
      // Pour l'instant, on met à jour localement
      setUserData(prev => ({
        ...prev,
        name: values.name,
        email: values.email,
        bio: values.bio,
      }));
      message.success('Profil mis à jour avec succès !');
    } catch (error) {
      message.error('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prev => ({
        ...prev,
        avatar: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    return false;
  };

  if (loading || !userData) {
    return <Spin />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ marginTop: '64px', padding: '24px' }}>
        <Content>
          <Card>
            <Tabs defaultActiveKey="profile">
              <TabPane
                tab={<span><UserOutlined /> Profil</span>}
                key="profile"
              >
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <Space direction="vertical" align="center" style={{ width: '100%' }}>
                      <Avatar size={150} src={userData.avatar} icon={<UserOutlined />} />
                      <Upload
                        showUploadList={false}
                        beforeUpload={handleAvatarChange}
                        accept="image/*"
                      >
                        <Button icon={<UploadOutlined />}>Changer la photo</Button>
                      </Upload>
                      <Title level={4}>{userData.name}</Title>
                      <Text type="secondary">{userData.role || userRole}</Text>
                    </Space>
                  </Col>
                  <Col span={16}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={onFinish}
                      initialValues={{
                        name: userData.name,
                        email: userData.email,
                        bio: userData.bio,
                      }}
                    >
                      <Form.Item
                        name="name"
                        label="Nom"
                        rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}
                      >
                        <Input prefix={<UserOutlined />} />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Veuillez entrer votre email' }, { type: 'email', message: 'Email invalide' }]}
                      >
                        <Input prefix={<MailOutlined />} />
                      </Form.Item>
                      <Form.Item name="bio" label="Biographie">
                        <Input.TextArea rows={4} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                          Enregistrer les modifications
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab={<span><BookOutlined /> Mes Cours</span>} key="courses">
                <List
                  dataSource={userData.courses || []}
                  renderItem={(course) => (
                    <List.Item onClick={() => setSelectedVideo(course.videoId)}>
                      <Card style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text strong>{course.title}</Text>
                            <Text type="secondary">{course.progress}%</Text>
                          </div>
                          <div style={{ width: '100%', background: '#f0f0f0', height: 8, borderRadius: 4 }}>
                            <div style={{
                              width: `${course.progress}%`,
                              background: '#1890ff',
                              height: '100%',
                              borderRadius: 4,
                            }} />
                          </div>
                        </Space>
                      </Card>
                    </List.Item>
                  )}
                />
                {selectedVideo && (
                  <div style={{ marginTop: 20 }}>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${selectedVideo}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </TabPane>

              <TabPane tab={<span><TrophyOutlined /> Réalisations</span>} key="achievements">
                <List
                  dataSource={userData.achievements || []}
                  renderItem={(achievement) => (
                    <List.Item>
                      <Card>
                        <Space>
                          <TrophyOutlined style={{ fontSize: '24px', color: '#ffd700' }} />
                          <Space direction="vertical" size={0}>
                            <Text strong>{achievement.title}</Text>
                            <Text type="secondary">Obtenu le {achievement.date}</Text>
                          </Space>
                        </Space>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>

              <TabPane tab={<span><SettingOutlined /> Paramètres</span>} key="settings">
                <Form layout="vertical">
                  <Form.Item
                    name="currentPassword"
                    label="Mot de passe actuel"
                    rules={[{ required: true, message: 'Veuillez entrer votre mot de passe actuel' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="Nouveau mot de passe"
                    rules={[{ required: true, message: 'Veuillez entrer un nouveau mot de passe' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirmer le mot de passe"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Veuillez confirmer votre mot de passe' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Les mots de passe ne correspondent pas'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Changer le mot de passe
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
