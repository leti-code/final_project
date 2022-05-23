import openNotification from "@components/common/notification";
import {Button, Spin, Divider, Empty, Avatar, Card} from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import styles from '../../../../styles/playInit.module.scss';
import Footer from "@components/Footer";
import { useSelector } from 'react-redux';

// import Image from 'next/image';




export async function getServerSideProps(context) {
    const { id } = context.params;
    
    return {
      props: {id}, // will be passed to the page component as props
    }
  };

const Play = ({id}) => {
    const [mapInfo, setMapInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [hasJoined, setHasJoined] = useState(false);
    const {active_maps} = useSelector(state => state.user);

    const setTheGame = async () => {
      console.log("I'm setting on user profile this map");
      try {
        //TODO: necesito pasarle el id del usuario y el id del mapa (eso ya se lo pasamos)
        //de modo que pueda hacer push en el array correspondiente del usuario y setear los otros valores
        //(score -1 y flag undefined)
        //mando el token y lo decodifico?? y sisi, en un middleware o en el back?
        const res = await fetch('/api/play', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('byb_token')}`
          },
          body: JSON.stringify({
            map_id: id
          }),
        });
        const json = await res.json();
        const {error} = json;
        if(error) throw error;
        setHasJoined(true);

      } catch (er) {
        openNotification({msg: "Error", description: "There was a problem setting the map on your user. Check if you are connected and logged in"});
        router.push("/");
    }
      setHasJoined(true);
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
                if (active_maps.find(map => map._id === map._id))
                  setHasJoined(true);
                setMapInfo(map);
                setIsLoading(false);
            } catch (er) {
                openNotification({msg: "Error", description: "This map is not available or you are not authorized"});
                router.push("/");
            }
        };
        const newToken = window.localStorage.getItem("byb_token");
        getMap(newToken);
    }, []);
   
  return (
    <div className ={styles.background}>
      {isLoading ? 
      <div className={styles.loading}>
      <Spin className ={styles.spinner} indicator={<LoadingOutlined className={styles.spinIcon}/>}/> 
      </div> 
      : 
      <>
      {mapInfo ?
        <>
        {/* {mapInfo.img &&
        <>
        <div className={styles.header}>
          <img
                src={mapInfo.img}
                width="100vw"
                
                // layout="intrinsic"
                // sizes="(max-width: 800px) 100vw, 800px"
                // objectFit="parent"
                // width={1500}
                // height={1000}
              />
        </div> */}
        <div className={styles.backButton}>
            <Button danger type="primary" onClick={() => router.push("/") /*TODO: que salte un alert avisando */} icon={<CloseOutlined />}/>
        </div>
        {/* </>} */}
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
              hasJoined ?
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

export default Play;