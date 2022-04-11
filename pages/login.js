import {React,useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
// import '../styles/login.scss';
import { setLogged } from 'store/slices/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'layouts/MainLayout';
import Router from 'next/router';


const openNotification = ({msg, description}) => {
  const args = {
    message: msg,
    description,
    duration: 0,
  };
  notification.open(args);
};

const login = () => {
  const dispatch = useDispatch();
  const {logged, token, username} = useSelector(state => state.user);

  const initialUser = {
    username: '',
    password: ''
  };

  const [ user, setUser] = useState(initialUser);

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
      if (error) throw error
      dispatch(setLogged({  logged: isLogged, token: newToken, username: newUser.username }));
      console.log("response:", json);
      Router.push("./");
    }catch(er){
      console.log({er})
      openNotification({msg: "Error", description: er});
      document.getElementById("login-form").reset();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <MainLayout>
      {/* <div className="login-component"> */}
    <Form
      className="login-component"
      name="login"
      id="login-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      method='POST'
    >
      <Form.Item
        label="Username"
        name="username"
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
      {/* </div> */}
    </MainLayout>
  )
}

export default login;