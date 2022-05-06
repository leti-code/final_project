import {React,useState, useEffect } from 'react';
import {Form, Input, Button, Upload} from 'antd';
import {useRouter} from 'next/router';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined} from '@ant-design/icons';

import MainLayout from 'layouts/MainLayout';

import styles from '../../styles/createMap.module.scss';
import openNotification from '@components/common/notification';
import { useSelector } from 'react-redux';



const createMap = () => {
    //TODO: posibility of put this url as an env variable
    const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";
    const router = useRouter();
      const {/*logged, */token} = useSelector(state => state.user);


    //TOENHACE: use midd or something to see if it's a valid user
    useEffect(() => {
        if (!window.localStorage.getItem("byb_token")) {
            openNotification({msg: "Error", description: "You are not logged in. Please login first."});
            router.push("/login");
        }
    }, []);
     /*Stuff of ant design styles for form */
     const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      /*End*/

      const initialMap = {
        mapname: '',
        description: '',
        firstClue: '',
        flags: [],
        img: ''
      };

      const [ map, setMap] = useState(initialMap);
      const [form] = useForm();
      

      const onFinish = async () => {
          console.log(map);
          try{
            if (map.img) {
                const formData = new FormData();
                formData.append('file', map.img);
                formData.append("upload_preset", "map_image");
                formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
       
       
               const response = await fetch(url, {
                 method: "POST",
                 body: formData
               });
       
               const data = await response.json();
               const {secure_url} = data;    
               map.img = secure_url;
            }
            
           const res = await fetch('/api/map', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify({
                 mapname: map.mapname,
                 description: map.description,
                 firstClue: map.firstClue,
                 img: map.img
               }),
           })
           const json = await res.json();
           console.log(json);
           const {error} = json;
           if (error) throw error;
           console.log("response:", json);
           openNotification({msg: "Success!", description: "Your map has been created. Now create some flags!"});
           router.push("./"); //go to createFlag
         }catch(er){
           console.log({er})
           openNotification({msg: "Error", description: er});
         }
      };

      return (
          <MainLayout>
            <Form
            {...formItemLayout}
            form={form}
            className={styles.createMapComponent}
            onFinish={onFinish}
            method='POST'
            scrollToFirstError
            >
                <Form.Item
                label="Name"
                name="mapname"
                value={map.mapname}
                tooltip="What name do you want for your map?"
                onChange={(e)=>setMap({
                    ...map,
                    mapname: e.target.value
                })}
                rules={[{ 
                    required: true, 
                    message: 'Please input your map name!',
                    whitespace: true
                }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                name="upload"
                label="Map picture"
                value={map.img}
                onChange={(e)=>setMap({
                    ...map,
                    img: e.target.files[0]
                    
                })}
                extra="Optional selection of a picture that represents the map globally"
                >
                <Upload 
                    name="mapLogo" 
                    listType="picture" 
                    maxCount={1} 
                    accept=".jpg, .png, .jpeg"

                    >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
                </Form.Item>

                <Form.Item
                label="Description"
                name="description"
                value={map.description}
                tooltip="A global description of your map"
                onChange={(e)=>setMap({
                    ...map,
                    description: e.target.value
                })}
                rules={[{ 
                    required: true, 
                    message: 'Please input a description!',
                    whitespace: true,
                }]}
                >
                    <Input.TextArea 
                    allowClear="true"
                    placeholder="Here you can make a global description of your map, it will be displayed on the maps list"
                    />
                </Form.Item>

                <Form.Item
                label="Begin of the map "
                name="firstClue"
                value={map.firstClue}
                tooltip="Initial text to find the first flag"
                onChange={(e)=>setMap({
                    ...map,
                    firstClue: e.target.value
                })}
                rules={[{ 
                    required: true, 
                    message: 'Please input a first clue to begin the map!',
                    whitespace: true,
                }]}
                >
                    <Input.TextArea 
                    allowClear="true"
                    placeholder="Here you have to write the beginning of your map. It must include the first clue to find the first flag."
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Create new map
                    </Button>
                </Form.Item>
            </Form>
        </MainLayout>
      );
  
}

export default createMap;
