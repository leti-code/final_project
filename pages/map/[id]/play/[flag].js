import openNotification from "@components/common/notification";
import { Button, Spin, Radio, Empty, Card } from 'antd';
import { LoadingOutlined, CloseOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import styles from '../../../../styles/playScreen.module.scss';
import Footer from "@components/Footer";
import Image from 'next/image';


/*This page uses a dynamic path, we need this function to get the id (of the map) and flag (id of flag) to complete the path */
export async function getServerSideProps(context) {
    const { id } = context.params;
    const {flag} = context.params;
    
    return {
      props: {id, flag}, // will be passed to the page component as props
    }
};

const PlayFlag = ({id, flag}) => {
  /*This page, becomes from a dynamic path and represent an intermediate or finish screen of the map */
  /*The main style difference is that in the game we don't use MainLayout, we only get the footer and an esc button to go back into home page */


  /*States of flag information, loaders, checkers */
    const [flagInfo, setFlagInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [nextClue, setNextClue] = useState(null);
    const [hasFinishedMap, setHasFinishedMap] = useState(false);
    const router = useRouter();

    useEffect(() => { //Called on mount
      /*Gets the info we need to display of the flag (not all the values, just the question and possible answers*/
        async function getMap(token) {
            try {
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
    }, [isCorrect]);

    /*This function makes a petition to the server to check if the chosen option is the correct one
    
    */
   const checkTheAnswer = async (answer) => {
      const res = await fetch(`/api/flag/${flag}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem("byb_token")}`
        },
        body: JSON.stringify({
          option: answer,
          map: id
        })
      });

      //Displays a message pending on the response of the server
      /*The different options we can find are:
      - Wrong answer
      - Right answer but already answered before (no score add)
      - Right answer and score add */
      const {success, error, nextClue, isLastFlag, scoreAdded} = await res.json();
      if(!success){
        openNotification({msg: "Ohh!!", description: error});
      } else if(success && nextClue ) {
        setIsCorrect(true);
        setNextClue(nextClue);
        if(error)
          openNotification({msg: "Watch out!", description: error});
        else
          openNotification({msg: "Correct!", description: "You have earned " + scoreAdded + " points"});
        if(isLastFlag) {
          //Once you hit the flag, if is the last of the map you get an aditional message to inform
          setHasFinishedMap(true);
          openNotification({msg: "Congratulations!", description: "You have finished the map!"});
        }
      }
    };
   
  return (
    <div className ={styles.background}>
         <div className={styles.backButton}>
             <Button danger type="primary" onClick={() => router.push("/")} icon={<CloseOutlined />}/>
         </div>
       {isLoading ? 
      <div className={styles.loading}>
       <Spin className ={styles.spinner} indicator={<LoadingOutlined className={styles.spinIcon}/>}/> 
       </div> 
      : 
      <>
       {flagInfo ?
      <>
       <p className={styles.paragraph}>Here you will find the cuestion you must answer. Once you have the right answer you will receive the next clue.</p>
       { 
        flagInfo.img &&
        <div className={styles.flagImage}>
          <Card

            style={{ width: 350, height:200 }}
            bordered={true}
            cover={
              <Image
                alt="flag Image"
                src={flagInfo.img}
                width={350}
                height={200}
                layout="responsive"
              />
            }
          >
          </Card>
        </div>
       }
       <div className={styles.question}>
        <strong>{flagInfo.question  }</strong>
       </div>
          <Radio.Group 
            defaultValue={flagInfo.answer[0]}
            onChange={(e)=>{
              checkTheAnswer(e.target.value)
            }}
          >
          {
            flagInfo.answer.map((answer, index) => {
            return (
              <div className={styles.item}>
              <Radio value={index} key={index}>
                {answer}
              </Radio>
              </div>);
            })
            } 
          </Radio.Group>
          { isCorrect && nextClue &&
            <div className={styles.nextClue}>
              {hasFinishedMap ? <strong>Congrats!! You have finish!</strong> : <strong>Next clue:</strong>}
              <p>{nextClue}</p>
            </div>
          }
          <div className="nextClue"></div>
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