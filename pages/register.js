import {React,useState } from 'react';
import {useRouter} from 'next/router';
import { Form, Input, Button, Checkbox, Upload} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import MainLayout from 'layouts/MainLayout';
import { UploadOutlined } from '@ant-design/icons';
import styles from '../styles/register.module.scss';
import openNotification from '@components/common/notification';
// import Modal_window from '@components/common/modal';

const register = () => {
  const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload";
  const router = useRouter();

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

    const initialUser = {
      username: '',
      password: '',
      email: '',
      img: ''
    };
  
    const [ user, setUser] = useState(initialUser);
    const [form] = useForm();
        
    const onFinish = async () => {
      try{
         const formData = new FormData();
         formData.append('file', user.img);
         formData.append("upload_preset", "user_image");
         formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);


        const response = await fetch(url, {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        const {secure_url} = data;

        const res = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: user.username,
              password: user.password,
              email: user.email,
              img: secure_url
            }),
        })
        const json = await res.json();
        const {error} = json;
        if (error) throw error;
        console.log("response:", json);
        openNotification({msg: "Success!", description: "You have been registered. Log in to start!"});
        router.push("./login");
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
        className={styles.registerComponent}
        onFinish={onFinish}
        method='POST'
        scrollToFirstError
      >
        <Form.Item
          label="Username"
          name="username"
          value={user.username}
          tooltip="What do you want others to call you?"
          onChange={(e)=>setUser({
            ...user,
            username: e.target.value
          })}
          rules={[{ 
            required: true, 
            message: 'Please input your username!',
            whitespace: true
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
        name="email"
        label="E-mail"
        value={user.email}
        onChange={(e)=>setUser({
          ...user,
          email: e.target.value
        })}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          value={user.password}
          onChange={(e)=>setUser({
            ...user,
            password: e.target.value
          })}
          rules={[{ required: true, message: 'Please input your password!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>


        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            })
          ]}
        >
          <Input.Password />
      </Form.Item>

      <Form.Item
          name="upload"
          label="Profile picture"
          value={user.img}
          onChange={(e)=>setUser({
            ...user,
            img: e.target.files[0]
            
          })}
          extra="Select your profile picture"
        >
          <Upload/>
          <Upload 
            name="logo" 
            listType="picture" 
            maxCount={1} 
            accept=".jpg, .png, .jpeg"

            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
        I have read the <a target="_blank" href="./termsConditions">agreement</a>
        </Checkbox>

        {/*example of modal use
         <Modal_window
          butText="Agreement"
          title="Terms and Conditions"
          content="Aquí iría toda la info"
        /> */}
      </Form.Item>


        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
          Register
          </Button>
        </Form.Item>
        </Form>

      </MainLayout>
    )
  }
  
  export default register;
