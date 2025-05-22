import React, { useEffect } from 'react';
import { notification as antdNotification } from 'antd';

const Notification = ({ type, message, description, duration = 4.5 }) => {
  useEffect(() => {
    if (message) {
      antdNotification[type]({
        message,
        description,
        duration,
        placement: 'topRight',
      });
    }
  }, [type, message, description, duration]);

  return null;
};

export const showNotification = (type, message, description, duration = 4.5) => {
  antdNotification[type]({
    message,
    description,
    duration,
    placement: 'topRight',
  });
};

export default Notification; 