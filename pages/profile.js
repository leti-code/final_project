import {React,useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import Image from 'next/image';


import { Avatar, Card, Divider, Table, Row, Col } from 'antd';
import { EditOutlined, SettingOutlined, EditTwoTone } from '@ant-design/icons';

import MainLayout from "layouts/MainLayout";
import openNotification from "@components/common/notification";
import { setLogged} from 'store/slices/user/user.slice';



const Profile = () => {
    const dispatch = useDispatch();
    const {logged, username, email, img, active_maps, actual_flag, scores, maps_owned} = useSelector(state => state.user);
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);

  const { Meta } = Card;

    
    useEffect(async () => {
        async function getUser(token) {
            try {
                const res = await fetch('/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                const user = await res.json();
                return user;
            } catch (er) {
                return ({success: false, user: null});
            }
        };
        const newToken = window.localStorage.getItem("byb_token");
        if(logged){
            setUserInfo({username, email, img, active_maps, actual_flag, scores, maps_owned});
        }
        else if (newToken) {
            const {success, user} = await getUser(newToken);
            if (success === true) {
                dispatch(setLogged({  
                logged: true, 
                token: newToken, 
                username: user.username,
                email: user.email, 
                img: user.img, 
                active_maps: user.active_maps,
                actual_flag: user.actual_flag, 
                scores: user.scores, 
                maps_owned: user.maps_owned 
            }));
            setUserInfo({
                username: user.username, 
                email: user.email, 
                img: user.img, 
                active_maps: user.active_maps,
                actual_flag: user.actual_flag, 
                scores: user.scores, 
                maps_owned: user.maps_owned
            });
            } 
        }
        else {
            openNotification({msg: "Error", description: "You are not logged in. Please login first."});
            router.push("/login");
        } 
    }, []);

    const columns = [
        {
          title: 'Map',
          dataIndex: 'map',
          width: "50px",
        },
        {
          title: 'Current flag',
          dataIndex: 'flag',
          width: "50px",
        },
        {
          title: 'Score',
          dataIndex: 'score',
          width: "50px",

        },
      ];
    
    const tableData = [];
    if(userInfo){
        for (let i = 0; i < userInfo.active_maps.length; i++) {
            tableData.push({
                key: i,
                map: userInfo.active_maps[i].mapname,
                flag: userInfo.actual_flag[i],
                score: userInfo.scores[i]
            });
        }
    };

    return (
        <MainLayout>
            {
                userInfo &&
                <>
                    <Divider orientation="left">User profile</Divider>
                    <hr/>
                    <div>
                    <Avatar size={250} src={userInfo.img ? userInfo.img : "/userDefault.png"}/>
                    {/* //TODO: make a button to edit the image */}
                    <Avatar size="small" icon={<EditTwoTone/>} />
                    </div>

                    <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 3 }} />


                    <Divider orientation="left">Your created maps</Divider>
                    <Row gutter={[6,32]} >
                    {
                    userInfo.maps_owned.map(card => (
                        <Col className="gutter-row" span={8}>
                        <Card
                        style={{ width: 300 }}
                        bordered={true}
                        cover={
                            <Image
                            alt="map Image"
                            src={card.img ? card.img : "/map.jpg"}
                            width={300}
                            height={200}
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                        ]}
                        >
                        <Meta
                            title={card.mapname}
                            description={card.description}
                        />
                        </Card>
                        </Col>
                        ))}
                    </Row>
                </>
            }
        </MainLayout> 
    );
};

export default Profile;
