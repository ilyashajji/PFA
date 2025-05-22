import React, { useState } from "react";
import { Typography, Row, Col, Card, Button, Modal, Form, Input, message, Space } from "antd";
import { WhatsAppOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const teamMembers = [
  {
    name: "Ilyas Hajji",
    role: "Co-Fondateur & Etudiant en 3ème année en Ingénieurie en informatique et réseau et Full Stack",
    description: "Passionné par l'informatique et les technologies modernes.",
  },
  {
    name: "Zineb Okba",
    role: "Co-Fondatrice & Etudiante en 3ème année en Ingénieurie en informatique et réseau",
    description: "Passionné par l'informatique et les technologies modernes.",
  },
];

const About = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:ilyashajji770@gmail.com";
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Envoyer l'email via le backend
        const emailData = {
          to: "ilyashajji770@gmail.com",
          from: values.email,
          subject: `Nouveau message de ${values.name}`,
          message: values.message
        };
        
        // Ici, vous pouvez ajouter l'appel API pour envoyer l'email
        console.log("Email à envoyer:", emailData);
        message.success("Message envoyé avec succès !");
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation échouée:", info);
      });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "0699235778";
    const message = "Bonjour, je souhaite avoir plus d'informations sur ZI LEARNING.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ background: "#fff", padding: "40px 20px", maxWidth: 1000, margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginTop: "50px" }}>
        À propos de ZI LEARNING
      </Title>

      <Paragraph style={{ fontSize: "16px", textAlign: "center" }}>
        ZI LEARNING est une plateforme d'apprentissage en ligne innovante conçue pour aider les étudiants,
        professionnels et passionnés à développer leurs compétences dans le domaine du digital,
        du développement web et plus encore.
      </Paragraph>

      <Title level={3} style={{ marginTop: 40 }}>Notre Mission</Title>
      <Paragraph>
        Offrir un accès à une éducation de qualité, accessible à tous, à tout moment. Nous croyons que
        l'apprentissage ne devrait pas avoir de barrières géographiques, économiques ou techniques.
      </Paragraph>

      <Title level={3}>Nos Valeurs</Title>
      <ul style={{ paddingLeft: 20 }}>
        <li>📚 Accessibilité à l'apprentissage</li>
        <li>🚀 Innovation pédagogique</li>
        <li>💡 Partage de connaissances</li>
        <li>🤝 Collaboration et entraide</li>
      </ul>

      <Title level={3}>Notre Équipe</Title>
      <Row gutter={[16, 16]}>
        {teamMembers.map((member, index) => (
          <Col xs={24} sm={12} key={index}>
            <Card title={member.name} bordered hoverable style={{ minHeight: 200 }}>
              <p><strong>{member.role}</strong></p>
              <p>{member.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Space size="large">
          <Button 
            type="primary" 
            size="large" 
            onClick={handleEmailClick}
            icon={<MailOutlined />}
          >
            Envoyer un email
          </Button>
          
          <Button 
            type="primary" 
            size="large" 
            onClick={handleWhatsAppClick}
            style={{ backgroundColor: '#25D366' }}
            icon={<WhatsAppOutlined />}
          >
            Contacter sur WhatsApp
          </Button>
        </Space>
      </div>

      <Modal
        title="Contactez-nous"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Envoyer"
        cancelText="Annuler"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nom"
            name="name"
            rules={[{ required: true, message: 'Veuillez entrer votre nom.' }]}
          >
            <Input placeholder="Votre nom" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Veuillez entrer votre email.' },
              { type: 'email', message: 'Email invalide.' }
            ]}
          >
            <Input placeholder="Votre email" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Veuillez entrer un message.' }]}
          >
            <Input.TextArea rows={4} placeholder="Votre message" />
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <Paragraph>
          <MailOutlined /> Email: <a href="mailto:ilyashajji770@gmail.com">ilyashajji770@gmail.com</a>
        </Paragraph>
        <Paragraph>
          <WhatsAppOutlined /> WhatsApp: <a href="https://wa.me/0699235778">0699235778</a>
        </Paragraph>
      </div>
    </div>
  );
};

export default About;
