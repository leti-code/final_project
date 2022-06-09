import { useState } from 'react';
import { Modal, Button, Form, Upload, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

import openNotification from '@components/common/notification';



/*Component import from Ant Design. It allows you to display a pop up window with some information and and "Accept" or "Cancel" option to continue or stop whatever proccess it refers */
const Modal_update_image = ({butText, title, preset, setNewImg}) => {
    /*This is a genereic component to update a image, that means no matter if is the user, map or flag one. Thats why we have so many props.
        - ButText: the text of the button that will open the modal
        - Title: the title of the modal
        - Preset: the preset of the image, that is the name of the folder where the image will be stored in Cloudinary
        - SetNewImg: the function that will set the new image in the state of the component, we need this to inform the parent that a new image has been setted
        and be able to updated this information in the parent component at the database
    */
    
    /*State of the modal */
    const [isModalVisible, setIsModalVisible] = useState();
    /*Checks if we have add a new value, to allow the update button */
    const [hasValueChanged, setHasValueChanged] = useState(false);
    /* State of the image */
    const [img, setImg] = useState(undefined);
    /* State of loading, to disable button when it is making the petition to the server */
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();

    const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";


    //When we click on the button if mades the modal visible.
    const showModal = () => {
        setIsModalVisible(true);
    };

    //Once we select an image and click on the upload button, we upload the image to cloudinary and get the url of the image.
    const handleOk = async () => {
        try {
            setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
        setHasValueChanged(false);
        setIsModalVisible(false);
        };

    //When we click on the cancel button, the modal is closed
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
                    isLoading ?
                    /*This button is display when the petition to ther server is in proccess */
                    <Button type="primary" disabled>
                        <Spin indicator={<LoadingOutlined/>}/> 
                    </Button>
                    :
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
                    {/*Upload component from Ant Design that allows you to select from your file navigator a file */}
                    <Upload 
                        name="image" 
                        listType="picture" 
                        maxCount={1} 
                        accept=".jpg, .png, .jpeg"
                        action={"/api/img"}
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