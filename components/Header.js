import { PageHeader, Menu, Dropdown, Button, Avatar } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/router';
import { setLogged } from 'store/slices/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import openNotification from './common/notification';



const Header = () => { 
    const dispatch = useDispatch();
    const {logged} = useSelector(state => state.user);
    const router = useRouter();


    const menu = (
    <Menu>
        <Menu.Item>
        <a rel="noopener noreferrer" href="">
            See profile
        </a>
        </Menu.Item>
        <Menu.Item>
        <a rel="noopener noreferrer" href="">
            Games
        </a>
        </Menu.Item>
        <Menu.Item>
        <a rel="noopener noreferrer" href="">
            Whatever
        </a>
        </Menu.Item>
    </Menu>
    );

    const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
        <Button type="text" icon={<MenuOutlined  style={{ fontSize: 20 }} />} />
    </Dropdown>
    );
    // return (
    //     <header className={styles.headerComponent}>
    //         <div>
    //         <DropdownMenu key="more" />
    //         {/*TODO: create a home icon that redirects into index*/} 
    //         <Avatar
    //             className={styles.avatar}
    //             size={80}
    //             src="https://res.cloudinary.com/bybsite/image/upload/v1649782019/happyBrain_xzsmkl.png"
    // />
    //             <strong>Break your Brain</strong>
    //         <Button 

    //         className={styles.logButton}
    //         onClick={() => {
    //             if(logged === true) {
    //                 dispatch(setLogged({  logged: false, token: '', username: '' }));
    //                 /*TODO: confirmation window (?) */
    //                 openNotification({msg: "See you", description: "You have been logged out"});
    //             } else 
    //             router.push('/login')
    //         }}
    //         >
    //             {logged ? "Logout" : "Login"}
    //         </Button>
    //         </div>
    //     </header>
    // );

    
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
        <Image src="https://res.cloudinary.com/bybsite/image/upload/v1649782019/happyBrain_xzsmkl.png"
            alt="ByB"
            width={64}
            height={64}
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
        <DropdownMenu key="more" />,
        ]}
        //avatar={{ src: './../imgs/happyBrain.jpg' }}
    >
    </PageHeader>
    );
    
    
};

export default Header;



