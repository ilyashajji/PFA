// src/pages/CourseDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Button, Card } from 'antd';
import coursesData from '../data/courses';
import VideoModal from '../components/VideoModal';
import './CourseDetails.css';

const { Title, Paragraph } = Typography;

const CourseDetails = () => {
  const { id } = useParams();
  const course = coursesData.find(c => c.id === parseInt(id,10));
  const [videoVisible, setVideoVisible] = useState(false);

  if (!course) return <div>Cours introuvable</div>;

  return (
    <Card className="course-card"
      hoverable
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
    >
      <Title className="course-title">{course.title}</Title>
      <Paragraph className="course-description">{course.description}</Paragraph>
      <Button className="primary-button" type="primary" onClick={() => setVideoVisible(true)}>
        Regarder la vidéo du cours
      </Button>

      <VideoModal
        visible={videoVisible}
        onClose={() => setVideoVisible(false)}
        title={course.title}
        videoId={course.videoId}
      />
    </Card>
  );
};

export default CourseDetails;
