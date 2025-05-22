// src/components/CourseCard.js
import React, { useState } from 'react';
import { Card, Rate, Tag, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import VideoModal from './VideoModal';

const { Meta } = Card;

const CourseCard = ({ course }) => {
  const [videoVisible, setVideoVisible] = useState(false);
  return (
    <>
      <Card
        hoverable
        style={{ width: 300, margin: 16 }}
        cover={<img alt={course.title} src={course.thumbnail} style={{ height: 200, objectFit: 'cover' }} />}
        actions={[
          <Link to={`/courses/${course.id}`} key="detail">
            <Button type="primary" block>Voir le cours</Button>
          </Link>,
          course.videoId && (
            <Button key="video" block onClick={() => setVideoVisible(true)}>
              Voir la vidéo
            </Button>
          )
        ]}
      >
        <Meta
          title={course.title}
          description={
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <div><UserOutlined /> {course.instructor}</div>
              <div><ClockCircleOutlined /> {course.duration}</div>
              <Tag color={course.level==='Débutant'?'green':course.level==='Intermédiaire'?'blue':'red'}>
                {course.level}
              </Tag>
              <div><Rate disabled defaultValue={course.rating}/><span>{course.rating}</span></div>
              <div style={{ fontWeight:'bold', fontSize:'1.2em'}}>{course.price?`${course.price}€`:'Gratuit'}</div>
            </Space>
          }
        />
      </Card>

      {/* Le modal vidéo */}
      <VideoModal
        visible={videoVisible}
        onClose={() => setVideoVisible(false)}
        title={course.title}
        videoId={course.videoId}
      />
    </>
  );
};

export default CourseCard;
