import { useState } from 'react';
import { Modal, Button, Form, Input, Radio, InputNumber, Avatar, Spin } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

import openNotification from '@components/common/notification';
import DownloadButton from '@components/common/downloadButton';
import Modal_update_image from './modalUpdateImage';



/*Component import from Ant Design. It allows you to display a pop up window with some information and and "Accept" or "Cancel" option to continue or stop whatever proccess it refers */
const Modal_flag_update_window = ({butText, title, flagToUpdate, indexOfFlag, qrSrc, setHasFlagChanged, hasFlagChanged}) => {
    /*Props send:
        - butText: text of the button that opens the modal
        - title: title of the modal
        - flagToUpdate: flag that will be updated
        - indexOfFlag: index of the flag in the array of flags, used to name the QR with the order of the flag
        - qrSrc: url of the QR of the flag (to display it in the modal)
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
    /*Checks if we have add a new value, to allow the update button */
    const [hasValuesChanged, setHasValuesChanged] = useState(false);
    /* State of the flag information */
    const [flag, setFlag] = useState(initialFlag);
    /* State of loading, to disable button when it is making the petition to the server */
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();

    /*Cloudinary url to upload there our images*/
    const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";

    //When we click on the button if mades the modal visible.
    const showModal = () => {
        setFlag(flagToUpdate);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            setIsLoading(true);

            /*We made the petition to the server with the new information of the flag to update it */
            const res = await fetch('/api/flag/', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id : flagToUpdate._id,
                    question: flag.question,
                    answer: flag.answer,
                    correctAnswer: flag.correctAnswer,
                    score: flag.score,
                    clueToNextFlag: flag.clueToNextFlag,
                })
            });
            setHasFlagChanged(!hasFlagChanged);
            openNotification({msg:"Success!", description: "Your flag has been updated!"});
        } catch (er) {
            openNotification({msg: "Error", description: "Something went wrong! Make sure the flag exists, that you are the owner and try it later"});
        } finally {
            setIsLoading(false);
            setIsModalVisible(false);
        }
        };

    //When we click on the cancel button, the modal is closed
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /*Function to upload the url image in the database if it has been updated */
    const saveInDatabase = async (img) => {
        try {
            const res = await fetch('/api/flag/', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id : flagToUpdate._id,
                    img
                })
            });
            setIsModalVisible(false);
            setHasFlagChanged(!hasFlagChanged);
        } catch (er) {
            openNotification({msg: "Error", description: "Couldn't set the info in the database. Please try again."});
        }
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
                    <Button key="submit" type="primary" onClick={handleOk} htmlType="submit" disabled={hasValuesChanged ? false : true}>
                        Update flag
                    </Button>,
                ]}
            >
                {/*Form to fill the new information, at the beginin it displays the old info of the flag*/}
                <Form
                form={form}
                onFinish={handleOk}
                method='POST'
                scrollToFirstError
                >
                        <Avatar size={150} shape="square" src={flag.img ? flag.img : "/defaultFlag.png"}/>
                        <Modal_update_image
                            butText={<EditOutlined/>}
                            title="Update your image. Choose a new one"
                            preset="map_image"
                            setNewImg={(img) => saveInDatabase(img)}    
                        />
                        <Avatar size={150} shape="square" src={qrSrc}/>
                        <DownloadButton src={qrSrc} name={`Flag ${indexOfFlag+1}(${flag._id})`}/>
                    <Form.Item
                        label="Question"
                        name="question"
                        initialValue={flag.question}
                        value={flag.question}
                        tooltip="Insert the question that will be displayed when arriving to the flag"
                        onChange={(e)=>{
                            setFlag({
                            ...flag,
                            question: e.target.value
                            });
                            setHasValuesChanged(true);
                        }}
                    >
                        <Input/>
                    </Form.Item>
                            
                    <div>Possible answers: insert four possible answers to the question and tick the correct one.</div>
                    <Form.Item name="answers">
                        <Radio.Group 
                            defaultValue={flag.correctAnswer}
                            value={flag.correctAnswer}
                            onChange={(e)=>{
                                setFlag({
                                ...flag,
                                correctAnswer: e.target.value
                            });
                            setHasValuesChanged(true);
                            }}
                        >
                            {
                                //We need the Array with a concrete length to avoid missing answer if they are undefined
                                [...Array(4)].map((answer, index) => {
                                    return (
                                    <Radio value={index} key={index}>
                                        <Form.Item
                                            label={`Answer ${index + 1}`}
                                            name={`answer${index}`}
                                            initialValue={flag.answer[index]}
                                            value={flag.answer[index]}
                                            onChange={(e)=>{
                                                let auxArray = [...flag.answer];
                                                auxArray[index] = e.target.value;
                                                setFlag({
                                                ...flag,
                                                answer: auxArray
                                                });
                                            setHasValuesChanged(true);}}
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
                        initialValue={flag.clueToNextFlag}
                        value={flag.clueToNextFlag}
                        onChange={(e)=>{
                            setFlag({
                                ...flag,
                                clueToNextFlag: e.target.value
                            }); 
                        setHasValuesChanged(true);}}
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
                        onChange={(e)=>{
                            setFlag({
                                ...flag,
                                score: parseInt(e.target.value)
                            }); 
                            setHasValuesChanged(true);
                        }}
                    >
                        <InputNumber
                            defaultValue={flag.score}
                            min={0}
                            max={1000}
                            step={10}
                        />
                    </Form.Item>
                    
                </Form>
            </Modal> 
        </>
    );
};

export default Modal_flag_update_window;