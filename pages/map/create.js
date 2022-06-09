import {useState, useEffect } from 'react';
import {Form, Input, Button, Upload, Spin} from 'antd';
import {useRouter} from 'next/router';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined, LoadingOutlined} from '@ant-design/icons';

import MainLayout from 'layouts/MainLayout';
import styles from '../../styles/createMap.module.scss';
import openNotification from '@components/common/notification';
import { useSelector } from 'react-redux';



const createMap = () => {
    const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";
    const router = useRouter();
    const {token} = useSelector(state => state.user);


    useEffect(() => { //If the user is not logged, routes you into login page
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
      /*State of creation to disable submit button while fetching */
      const [isCreating, setIsCreating] = useState(false);
      const [form] = useForm();
      

      const onFinish = async () => {
        /*Function call when we submit the form */
          try{
            setIsCreating(true);
            if (map.img) {
               /*First of all, we prepare the image to be upload to cloudinary (for security reasons we can't get directly the path of the upload file) */
                const formData = new FormData();
                formData.append('file', map.img);
                formData.append("upload_preset", "map_image");
                formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
       
               /*Then we make the petition to the cloudinary services to upload the image*/
               const response = await fetch(url, {
                 method: "POST",
                 body: formData
               });
       
               const data = await response.json();
               const {secure_url} = data;    
               map.img = secure_url; //here we have the url of the image uploaded to cloudinary to keep it in our database
            }
            
          /*Then we make the petition to the backend to create the map*/
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
           const {error} = json;
           if (error) throw error;
           router.push(`/map/${json.map._id}/edit`);
           openNotification({msg: "Success!", description: "Your map has been created. Now create some flags!"});
         }catch(er){
           console.log({er})
           openNotification({msg: "Error", description: er});
           setIsCreating(false);
         } 
      };

    /*Rendered component */
      return (
          <MainLayout>
         {/*We use the Form component from ant design, with some items and properties (as the onFinish method) */}
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
                  /*This method is called when the content of the input is changed,
                  we use the spread operator to set the new value of the map with all the old ones and the concrete new one for which we take the value of the input*/
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
                    action={"/api/img"}
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
                  {
                    isCreating ? 
                    <Button type="primary" htmlType="submit" disabled>
                      <Spin indicator={<LoadingOutlined/>}/> 
                    </Button> 
                    :
                    <Button type="primary" htmlType="submit">
                        Create new map
                    </Button>
                  }
                </Form.Item>
            </Form>
        </MainLayout>
      );
  
}

export default createMap;
