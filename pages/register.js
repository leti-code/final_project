import {React,useState } from 'react';
import { Form, Input, Button } from 'antd';

const register = () => {
    const initialUser = {
      username: '',
      password: '',
      email: '',
      img: ''
    };
  
    const [ user, setUser] = useState(initialUser);
  
    const onFinish = async () => {
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
      console.log("response:", json);
    };
    
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <div className="register-component">
        
      <Form
        name="basic"
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
      </div>
    )
  }
  
  export default register;