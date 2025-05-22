import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 📦 Importations Ant Design
import {
  Layout, Row, Col, Card, Input, Select, Button, Space, Typography,
  Tag, Slider, Empty, Spin, message, Tooltip, Pagination
} from 'antd';

// 🎨 Icônes Ant Design
import {
  SearchOutlined, FilterOutlined, SortAscendingOutlined,
  StarOutlined, ClockCircleOutlined, DollarOutlined,
  PlayCircleOutlined, HeartOutlined, HeartFilled, ShareAltOutlined
} from '@ant-design/icons';

// 📁 Styles et composants personnalisés
import '../styles/global.css';
import VideoModal from '../components/VideoModal';

// 📷 Images des cours
import businessImg from '../assets/R.jpeg';
import ecommerceImg from '../assets/E.jpg';
import aiImg from '../assets/A.jpeg';
import mlImg from '../assets/M.jpg';
import wordpressImg from '../assets/W.jpg';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const Courses = () => {
  const navigate = useNavigate();

  // États
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [videoCourse, setVideoCourse] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    level: 'all',
    priceRange: [0, 100],
    duration: 'all',
    sortBy: 'popular'
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mock = [
        {
          id: 1,
          title: 'Développement Web Full Stack',
          instructor: 'Jean Dupont',
          rating: 4.8,
          students: 1250,
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?...',
          category: 'Développement',
          level: 'Intermédiaire',
          duration: '2h25',
          description: 'Apprenez à créer des applications web complètes avec les dernières technologies.',
          videoId: 'Ke90Tje7VS0'
        },
        {
          id: 2,
          title: 'Data Science pour Débutants',
          instructor: 'Marie Martin',
          rating: 4.9,
          students: 980,
          price: 59.99,
          image: '/src/assets/DATA.png',
          category: 'Data Science',
          level: 'Débutant',
          duration: '4h22',
          description: 'Introduction aux concepts fondamentaux de la Data Science.',
          videoId: 'r-uOLxNrNk8'
        },
        {
          id: 3,
          title: 'Marketing Digital Avancé',
          instructor: 'Pierre Dubois',
          rating: 4.7,
          students: 850,
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?...',
          category: 'Marketing',
          level: 'Avancé',
          duration: '16 min',
          description: 'Stratégies avancées de marketing digital pour les professionnels.',
          videoId: '7q7depQBIqA'
        },
        {
          id: 4,
          title: 'Business Essentials',
          instructor: 'Sophie Laurent',
          rating: 4.6,
          students: 670,
          price: 29.99,
          image: businessImg,
          category: 'Business',
          level: 'Débutant',
          duration: '2h26',
          description: 'Les bases indispensables pour réussir dans le monde des affaires.',
          videoId: '9VlvbpXwLJs'
        },
        {
          id: 5,
          title: 'E-Commerce : Lancer Votre Boutique en Ligne',
          instructor: 'Ilyas Hajji',
          rating: 4.9,
          students: 1120,
          price: 44.99,
          image: ecommerceImg,
          category: 'Business',
          level: 'Débutant',
          duration: '22min17',
          description: 'Apprenez à créer, gérer et rentabiliser une boutique e-commerce dès aujourd’hui.',
          videoId: 'S8p31Sg69RY'
        },
        {
          id: 6,
          title: 'Introduction à l’Intelligence Artificielle',
          instructor: 'Dr. Nadia Bensalem',
          rating: 4.8,
          students: 1320,
          price: 54.99,
          image: aiImg,
          category: 'AI',
          level: 'Intermédiaire',
          duration: '5min28',
          description: 'Comprenez les bases de l’intelligence artificielle, des réseaux de neurones au deep learning.',
          videoId: '2ePf9rue1Ao'
        },
        {
          id: 7,
          title: 'Machine Learning : Concepts et Applications',
          instructor: 'Prof. Karim El Idrissi',
          rating: 4.7,
          students: 1075,
          price: 64.99,
          image: mlImg,
          category: 'AI',
          level: 'Avancé',
          duration: '5min',
          description: 'Explorez les techniques de Machine Learning et leur mise en œuvre dans des projets réels.',
          videoId: '7IgVGSaQPaw'
        },
        {
          id: 8,
          title: 'Créer un Site WordPress ',
          instructor: 'Ilyas Hajji',
          rating: 4.9,
          students: 1450,
          price: 34.99,
          image: wordpressImg,
          category: 'Développement',
          level: 'Débutant',
          duration: '1h02',
          description: 'Maîtrisez la création d’un site web complet avec WordPress sans coder.',
          videoId: 'R4v_7hh4Yys'
        }
        
      ];
      setCourses(mock);
      setFilteredCourses(mock);
      setLoading(false);
    }, 1000);
  }, []);

  // Mise à jour des filtres
  useEffect(() => {
    let result = [...courses];
    const s = filters.search
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  
    if (s) {
      result = result.filter(c => {
        const title = c.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const instructor = c.instructor
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const description = c.description
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
  
        return title.includes(s) || instructor.includes(s) || description.includes(s);
      });}

    if (filters.category !== 'all') {
      result = result.filter(c => c.category === filters.category);
    }

    if (filters.level !== 'all') {
      result = result.filter(c => c.level === filters.level);
    }

    result = result.filter(c =>
      c.price >= filters.priceRange[0] &&
      c.price <= filters.priceRange[1]
    );

    if (filters.duration !== 'all') {
      result = result.filter(c => c.duration === filters.duration);
    }

    switch (filters.sortBy) {
      case 'popular': result.sort((a, b) => b.students - a.students); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
    }

    setFilteredCourses(result);
    setCurrentPage(1); // reset page
  }, [filters, courses]);

  // Pagination logique
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );



  const handleReset = () => {
    setFilters({
      search: '',
      category: 'all',
      level: 'all',
      priceRange: [0, 100],
      duration: 'all',
      sortBy: 'popular'  // Make sure this line has no syntax error.
    });
    message.success('Filtres réinitialisés');
  };

  const handleSort = v => {
    setFilters(f => ({ ...f, sortBy: v }));
    message.success('Tri mis à jour');
  };

  const toggleFav = id => {
    setFavorites(f =>
      f.includes(id) ? f.filter(x => x !== id) : [...f, id]
    );
    message.success('Favoris mis à jour');
  };

  const handleShare = course => {
    const url = `${window.location.origin}/courses/${course.id}`;  // Fixed template literal
    navigator.clipboard.writeText(url)
      .then(() => message.success('Lien copié !'))
      .catch(() => message.error('Échec copie'));
  };
  

  return (
    <Layout className="courses-page" style={{ padding: 24 }}>
      <Title level={2} style={{ textAlign: "center", marginTop: "50px" }}>
        Explorez nos cours
      </Title>
      <Paragraph style={{ textAlign: 'center' }}>
        Découvrez notre sélection de cours de haute qualité.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8} md={6}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Search
                  placeholder="Rechercher..."
                  onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                  enterButton={<SearchOutlined />}
                  allowClear
                />
                <Select
                  value={filters.category}
                  onChange={v => setFilters(f => ({ ...f, category: v }))}
                  style={{ width: '100%' }}>
                  <Option value="all">Toutes catégories</Option>
                  <Option value="Développement">Développement</Option>
                  <Option value="Data Science">Data Science</Option>
                  <Option value="AI">Intelligence Artificielle</Option> {/* Nouvelle catégorie */}
                  <Option value="Marketing">Marketing</Option>
                  <Option value="Business">Business</Option>
                </Select>
              <Select
                value={filters.level}
                onChange={v => setFilters(f => ({ ...f, level: v }))}
                style={{ width: '100%' }}
              >
                <Option value="all">Tous niveaux</Option>
                <Option value="Débutant">Débutant</Option>
                <Option value="Intermédiaire">Intermédiaire</Option>
                <Option value="Avancé">Avancé</Option>
              </Select>
              <div>
                <Text>Prix (MAD)</Text>
                <Slider
                  range min={0} max={100}
                  value={filters.priceRange}
                  onChange={r => setFilters(f => ({ ...f, priceRange: r }))}
                />
                <Space>
                  <Text>{filters.priceRange[0]}MAD</Text>
                  <Text>{filters.priceRange[1]}MAD</Text>
                </Space>
              </div>
              <Button icon={<FilterOutlined />} onClick={handleReset} block>
                Réinitialiser
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} sm={16} md={18}>
          <Space style={{ marginBottom: 16 }}>
            <Select
              value={filters.sortBy}
              onChange={handleSort}
              suffixIcon={<SortAscendingOutlined />}
            >
              <Option value="popular">Plus populaires</Option>
              <Option value="rating">Meilleures notes</Option>
              <Option value="price-asc">Prix croissant</Option>
              <Option value="price-desc">Prix décroissant</Option>
            </Select>
          </Space>

          {loading ? (
            <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
          ) : filteredCourses.length ? (
            <>
              <Row gutter={[24, 24]}>
                {paginatedCourses.map(course => (
                  <Col xs={24} sm={12} lg={8} key={course.id}>
                    <Card
                      hoverable
                      cover={
                        <div className="course-image">
                          <img alt={course.title} src={course.image} />
                          <div className="course-overlay">
                            <Space>
                              <Tooltip title="Favoris">
                                <Button
                                  type="text"
                                  icon={
                                    favorites.includes(course.id)
                                      ? <HeartFilled style={{ color: 'red' }} />
                                      : <HeartOutlined />
                                  }
                                  onClick={() => toggleFav(course.id)}
                                />
                              </Tooltip>
                              <Tooltip title="Partager">
                                <Button
                                  type="text"
                                  icon={<ShareAltOutlined />}
                                  onClick={() => handleShare(course)}
                                />
                              </Tooltip>
                              <Button
                                type="primary"
                                icon={<PlayCircleOutlined />}
                                onClick={() => setVideoCourse(course)}
                              >
                                Voir la vidéo
                              </Button>
                            </Space>
                          </div>
                        </div>
                      }
                    >
                      <Card.Meta
                        title={<Space>{course.title}<Tag>{course.category}</Tag></Space>}
                        description={
                          <Space direction="vertical" size="small">
                            <Text><StarOutlined /> {course.rating}</Text>
                            <Text type="secondary">({course.students} étudiants)</Text>
                            <Text><ClockCircleOutlined /> {course.duration}</Text>
                            <Text><DollarOutlined /> {course.price}MAD</Text>
                            <Paragraph ellipsis={{ rows: 2 }}>{course.description}</Paragraph>
                          </Space>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
              <Pagination
                current={currentPage}
                total={filteredCourses.length}
                pageSize={pageSize}
                onChange={page => setCurrentPage(page)}
                style={{ marginTop: 32, textAlign: 'center' }}
              />
            </>
          ) : (
            <Empty description="Aucun cours ne correspond" />
          )}
        </Col>
      </Row>

      {videoCourse && (
        <VideoModal
          visible={!!videoCourse}
          onClose={() => setVideoCourse(null)}
          title={videoCourse.title}
          videoId={videoCourse.videoId}
        />
      )}
    </Layout>
  );
};

export default Courses;