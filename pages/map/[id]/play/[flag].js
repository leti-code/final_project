import openNotification from "@components/common/notification";
import {Button, Spin, Divider, Empty, Avatar, Card} from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import styles from '../../../../styles/playInit.module.scss';
import Footer from "@components/Footer";



export async function getServerSideProps(context) {
    const { id } = context.params;
    
    return {
      props: {id}, // will be passed to the page component as props
    }
  };

const PlayFlag = ({id}) => {
    const [mapInfo, setMapInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [isJoined, setIsJoined] = useState(false);

    const setTheGame = async () => {
      console.log("I'm setting on user profile this map")
      setIsJoined(true);
    };

    useEffect(() => {
        async function getMap(token) {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/map/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                const {map} = await res.json();
                setMapInfo(map);
                setIsLoading(false);
            } catch (er) {
                openNotification({msg: "Error", description: "This map is not available"});
                router.push("/");
            }
        };
        const newToken = window.localStorage.getItem("byb_token");
        getMap(newToken);
    }, []);
   
  return (
    <div className ={styles.background}>
        <div className={styles.backButton}>
            <Button danger type="primary" onClick={() => router.push("/") /*TODO: que salte un alert avisando */} icon={<CloseOutlined />}/>
        </div>
      {isLoading ? 
      <div className={styles.loading}>
      <Spin className ={styles.spinner} indicator={<LoadingOutlined className={styles.spinIcon}/>}/> 
      </div> 
      : 
      <>
      {mapInfo ?
      <>
      <Divider orientation="center">{mapInfo.mapname}</Divider>
      <p>Here you will find the clue that will take you to the first flag. If you want to play this game you must click on the "Join this map!" button to be registered in your user profile and be able to access the different stops.
Once you decipher the clue, go to the place it indicates to find the QR code, scan it with any QR scanner application, access the QR link and the first question will appear on your screen.</p>
            <div className={styles.cardFirstClue}>
            {/* <Card> */}
            {mapInfo.firstClue}
            {/* </Card> */}
            </div>
            <div className={styles.joinButton}>
            {
              isJoined ?
              <Button type="primary" disabled>Already playing this map</Button>
              :
              <Button type="primary" onClick={setTheGame}>Join this map!</Button>
            }
            </div>
            </>
            : <Empty />
            }
            </>
    }
    <Footer/>
    </div>
  )
};

export default PlayFlag;