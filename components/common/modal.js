import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const Modal_window = ({butText, title, content}) => {
  const [isModalVisible, setIsModalVisible] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
        <Button onClick={showModal}>{butText}</Button>
      <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{content}</p>
      </Modal>
    </>
  );
};

export default Modal_window;