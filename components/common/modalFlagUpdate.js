import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Upload,Radio, InputNumber, Avatar, Space } from 'antd';
import { UploadOutlined, EditOutlined,CloudDownloadOutlined} from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

import styles from '../../styles/editMap.module.scss';

// import openNotification from '@components/common/notification';
import DownloadButton from '@components/common/downloadButton';


/*Component import from Ant Design. It allows you to display a pop up window with some information and and "Accept" or "Cancel" option to continue or stop whatever proccess it refers */
const Modal_flag_update_window = ({butText, title, flagToUpdate, indexOfFlag}) => {
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
    const [hasValuesChanged, setHasValuesChanged] = useState(false);
    const [flag, setFlag] = useState(initialFlag);
    const [form] = useForm();

    const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";

    const baseUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
    const myPage = "https://localhost:3000/map/[id]/play/";
    const qrCode = baseUrl + myPage + flagToUpdate._id;

  const showModal = () => {
    setFlag(flagToUpdate);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
      console.log("Nueva info", flag);
      /*TODO:
      - generate the QR code
    //    */
    // try {
    //     if (flag.img) {
    //     const formData = new FormData();
    //     formData.append('file', flag.img);
    //     formData.append("upload_preset", "flag_image");
    //     formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

    //     /*Then we make the petition to the cloudinary services to upload the image*/
    //     const response = await fetch(url, {
    //         method: "POST",
    //         body: formData
    //     });

    //     const data = await response.json();
    //     const {secure_url} = data;  //here we have the url of the image uploaded to cloudinary to keep it in our database
    //     flag.img = secure_url;
    //     }

    //     const res = await fetch('/api/flag', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             qr: "pruebita", //TODO: change
    //             question: flag.question,
    //             answer: flag.answer,
    //             correctAnswer: flag.correctAnswer,
    //             score: flag.score,
    //             clueToNextFlag: flag.clueToNextFlag,
    //             img: flag.img,
    //             mapId: mapId
    //         }),
    //         // id: mapId //TOCHECK: if is valid
    //       })
    //       const json = await res.json();
    //       console.log(json);
    //       const {error} = json;
    //       if (error) throw error;
        //   openNotification({msg: "Success!", description: "Your flag has been registered!"});
          setIsModalVisible(false);
    // }catch(er){
    //       console.log({er})
    //       openNotification({msg: "Error", description: er});
    // }

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
                <Button key="submit" type="primary" onClick={handleOk} htmlType="submit" disabled={hasValuesChanged ? false : true}>
                    Update flag
                </Button>,
              ]}
        >
            <Form
            form={form}
            onFinish={handleOk}
            method='POST'
            scrollToFirstError
            >
                <Space size="large" className={styles.spacingImages} >
                    <Avatar size={150} shape="square" src={flag.img ? flag.img : "/defaultFlag.png"}/>
                    <Button onClick={console.log(flag._id)} shape="circle" icon={<EditOutlined/>} />
                    
                    <DownloadButton src={qrCode} name={`Flag ${indexOfFlag+1}(${flag._id})`}/>
                    <Avatar size={150} shape="square" src={qrCode}/>
                </Space>
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
                    //TODO: different scores pending the times tried
                    label="Score of the answer"
                    name="score"
                    tooltip="Insert the score that the player will receive when answer propertly [0-1000]" 
                    value={flag.score}
                    onChange={(e)=>{
                        setFlag({
                            ...flag,
                            score: e.target.value
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