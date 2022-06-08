import openNotification from "@components/common/notification";
import {Button, Spin, Divider, Empty, Avatar, Card} from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import styles from '../../../../styles/playInit.module.scss';
import Footer from "@components/Footer";
import { useSelector } from 'react-redux';
import ScannerButton from "@components/common/scannerButton";

/*This page uses a dynamic path, we need this function to get the id to complete the path */
export async function getServerSideProps(context) {
    const { id } = context.params;
    return {
      props: {id}, // will be passed to the page component as props
    }
  };

const Play = ({id}) => {
  /*This page, becomes from a dynamic path and represent the first screen of the game of each map */
  /*The main style difference is that in the game we don't use MainLayout, we only get the footer and an esc button to go back into home page */

  const [mapInfo, setMapInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  /*State to enabled/disabled the button, to avoid that the same user join the same map more than once */
  const [hasJoined, setHasJoined] = useState(false);
  const {active_maps} = useSelector(state => state.user);

  /*This function update the user document in the database, it add this map as an active_maps in user */
    const setTheGame = async () => {
      try {
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

    useEffect(() => { //gets info of map from database to display description and firstClue
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
                if (active_maps.find(singleMap => map._id === singleMap._id) !== undefined)
                {
                  setHasJoined(true);
                }
                setMapInfo(map);
            } catch (er) {
                openNotification({msg: "Error", description: "This map is not available or you are not authorized"});
                router.push("/");
            } finally {
                setIsLoading(false);
            }
        };
        const newToken = window.localStorage.getItem("byb_token");
        getMap(newToken);
    }, []);
   
  return (
    <div className ={styles.background}>
      <div className={styles.backButton}>
        <Button danger type="primary" onClick={() => router.push("/")} icon={<CloseOutlined />}/>
      </div>
      {isLoading ? 
      //If the info of map is not loaded yet, show a loading animation
      <div className={styles.loading}>
      <Spin className ={styles.spinner} indicator={<LoadingOutlined className={styles.spinIcon}/>}/> 
      </div> 
      : 
      <>
      {mapInfo ?
        <>
    
        <Divider orientation="center">{mapInfo.mapname}</Divider>
        {/*Instructions about how to start the game */}
        <p className={styles.paragraph}>If you want to play this game you must click on the "Join this map!" to set it on your profile.
        Here you will find the clue that will take you to the first flag.
        Decipher it, and go to the place it indicates to find the QR code, 
        click on "Open the camera" button and scan the QR code
        </p>
            <div className={styles.cardFirstClue}>
            {mapInfo.firstClue}
            </div>
            <div className={styles.otherButton}>
            {
              hasJoined ?
              //Displays a different button depending if the user has already joined the map or not
              <Button type="primary" disabled>Already playing this map</Button>
              :
              <Button type="primary" onClick={setTheGame}>Join this map!</Button>
            }
            </div>
            <div className={styles.otherButton}>
            <ScannerButton/>
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