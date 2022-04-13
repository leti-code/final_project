import {React,useState } from 'react';
import { Form, Input, Button} from 'antd';
import styles from '../styles/login.module.scss';
import { setLogged } from 'store/slices/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'layouts/MainLayout';
import {useRouter} from 'next/router';
import openNotification from 'components/common/notification';
import { useForm } from 'antd/lib/form/Form';


const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {logged, token, username} = useSelector(state => state.user);

  const initialUser = {
    username: '',
    password: ''
  };

  const [ user, setUser] = useState(initialUser);
  const [form] = useForm();
  const onFinish = async () => {
    try{
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
      })
      const json = await res.json();
      const {user: newUser, token: newToken, logged: isLogged, error} = json;
      if (error) throw error;
      dispatch(setLogged({  logged: isLogged, token: newToken, username: newUser.username }));
      console.log("response:", json);
      openNotification({msg: "Welcome", description: "You have been logged in"});

      router.push("./");
    }catch(er){
      console.log({er})
      openNotification({msg: "Error", description: er});
      setUser(initialUser);
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <MainLayout>
    <Form
      form={form}
      className={styles.loginComponent}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      method='POST'
    >
      <Form.Item
        label="Username"
        name="username"
        value={user.username}
        onChange={(e)=>setUser({
          ...user,
          username: e.target.value
        })}
        rules={[{ required: true, message: 'Please input your username!' }]}
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
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
    </MainLayout>
  )
}

export default login;