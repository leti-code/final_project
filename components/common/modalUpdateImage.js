import { useState } from 'react';
import { Modal, Button, Form, Input, Upload,Radio, InputNumber, Avatar, Space } from 'antd';
import { UploadOutlined, EditOutlined} from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

import styles from '../../styles/editMap.module.scss';

import openNotification from '@components/common/notification';
import DownloadButton from '@components/common/downloadButton';



/*Component import from Ant Design. It allows you to display a pop up window with some information and and "Accept" or "Cancel" option to continue or stop whatever proccess it refers */
const Modal_update_image = ({butText, title, preset, setNewImg}) => {
    
    /*State of the modal */
    const [isModalVisible, setIsModalVisible] = useState();
    const [hasValueChanged, setHasValueChanged] = useState(false);
    const [img, setImg] = useState(undefined);
    const [form] = useForm();

    const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const formData = new FormData();
            formData.append('file', img);
            formData.append("upload_preset", preset);
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
    
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            const {secure_url} = data;  //here we have the url of the image uploaded to cloudinary to keep it in our database
            setNewImg(secure_url);
            openNotification({msg:"Success!", description: "Your image has been updated!"});
        } catch (er) {
            openNotification({msg: "Error", description: "Something went wrong! Make sure the flag exists, that you are the owner and try it later"});
    }
        setIsModalVisible(false);
        };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /*Rendered tags and elements */
    return (
        <>
            <Button shape="circle" onClick={showModal}>{butText}</Button>
            <Modal title={title} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel} type="dashed">
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk} htmlType="submit" disabled={hasValueChanged ? false : true}>
                        Update
                    </Button>,
                ]}
            >
                <Form
                form={form}
                onFinish={handleOk}
                method='POST'
                >
                    <Form.Item
                    name="upload"
                    label="Update picture"
                    value={img}
                    onChange={(e)=> {
                        setImg(e.target.files[0]);
                        setHasValueChanged(true);
                    }}
                    extra="Optional selection of a picture that represents this concrete flag"
                >
                    <Upload 
                        name="image" 
                        listType="picture" 
                        maxCount={1} 
                        accept=".jpg, .png, .jpeg"
                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item> 
                </Form>
            </Modal> 
        </>
    );
};

export default Modal_update_image;