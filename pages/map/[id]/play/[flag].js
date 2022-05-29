import openNotification from "@components/common/notification";
import {Button, Spin, Divider, Empty, Avatar, Card} from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import styles from '../../../../styles/playInit.module.scss';
import Footer from "@components/Footer";



export async function getServerSideProps(context) {
    const { id } = context.params;
    const {flag} = context.params;
    
    return {
      props: {id, flag}, // will be passed to the page component as props
    }
  };

const PlayFlag = ({id, flag}) => {
    // const [mapInfo, setMapInfo] = useState(null);
    const [flagInfo, setFlagInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // const [isJoined, setIsJoined] = useState(false);

    // const setTheGame = async () => {
    //   console.log("I'm setting on user profile this map")
    //   setIsJoined(true);
    // };

    useEffect(() => {
        async function getMap(token) {
            try {
              console.log("Entramos aqui");
                setIsLoading(true);
                const res = await fetch(`/api/flag/${flag}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                const {singleFlag} = await res.json();
                setFlagInfo(singleFlag);
                console.log("La info de la flag...",singleFlag);
                setIsLoading(false);
                const resUpdate = await fetch('/api/play/', {
                  method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                      map_id: id,
                      flag_id: flag
                    })
                });
                const {success, actualFlag} = await resUpdate.json();
                if(actualFlag != flag) throw "Error, that is not your actual flag, be sure it is not an old flag in the map";
                if(!success) throw error;
            } catch (er) {
                openNotification({msg: "Error", description: "You are not playing this map or this is not your actual flag"});
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
       {flagInfo ?
      <>
       {/* <Divider orientation="center">{mapInfo.mapname}</Divider> */}
       <p>Here you will find the cuestion you must answer. Once you have the right answer you will receive the next clue.</p>
       <p>{flagInfo.question  }</p>
             {/* <div className={styles.cardFirstClue}>
             {mapInfo.firstClue}
             </div> */}
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