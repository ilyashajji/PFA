import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Typography, 
  Button, 
  Row, 
  Col, 
  Card, 
  Input, 
  Space, 
  Statistic,
  Avatar,
  List,
  Carousel,
  Modal,
  Form,
  Select,
  message,
  Tag,
  Badge,
  Tooltip
} from 'antd';
import {
  SearchOutlined,
  PlayCircleOutlined,
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  StarOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  FilterOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
import '../styles/global.css';
import CourseCard from '../components/CourseCard';
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsletterForm] = Form.useForm();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredCourses = [
    {
      id: 'dev-web-fullstack',
      title: 'Développement Web Full Stack',
      instructor: 'Jean Dupont',
      rating: 4.8,
      students: 1250,
      price: '49.99 MAD',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Développement'
    },
    {
      id: 'data-science-debutant',
      title: 'Data Science pour Débutants',
      instructor: 'Marie Martin',
      rating: 4.9,
      students: 980,
      price: '59.99 MAD',
      image: '/src/assets/DATA.png',
      category: 'Data Science'
    },
    {
      id: 'marketing-digital-avance',
      title: 'Marketing Digital Avancé',
      instructor: 'Pierre Dubois',
      rating: 4.7,
      students: 850,
      price: '39.99 MAD',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Marketing'
    }
  ];

  const categories = [
    { name: 'Développement', icon: <BookOutlined />, courses: 120 },
    { name: 'Data Science', icon: <TrophyOutlined />, courses: 85 },
    { name: 'Marketing', icon: <StarOutlined />, courses: 95 },
    { name: 'Business', icon: <TeamOutlined />, courses: 75 }
  ];

  const testimonials = [
    {
      name: 'Fadoua Hajji',
      role: 'Étudiante en Développement',
      text: 'Les cours sont excellents et les instructeurs très compétents. J\'ai pu trouver un emploi rapidement après ma formation.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      name: 'Amine Dioua',
      role: 'Entrepreneur',
      text: 'La qualité des cours est exceptionnelle. J\'ai pu développer mes compétences et faire grandir mon entreprise.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80'
    }
  ];

  useEffect(() => {
    setFilteredCourses(featuredCourses);
  }, []);

  const handleFavorite = (courseId) => {
    if (favorites.includes(courseId)) {
      setFavorites(favorites.filter(id => id !== courseId));
      message.success('Cours retiré des favoris');
    } else {
      setFavorites([...favorites, courseId]);
      message.success('Cours ajouté aux favoris');
    }
  };
  
  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/courses?search=${encodeURIComponent(value)}`);
    }
  };

  const handleViewCourse = (course) => {
    navigate(`/courses/${course.id || course.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleStartLearning = () => {
    navigate('/register');
  };

  const handleExploreCourses = () => {
    navigate('/courses', { replace: true });
  };

  const handleShare = (course) => {
    const shareUrl = `${window.location.origin}/courses/${course.id || course.title.toLowerCase().replace(/\s+/g, '-')}`;
  
    if (navigator.share) {
      navigator
        .share({
          title: course.title,
          text: `Découvrez ce cours : ${course.title}`,
          url: shareUrl,
        })
        .catch((error) => {
          console.log('Erreur lors du partage:', error);
          message.error('Erreur lors du partage');
        });
    } else {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          message.success('Lien copié dans le presse-papier !');
        })
        .catch(() => {
          message.error('Impossible de copier le lien');
        });
    }
  };
  

  const handleNewsletterClick = () => {
    setShowNewsletterModal(true);
  };

  const handleNewsletterSubmit = (values) => {
    console.log('Newsletter subscription:', values);
    message.success('Merci pour votre inscription à la newsletter !');
    setShowNewsletterModal(false);
    newsletterForm.resetFields();
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    const sortedCourses = [...filteredCourses].sort((a, b) => {
      if (value === 'popular') return b.students - a.students;
      if (value === 'rating') return b.rating - a.rating;
      if (value === 'price') {
        const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ''));
        return priceA - priceB;
      }
      return 0;
    });
    setFilteredCourses(sortedCourses);
  };
    
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value === 'all') {
      setFilteredCourses(featuredCourses);
    } else {
      setFilteredCourses(featuredCourses.filter(course => course.category === value));
    }
  };

  return (
    <Layout className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            Apprenez les compétences de demain
          </Title>
          <Paragraph className="hero-subtitle">
            Découvrez des milliers de cours en ligne et développez vos compétences professionnelles
          </Paragraph>
          <Search
            placeholder="Rechercher un cours..."
            enterButton={<Button type="primary" icon={<SearchOutlined />}>Rechercher</Button>}
            size="large"
            className="search-bar"
            onSearch={handleSearch}
          />
          <div className="hero-stats">
            <Statistic title="Cours" value={1000} prefix={<BookOutlined />} />
            <Statistic title="Étudiants" value={50000} prefix={<UserOutlined />} />
            <Statistic title="Instructeurs" value={200} prefix={<TeamOutlined />} />
          </div>
        </div>
      </div>

      {/* Featured Courses */}
      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={2} className="section-title">Cours Populaires</Title>
          <Space>
            <Select
              defaultValue="popular"
              style={{ width: 150 }}
              onChange={handleSortChange}
              suffixIcon={<SortAscendingOutlined />}
            >
              <Option value="popular">Plus populaires</Option>
              <Option value="rating">Meilleures notes</Option>
              <Option value="price">Prix croissant</Option>
            </Select>
            <Select
              defaultValue="all"
              style={{ width: 150 }}
              onChange={handleCategoryChange}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">Toutes catégories</Option>
              <Option value="Développement">Développement</Option>
              <Option value="Data Science">Data Science</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Space>
        </div>
        <Row gutter={[24, 24]}>
          {filteredCourses.map((course, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                cover={
                  <div className="course-image">
                    <img alt={course.title} src={course.image} />
                    <div className="course-overlay">
                      <Space>
                  
                        <Tooltip title="Partager">
                          <Button 
                            type="text" 
                            icon={<ShareAltOutlined />}
                            onClick={() => handleShare(course)}
                          />
                        </Tooltip>
                    
                      </Space>
                    </div>
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <Space>
                      {course.title}
                      <Tag color="blue">{course.category}</Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size="small">
                      <Text>{course.instructor}</Text>
                      <Space>
                        <StarOutlined style={{ color: '#ffc107' }} />
                        <Text>{course.rating}</Text>
                        <Text type="secondary">({course.students} étudiants)</Text>
                      </Space>
                      <Text strong style={{ color: 'var(--primary-color)' }}>
                        {course.price}
                      </Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Categories */}
      <div className="section categories-section">
        <Title level={2} className="section-title">Explorez par Catégorie</Title>
        <Row gutter={[24, 24]}>
          {categories.map((category, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className="category-card" hoverable>
                <Space direction="vertical" align="center" size="large">
                  <div className="category-icon">
                    {category.icon}
                  </div>
                  <Title level={4}>{category.name}</Title>
                  <Text type="secondary">{category.courses} cours</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Testimonials */}
      <div className="section testimonials-section">
        <Title level={2} className="section-title">Ce que disent nos étudiants</Title>
        <Carousel autoplay>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-slide">
              <Card className="testimonial-card">
                <Space direction="vertical" align="center" size="large">
                  <Avatar size={100} src={testimonial.avatar} />
                  <Paragraph className="testimonial-text">
                    "{testimonial.text}"
                  </Paragraph>
                  <div>
                    <Title level={4} style={{ margin: 0 }}>{testimonial.name}</Title>
                    <Text type="secondary">{testimonial.role}</Text>
                  </div>
                </Space>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <Title level={2}>Prêt à commencer votre parcours d'apprentissage ?</Title>
          <Paragraph>
            Rejoignez des milliers d'étudiants qui ont déjà transformé leur carrière
          </Paragraph>
          <Space>
            <Button 
              type="primary" 
              size="large"
              onClick={handleStartLearning}
            >
              Commencer maintenant
            </Button>
            <Button 
              type="primary" 
              size="large"
              onClick={handleExploreCourses}
              className="explore-courses-button"
            >
              Explorer les cours
            </Button>
            <Button 
              type="dashed"
              size="large"
              onClick={handleNewsletterClick}
            >
              S'abonner à la newsletter
            </Button>
          </Space>
        </div>
      </div>

      {/* Newsletter Modal */}
      <Modal
        title="Restez informé"
        open={showNewsletterModal}
        onCancel={() => setShowNewsletterModal(false)}
        footer={null}
      >
        <Form
          form={newsletterForm}
          onFinish={handleNewsletterSubmit}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Veuillez entrer votre email' },
              { type: 'email', message: 'Email invalide' }
            ]}
          >
            <Input placeholder="votre@email.com" />
          </Form.Item>
          <Form.Item
            name="interests"
            label="Centres d'intérêt"
            rules={[{ required: true, message: 'Veuillez sélectionner au moins un centre d\'intérêt' }]}
          >
            <Select mode="multiple" placeholder="Sélectionnez vos centres d'intérêt">
              <Option value="development">Développement</Option>
              <Option value="data-science">Data Science</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="business">Business</Option>
            </Select>
          </Form.Item>
          <Form.Item>
                <Button type="primary" htmlType="submit">
                      S'abonner
                </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Home; 


