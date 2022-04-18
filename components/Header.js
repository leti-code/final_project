import { PageHeader, Menu, Dropdown, Button } from 'antd';
import { MenuOutlined, HomeFilled,UserOutlined } from '@ant-design/icons';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/router';
import { setLogged } from 'store/slices/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import openNotification from './common/notification';
import Link from 'next/link';



const Header = () => { 
    const dispatch = useDispatch();
    const {logged} = useSelector(state => state.user);
    const router = useRouter();


    const menu = (
    <Menu>
        <Menu.Item>
        <Link href="/profile">
        <a>See my profile</a>
        </Link>
        </Menu.Item>
        <Menu.Item>
        <Link href="/createMap">
        <a>Create a new game</a>
        </Link>
        </Menu.Item>
        <Menu.Item>
        <Link href="">
        <a>Games</a>
        </Link>
        </Menu.Item>
        <Menu.Item>
        <Link href="/register">
        <a>Register new User</a>
        </Link>
        </Menu.Item>
    </Menu>
    );

    const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
        <Button type="text" icon={<MenuOutlined  style={{ fontSize: 20 }} />} />
    </Dropdown>
    );
    
    return (
    <PageHeader
        // avatar={{
            //icon: <UserOutlined />
            // src:{<Image
            //     src="/galaxy.jpg"
            //     alt="Galaxy"
            //     width={1000}
            //     height={750}
            //   />}
        // }}
        //title="Break your Brain"
        className={styles.headerComponent}
        extra={[
        <Button type="text" href="/" icon={<HomeFilled   style={{ fontSize: 20 }} />} />,
        <DropdownMenu key="more" className={styles.dropDownMenu} />,
        <Image 
            src="/happyBrain.png"
            alt="ByB"
            width={80}
            height={80}
        />,
        <h1>Break your Brain</h1>,
        <Button 

            className={styles.logButton}
            onClick={() => {
                if(logged === true) {
                    dispatch(setLogged({  logged: false, token: '', username: '' }));
                    openNotification({msg: "See you", description: "You have been logged out"});
                } else 
                router.push('/login')
            }}
        >
            {logged ? "Logout" : "Login"}
        </Button>,
        ]}
    >
    </PageHeader>
    );
    
    
};

export default Header;



