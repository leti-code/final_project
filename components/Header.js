import { PageHeader, Menu, Dropdown, Button, Avatar } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import styles from '../styles/header.module.scss';


const Header = () => { 

    const menu = (
    <Menu>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
            See profile
        </a>
        </Menu.Item>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
            Games
        </a>
        </Menu.Item>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
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

    return (
    <PageHeader
        avatar={{
            icon: <UserOutlined />
            //src: "../imgs/Github.png"
        }}
        title="Break your Brain"
        className={styles.headerComponent}
        extra={[
        <Button 
            key="3" 
            className={styles.logButton}
        >
            Log In
        </Button>,
        <DropdownMenu key="more" />,
        ]}
        //avatar={{ src: './../imgs/happyBrain.jpg' }}
    >
    </PageHeader>
    );
};

export default Header;



