import { PageHeader, Menu, Dropdown, Button } from 'antd';
import { MenuOutlined} from '@ant-design/icons';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import {useRouter} from 'next/router';
import { setLogged } from 'store/slices/user/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import openNotification from './common/notification';
import Link from 'next/link';


/*Header component with the dropdown menu, the logo and title and also a login button */
const Header = () => { 
    //We need the dispatcher and selector to use the redux store (get info stored and updated it if necessary)
    const dispatch = useDispatch();
    const {logged} = useSelector(state => state.user);
    //The router allows us to navigate between pages
    const router = useRouter();


    /*The dropdown menu have some items with a link
    (Link is a Next component that allow to navigate between pages too, considering that React uses components and some
        states aren't kept if a page reload or a new page load occurs) and the content of the link */
    const menu = (
    <Menu>
        <Menu.Item>
        <Link href="/profile">
        <a>See my Profile</a>
        </Link>
        </Menu.Item>
        <Menu.Item>
        <Link href="map/create">
        <a>Create a new Map</a>
        </Link>
        </Menu.Item>
        <Menu.Item>
        <Link href="/list">
        <a>Available Maps</a>
        </Link>
        </Menu.Item>
        <Menu.Item>
        <Link href="/register">
        <a>Register new User</a>
        </Link>
        </Menu.Item>
    </Menu>
    );

    /* The DropdownMenu is an a Ant Design graphic component, that displays an image/icon and works as a button and when you hover it, it shows all the menu items */
    const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu} placement="bottomRight">
        <Button type="text" icon={<MenuOutlined  style={{ fontSize: 20 }} />} />
    </Dropdown>
    );
    
    /*Rendered header component */
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
        <DropdownMenu key="more" className={styles.dropDownMenu} />,
        /*Here we find a Link element that routes into the home page, instead a text/button it is an image of the logo of the application */
        <Link href="/">
            <a className={styles.logo}>
            {/*We use the class Image from Nextjs because is the way to display local images (and external if you configure it in the next.config.js)
            In this case is a local image (the root begins in the public directory) */}
            <Image 
                src="/happyBrain.png"
                alt="ByB"
                width={80}
                height={80}
            />
            </a>
        </Link>,
        /*Title of the header */
        <h1>Break your Brain</h1>,
        /*Login button, it use the dispatcher to see if your are logged or not and has a different behavior in both cases */
        <Button 

            className={styles.logButton}
            onClick={() => {
                if(logged === true) {
                    //If you are logged, you can logout, that means that you need to set the dispatcher of the user to false and null values
                    dispatch(setLogged({  
                        logged: false, 
                        token: '', 
                        username: '',
                        email: '',
                        img: '',
                        active_maps: [],
                        actual_flag: [],
                        scores: [],
                        maps_owned: []
                    }));
                    //Also it displays a notification
                    openNotification({msg: "See you", description: "You have been logged out"});
                } else //If you are not logged, you can login, it routes you into the login page
                router.push('/login')
            }}
        >
            {/*The content of the button displayed changes depending of if you are logged or not */}
            {logged ? "Logout" : "Login"}
        </Button>,
        ]}
    >
    </PageHeader>
    );
    
    
};

export default Header;



