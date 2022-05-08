import React, { useState } from 'react';
import { Modal, Button } from 'antd';

/*Component import from Ant Design. It allows you to display a pop up window with some information and and "Accept" or "Cancel" option to continue or stop whatever proccess it refers */
const Modal_window = ({butText, title, content}) => {
  /*State of the modal */
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

  /*Rendered tags and elements */
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