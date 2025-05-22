// src/pages/CoursesList.js
import React, { useState } from 'react';
import { Layout, Row, Col, Input, Select, Card, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Navbar from '../Navbar';
import CourseCard from '../components/CourseCard';
import coursesData from '../data/courses';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const CoursesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesTitle = course.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  const categories = [...new Set(coursesData.map((course) => course.category))];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout>
        <Content style={{ margin: '24px', marginLeft: 200 }}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={3}>Tous les cours</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={16}>
                  <Input
                    placeholder="Rechercher un cours"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={handleSearch}
                    allowClear
                  />
                </Col>
                <Col xs={24} sm={8}>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">Toutes les catégories</Option>
                    {categories.map((cat) => (
                      <Option key={cat} value={cat}>
                        {cat}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Space>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                    <CourseCard course={course} />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Typography.Text>Aucun cours ne correspond à votre recherche.</Typography.Text>
                </Col>
              )}
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CoursesList;
