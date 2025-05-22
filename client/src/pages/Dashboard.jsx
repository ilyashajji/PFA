import React from 'react';
import { Layout, Card, Avatar, Typography, Row, Col, Statistic, List, Space } from 'antd';
import { UserOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';
import { Pie, Column } from '@ant-design/charts';

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  // Données statiques
  const fakeUser = {
    username: 'Ilyas Hajji',
    email: 'ilyashajji770@gmail.com',
    bio: 'Étudiant en génie informatique',
    avatar: '',
  };

  const fakeCourses = [
    { title: 'React.js', progress: 100 },
    { title: 'datascience', progress: 80 },
    { title: 'E-commerce', progress: 60 },
    { title: 'MachineLearning', progress: 40 },
  ];

  const totalCourses = fakeCourses.length;
  const completedCourses = fakeCourses.filter(c => c.progress === 100).length;
  const avgProgress = totalCourses > 0
    ? (fakeCourses.reduce((sum, c) => sum + c.progress, 0) / totalCourses).toFixed(0)
    : 0;

  // Configuration du graphique circulaire (Pie)
  const pieConfig = {
    appendPadding: 10,
    data: [
      { type: 'Terminés', value: completedCourses },
      { type: 'En cours', value: totalCourses - completedCourses },
    ],
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: { type: 'outer', content: '{name} ({percentage})' },
  };

  // Configuration du graphique à colonnes
  const barConfig = {
    data: fakeCourses,
    xField: 'title',
    yField: 'progress',
    label: { position: 'middle', style: { fill: '#fff' } },
    xAxis: { label: { autoHide: true, autoRotate: false } },
  };

  return (
    <Layout style={{ padding: '24px' }}>
      <Content>
        <Row gutter={[24, 24]}>
          {/* Profil */}
          <Col xs={24} md={8}>
            <Card>
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <Avatar size={120} icon={<UserOutlined />} />
                <Title level={3}>{fakeUser.username}</Title>
                <Text type="secondary">{fakeUser.email}</Text>
                <Text>{fakeUser.bio}</Text>
              </Space>
            </Card>
          </Col>

          {/* Statistiques + Graphiques */}
          <Col xs={24} md={16}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Statistic title="Cours suivis" value={totalCourses} prefix={<BookOutlined />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Progression moyenne" value={avgProgress} suffix="%" prefix={<TrophyOutlined />} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Cours terminés" value={completedCourses} prefix={<TrophyOutlined />} />
                </Card>
              </Col>
            </Row>

            {/* Graphiques */}
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card title="Répartition des cours">
                  <Pie {...pieConfig} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Progression par cours">
                  <Column {...barConfig} />
                </Card>
              </Col>
            </Row>

            {/* Liste statique des cours */}
            <Card title="Mes cours" style={{ marginTop: '24px' }}>
              <List
                dataSource={fakeCourses}
                renderItem={course => (
                  <List.Item>
                    <List.Item.Meta
                      title={course.title}
                      description={`Progression : ${course.progress}%`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
