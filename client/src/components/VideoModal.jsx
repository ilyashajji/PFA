import React from 'react';
import { Modal } from 'antd';

const VideoModal = ({ visible, onClose, title, videoId }) => (
  <Modal
    title={title}
    open={visible}
    footer={null}
    onCancel={onClose}
    width={800}
    destroyOnClose
  >
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  </Modal>
);

export default VideoModal;
