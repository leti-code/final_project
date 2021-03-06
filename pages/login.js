import {React,useState } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button} from 'antd';
import styles from '../styles/login.module.scss';
import { setLogged } from 'store/slices/user/user.slice';
import MainLayout from 'layouts/MainLayout';
import openNotification from 'components/common/notification';
import { useForm } from 'antd/lib/form/Form';


const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {logged, token, username, email, img, active_maps, actual_flag, scores, maps_owned} = useSelector(state => state.user);

  const initialUser = {
    username: '',
    password: ''
  };

  const [ user, setUser] = useState(initialUser);
  const [form] = useForm();

  const onFinish = async () => { //method called when we click the submit button
    try{
      //Makes a request to the database to check if the user exists and the password match with the one saved.
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
      /*If the response of the request is an user and also its token, we set the dispatcher */
      const {user: newUser, token: newToken, logged: isLogged, error} = json;
      if (error) throw error;
      dispatch(setLogged({  
        logged: isLogged, 
        token: newToken, 
        username: newUser.username, 
        email: newUser.email, 
        img: newUser.img, 
        active_maps: newUser.active_maps,
        actual_flag: newUser.actual_flag, 
        scores: newUser.scores, 
        maps_owned: newUser.maps_owned
      }));
      openNotification({msg: "Welcome", description: "You have been logged in"});

      //We redirect the user to the home page
      router.push("./");
    }catch(er){
      openNotification({msg: "Error", description: er});
      /*If something goes wrong in the login, we set the user to null (no logged) */
      setUser(initialUser);
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  /*Rendered component */
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
        <Button type="primary" htmlType="submit" className={styles.submitButton}>
          Submit
        </Button>
      </Form.Item>
      </Form>
        <div className={styles.registry}>
          Not registered? Go to 
          <Link href="/register">
            <a> registry</a>
          </Link>
        </div>
    </MainLayout>
  )
}

export default login;