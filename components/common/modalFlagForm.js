import { useState } from 'react';
import { Modal, Button, Form, Input, Upload,Radio, InputNumber } from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

import openNotification from '@components/common/notification';


/*Component import from Ant Design. It allows you to display a pop up window with some information and and "Accept" or "Cancel" option to continue or stop whatever proccess it refers */
const Modal_flag_creation_window = ({butText, title, mapId, hasFlagChanged, setHasFlagChanged}) => {
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
  const [flag, setFlag] = useState(initialFlag);
  const [form] = useForm();

  const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
        if (flag.img) {
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
          console.log(json);
          const {error} = json;
          if (error) throw error;
          setHasFlagChanged(!hasFlagChanged);
          openNotification({msg: "Success!", description: "Your flag has been registered!"});
          setIsModalVisible(false);
    }catch(er){
          console.log({er})
          openNotification({msg: "Error", description: er});
    }

  };

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
                <Button key="submit" type="primary" onClick={handleOk} htmlType="submit">
                    Create new flag
                </Button>,
              ]}
        >
            <p>El mapa al que pertenezco es {mapId}</p>
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
                    //TODO: different scores pending the times tried
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