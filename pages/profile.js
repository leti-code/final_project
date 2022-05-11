import {React,useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import Image from 'next/image';

import { Avatar, Card, Divider, Table, Row, Col, Button } from 'antd';
import { EditOutlined, SettingOutlined, EditTwoTone } from '@ant-design/icons';

import MainLayout from "layouts/MainLayout";
import openNotification from "@components/common/notification";
import { setLogged} from 'store/slices/user/user.slice';
import Link from 'next/link';



const Profile = () => {
    const dispatch = useDispatch();
    const {logged, username, email, img, active_maps, actual_flag, scores, maps_owned} = useSelector(state => state.user);
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);

  const { Meta } = Card;

    
    useEffect(async () => {
        async function getUser(token) {
            try {
                /*We take the user information from the database with a request to the server side */
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

        /*Functions below manage that we keep the user state (as logged and to keep th token) even if the page is reload or if we go to another different page */  
        const newToken = window.localStorage.getItem("byb_token");
        if(logged){
            setUserInfo({username, email, img, active_maps, actual_flag, scores, maps_owned});
        }
        //If we have a token, we check that it is a valid user and if it is, we set the user as logged and also all it's information  
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

    /*This variable has the structure of tha table of the active maps (the games the user has already started playing) */
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
    
      /*Here we create the table (is a component from Ant Design) */
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

    /*Rendered component*/
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

                    {/*We can add pagination to our table to display only a few rows*/}
                    <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 3 }} />


                    <Divider orientation="left">Your created maps</Divider>
                    <Row gutter={[6,32]} >
                    {
                        //here we display the maps the user has created same as we do with the available maps in home page
                    userInfo.maps_owned.map((card, index) => (
                        <Col className="gutter-row" span={8}>
                        <Card
                        key={index}
                        style={{ width: 300 }}
                        bordered={true}
                        cover={
                            <Image
                            alt="map Image"
                            src={card.img ? card.img : "/defaultMap.jpg"}
                            width={300}
                            height={200}
                            />
                        }
                        actions={[
                                <Link href={`/map/${card._id}/edit`}>
                                    <a>{<SettingOutlined key="setting"/>}</a>
                                </Link>,
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
