import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tabs,
  message,
  Space,
} from "antd";

const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Ilyas Hajji", email: "ilyas@example.com" },
    { id: 2, name: "Zineb Okba", email: "zineb@example.com" },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", instructor: "Ilyas Hajji" },
    { id: 2, title: "Node.js Advanced", instructor: "Zineb Okba" },
  ]);

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(null);
  const [isEditingCourse, setIsEditingCourse] = useState(null);
  const [userForm] = Form.useForm();
  const [courseForm] = Form.useForm();

  // ----- UTILISATEURS -----

  const showUserModal = (user = null) => {
    setIsEditingUser(user);
    setIsUserModalVisible(true);
    if (user) {
      userForm.setFieldsValue(user);
    } else {
      userForm.resetFields();
    }
  };

  const handleAddOrEditUser = () => {
    userForm.validateFields().then((values) => {
      if (isEditingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === isEditingUser.id ? { ...u, ...values } : u))
        );
        message.success("Utilisateur modifié avec succès");
      } else {
        const newUser = { id: Date.now(), ...values };
        setUsers((prev) => [...prev, newUser]);
        message.success("Utilisateur ajouté avec succès");
      }
      setIsUserModalVisible(false);
      setIsEditingUser(null);
      userForm.resetFields();
    });
  };

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: "Supprimer cet utilisateur ?",
      onOk: () => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        message.success("Utilisateur supprimé");
      },
    });
  };

  const userColumns = [
    { title: "Nom", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showUserModal(record)}>Modifier</Button>
          <Button danger onClick={() => handleDeleteUser(record.id)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  // ----- COURS -----

  const showCourseModal = (course = null) => {
    setIsEditingCourse(course);
    setIsCourseModalVisible(true);
    if (course) {
      courseForm.setFieldsValue(course);
    } else {
      courseForm.resetFields();
    }
  };

  const handleAddOrEditCourse = () => {
    courseForm.validateFields().then((values) => {
      if (isEditingCourse) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === isEditingCourse.id ? { ...c, ...values } : c
          )
        );
        message.success("Cours modifié avec succès");
      } else {
        const newCourse = { id: Date.now(), ...values };
        setCourses((prev) => [...prev, newCourse]);
        message.success("Cours ajouté avec succès");
      }
      setIsCourseModalVisible(false);
      setIsEditingCourse(null);
      courseForm.resetFields();
    });
  };

  const handleDeleteCourse = (id) => {
    Modal.confirm({
      title: "Supprimer ce cours ?",
      onOk: () => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        message.success("Cours supprimé");
      },
    });
  };

  const courseColumns = [
    { title: "Titre", dataIndex: "title", key: "title" },
    { title: "Instructeur", dataIndex: "instructor", key: "instructor" },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showCourseModal(record)}>Modifier</Button>
          <Button danger onClick={() => handleDeleteCourse(record.id)}>
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Utilisateurs" key="1">
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => showUserModal()}
          >
            Ajouter Utilisateur
          </Button>
          <Table dataSource={users} columns={userColumns} rowKey="id" />
        </TabPane>

        <TabPane tab="Cours" key="2">
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => showCourseModal()}
          >
            Ajouter Cours
          </Button>
          <Table dataSource={courses} columns={courseColumns} rowKey="id" />
        </TabPane>
      </Tabs>

      {/* MODAL UTILISATEUR */}
      <Modal
        title={isEditingUser ? "Modifier Utilisateur" : "Ajouter Utilisateur"}
        open={isUserModalVisible}
        onCancel={() => {
          setIsUserModalVisible(false);
          setIsEditingUser(null);
          userForm.resetFields();
        }}
        onOk={handleAddOrEditUser}
        okText={isEditingUser ? "Modifier" : "Ajouter"}
      >
        <Form form={userForm} layout="vertical">
          <Form.Item
            name="name"
            label="Nom"
            rules={[{ required: true, message: "Veuillez entrer le nom" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Veuillez entrer l'email" },
              { type: "email", message: "Email invalide" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL COURS */}
      <Modal
        title={isEditingCourse ? "Modifier Cours" : "Ajouter Cours"}
        open={isCourseModalVisible}
        onCancel={() => {
          setIsCourseModalVisible(false);
          setIsEditingCourse(null);
          courseForm.resetFields();
        }}
        onOk={handleAddOrEditCourse}
        okText={isEditingCourse ? "Modifier" : "Ajouter"}
      >
        <Form form={courseForm} layout="vertical">
          <Form.Item
            name="title"
            label="Titre"
            rules={[{ required: true, message: "Veuillez entrer le titre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="instructor"
            label="Instructeur"
            rules={[
              { required: true, message: "Veuillez entrer l'instructeur" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
  