import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, List, Space, Typography } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

const MessageBox = ({ messages = [], onSendMessage, currentUser }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      background: '#f5f5f5',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '16px',
        background: 'white'
      }}>
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              style={{
                justifyContent: message.sender === currentUser ? 'flex-end' : 'flex-start',
                padding: '8px 0'
              }}
            >
              <Space
                direction={message.sender === currentUser ? 'horizontal-reverse' : 'horizontal'}
                align="start"
              >
                <Avatar
                  icon={<UserOutlined />}
                  src={message.avatar}
                  style={{ margin: '0 8px' }}
                />
                <div
                  style={{
                    background: message.sender === currentUser ? '#1890ff' : '#f0f0f0',
                    color: message.sender === currentUser ? 'white' : 'black',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    maxWidth: '70%'
                  }}
                >
                  <Text style={{ color: message.sender === currentUser ? 'white' : 'black' }}>
                    {message.content}
                  </Text>
                  <div style={{ 
                    fontSize: '0.8em', 
                    color: message.sender === currentUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.45)',
                    marginTop: '4px'
                  }}>
                    {message.timestamp}
                  </div>
                </div>
              </Space>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>
      <div style={{ 
        padding: '16px', 
        background: 'white',
        borderTop: '1px solid #f0f0f0'
      }}>
      <Input.Group compact style={{ width: '100%' }}>
          <TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre message..."
                autoSize={{ minRows: 1, maxRows: 4 }}
                style={{ width: 'calc(100% - 40px)' }} // ajuste la taille pour laisser de la place au bouton
          />
        <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
        />
      </Input.Group>

      </div>
    </div>
  );
};

export default MessageBox; 