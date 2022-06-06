import {useState } from 'react';
import {useRouter} from 'next/router';
import { Form, Input, Button, Checkbox, Upload, Spin} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import MainLayout from 'layouts/MainLayout';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from '../styles/register.module.scss';
import openNotification from '@components/common/notification';

const register = () => {
  const url = "https://api.cloudinary.com/v1_1/bybsite/image/upload"; //public url to make the petition to the cloudinary services
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

    //Initial user setted as null
    const initialUser = {
      username: '',
      password: '',
      email: '',
      img: ''
    };
  
    const [ user, setUser] = useState(initialUser); //React useState to set the user in the front component
    const [isCreating, setIsCreating] = useState(false); 
    const [form] = useForm();
        
    const onFinish = async () => { //method executed when we submit the form (with the button or pressing enter key)
      try{

        setIsCreating(true);
        /*First of all, we prepare the image to be upload to cloudinary (for security reasons we can't get directly the path of the upload file) */
         const formData = new FormData();
         formData.append('file', user.img);
         formData.append("upload_preset", "user_image");
         formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

          /*Then we make the petition to the cloudinary services to upload the image*/
        const response = await fetch(url, {
          method: "POST",
          body: formData
        });

        const data = await response.json();
        const {secure_url} = data;  //here we have the url of the image uploaded to cloudinary to keep it in our database
        user.img = secure_url;

        /*Then we make the petition to the backend to create the user*/
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: user.username,
              password: user.password,
              email: user.email,
              img: user.img
            }),
        })
        const json = await res.json();
        const {error} = json;
        if (error) throw error;
        router.push("./login");
        openNotification({msg: "Success!", description: "You have been registered. Log in to start!"});
      }catch(er){
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
            /*This method is called when the content of the input is changed,
             we use the spread operator to set the new value of the user with all the old values and the concrete new one for which we take the value of the input*/
            ...user,
            username: e.target.value
          })}
          rules={[{ //we have rules of the input (is a required field, the message displayed when the field is not filled...)
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
            /*we can also specify a concrete type of string (it uses a regex to check if it is a valid email) */
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
          /*In this field we have dependencias and feedback and also a function inside the rules. This properties from this ant design component
          allows us to compare the content of this input with another one and check if it is the same */
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
          {/*Upload component from Ant Design that allows you to select from your file navigator a file */}
          <Upload 
            name="logo" 
            listType="picture" 
            maxCount={1}  //you can set the max number of files you can select, in this case we only want one
            accept=".jpg, .png, .jpeg" //you can set the type of files you can select
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button> {/*we use the icon to display the upload button*/}
          </Upload>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          /*this rule implies that you have to click on the checkbox because if the check is not marked you cannot submit the form */
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
      </Form.Item>

        {/*Submit button */}
        <Form.Item {...tailFormItemLayout}>
          {
            isUpdating ?
            <Button type="primary" htmlType="submit" disabled>
              <Spin indicator={<LoadingOutlined/>}/> 
            </Button>
            :
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          }
        </Form.Item>
        </Form>

      </MainLayout>
    )
  }
  
  export default register;
