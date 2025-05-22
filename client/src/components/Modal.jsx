import React from 'react';
import { Modal as AntModal, Button, Space } from 'antd';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  showFooter = true,
  width = 520,
  ...props
}) => {
  return (
    <AntModal
      title={title}
      open={isOpen}
      onCancel={onClose}
      width={width}
      footer={
        showFooter ? (
          <Space>
            <Button onClick={onClose}>{cancelText}</Button>
            {onConfirm && (
              <Button type="primary" onClick={onConfirm}>
                {confirmText}
              </Button>
            )}
          </Space>
        ) : null
      }
      {...props}
    >
      {children}
    </AntModal>
  );
};

export default Modal; 