import { useState } from 'react';
import { Modal, Button, Form, Input, Upload,Radio, InputNumber, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

import openNotification from '@components/common/notification';


/*Component import from Ant Design. It allows you to display a pop up window with some information and and "Accept" or "Cancel" option to continue or stop whatever proccess it refers */
const Modal_flag_creation_window = ({butText, title, mapId, hasFlagChanged, setHasFlagChanged}) => {
    /*Props send:
        - butText: text of the button that opens the modal
        - title: title of the modal
        - mapId: id of the map that the flag belongs to (necessary to set the flag in the map document)
        - hasFlagChanged and setHasFlagChanged: state to rerender some components of the edit page when a flag has been created or updated 
     */

    // Initial flag set as null
    const initialFlag = {
        question: '',
        answer: Array(4).fill(""),

        correctAnswer: 0,
        score: 0,
        clueToNextFlag: '',
        img: ''
      }
    
    /*State of the modal */
    const [isModalVisible, setIsModalVisible] = useState();
    /* State of the flag information */
    const [flag, setFlag] = useState(initialFlag);
    /* State of loading, to disable button when it is making the petition to the server */
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();

    /*Cloudinary url to upload there our images*/
    const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";

    //When we click on the button if mades the modal visible.
    const showModal = () => {
        setIsModalVisible(true);
    };

    //Saves on database the new flag and updates the map document with the new flag
    const handleOk = async () => {
        try {
            setIsLoading(true);
            if (flag.img) { //If we have chosen an image we upload it to cloudinary
            const formData = new FormData();
            formData.append('file', flag.img);
            formData.append("upload_preset", "flag_image");
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

            /*Then we make the petition to the cloudinary services to upload the image*/
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            const {secure_url} = data;  //here we have the url of the image uploaded to cloudinary to keep it in our database
            flag.img = secure_url;
            }
            
            /*Then we make the petition to the database to save the new flag and update the map*/
            const res = await fetch('/api/flag', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: flag.question,
                    answer: flag.answer,
                    correctAnswer: flag.correctAnswer,
                    score: flag.score,
                    clueToNextFlag: flag.clueToNextFlag,
                    img: flag.img,
                    mapId: mapId
                }),
            })
            const json = await res.json();
            const {error} = json;
            if (error) throw error;
            setHasFlagChanged(!hasFlagChanged);
            openNotification({msg: "Success!", description: "Your flag has been registered!"});
            setIsModalVisible(false);
        }catch(er){
            openNotification({msg: "Error", description: er});
        }finally {
            setIsLoading(false);
        }
    };

    //When we click on the cancel button, the modal is closed
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /*Rendered tags and elements */
    return (
    <>
        <Button type="primary" onClick={showModal}>{butText}</Button>
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
                <Button key="submit" type="primary" onClick={handleOk} htmlType="submit">
                    Create new flag
                </Button>,
              ]}
        >
            {/*Form to fill the information of a new flag */}
            <Form
            form={form}
            onFinish={handleOk}
            method='POST'
            scrollToFirstError
            >
                <Form.Item
                    label="Question"
                    name="question"
                    value={flag.question}
                    tooltip="Insert the question that will be displayed when arriving to the flag"
                    onChange={(e)=>setFlag({
                        ...flag,
                        question: e.target.value
                    })}
                    rules={[{ 
                        required: true, 
                        message: 'Missing question. Please input a question',
                    }]}
                >
                    <Input/>
                </Form.Item>
                        
                <div>Possible answers: insert four possible answers to the question and tick the correct one.</div>
                <Form.Item name="answers">
                    <Radio.Group 
                        defaultValue={flag.correctAnswer}
                        value={flag.correctAnswer}
                        onChange={(e)=>setFlag({
                            ...flag,
                            correctAnswer: e.target.value
                        })}
                    >
                        {
                            [...Array(4)].map((answer, index) => {
                                return (
                                <Radio value={index} key={index}>
                                    <Form.Item
                                        label={`Answer ${index + 1}`}
                                        name={`answer${index}`}
                                        value={flag.answer[index]}
                                        onChange={(e)=>{
                                            let auxArray = [...flag.answer];
                                            auxArray[index] = e.target.value;
                                            setFlag({
                                            ...flag,
                                            answer: auxArray
                                        })}}
                                        rules={[{ 
                                            required: true, 
                                            message: 'Missing question. Please input a question',
                                        }]}
                                    > 
                                        <Input/>
                                    </Form.Item>
                                </Radio>);
                            })
                        } 
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Next clue of the map "
                    name="clueToNextFlag"
                    value={flag.clueToNextFlag}
                    onChange={(e)=>setFlag({
                        ...flag,
                        clueToNextFlag: e.target.value
                    })}
                    rules={[{ 
                        required: true, 
                        message: 'Please input a clue to continue/finish the map!',
                    }]}
                >
                    <Input.TextArea 
                        allowClear="true"
                        placeholder="Write the clue to find the next flag. If this is the last flag, insert a text to finish the map."
                    />
                </Form.Item>
                <Form.Item
                    label="Score of the answer"
                    name="score"
                    tooltip="Insert the score that the player will receive when answer propertly [0-1000]" 
                    value={flag.score}
                    onChange={(e)=>setFlag({
                        ...flag,
                        score: parseInt(e.target.value)
                    })}
                >
                    <InputNumber
                        defaultValue={100}
                        min={0}
                        max={1000}
                        step={10}
                    />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Flag picture"
                    value={flag.img}
                    onChange={(e)=>setFlag({
                        ...flag,
                        img: e.target.files[0]
                    })}
                    extra="Optional selection of a picture that represents this concrete flag"
                >
                    <Upload 
                        name="flagLogo" 
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

export default Modal_flag_creation_window;