import { Card} from 'antd';
import { Spin, Row, Col, Divider } from 'antd';

import { PlaySquareOutlined, SettingOutlined, LoadingOutlined} from '@ant-design/icons';
import Image from 'next/image';
import MainLayout from "layouts/MainLayout";
import openNotification from '@components/common/notification';
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import Link from 'next/link';
import styles from '../styles/index.module.scss';


const Index = () => {
  const { Meta } = Card;
  const [cards, setCards] = useState([]);
  const {maps_owned} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  /*This is the method that will be executed when the component is mounted*/
  useEffect(async () => {
    async function getMaps() {
      try {
        /*We make a request to get all the available maps */
        setIsLoading(true);
        const res = await fetch("/api/map/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const maps = await res.json();
        return maps;
      }catch(er) {
        return({success: false, maps: null});
      }finally {
        setIsLoading(false);
      }
    };
    const {success, maps} = await getMaps();
    if(success === true)
      setCards(maps);
    else 
      openNotification({msg: "Error", description: "There aren't maps available."})
  }, []);

  return(
    <MainLayout>

      {/*TODO: little description of the app */}
    <Divider orientation='="left'>Welcome to ByB!</Divider>
    <p>Welcome to Break your Brain. This is an application designed for its users to create game maps and play existing maps.
To play or create you need to be registered (you can find the link in the menu), which will open the doors to hours of endless fun.
The game maps are the classic game of clues, each of which allows you to find a point on the map. At this point you will find a question with several answers and if you get it right you will be awarded a score and provided with the next clue to find the next point.
We invite you to browse through our pages, where you can find the different options of our application.
</p>

    <Divider orientation="left">See our maps and play</Divider>
    {
      isLoading ?
      <div className={styles.loading}>
      <Spin className ={styles.spinner} indicator={<LoadingOutlined className={styles.spinIcon}/>}/> 
      </div> 
      :
    /*We use the Row and Col components from ant design to display the map cards in a grid*/
   <Row gutter={[12,32]} >
   {/* <ul> */}
    {
      /*We make a mapping of the array of maps and design with each one a card that displays the main map information */
      cards.map((card, index) => (
        <Col className="gutter-row" span={24} key={index}>
        <Card
          style={{ width: 300 }}
          bordered={true}
          cover={
            <Image
              alt="map Image"
              src={card.img ? card.img : "/defaultMap.jpg"}
              width={300}
              height={200}
              layout="responsive"
            />
          }
          actions={[
            maps_owned && maps_owned.find( map => map._id === card._id ) ?
                <Link href={`/map/${card._id}/edit`}>
                    <a>{<SettingOutlined key="setting" alt="Edit map"/>}</a>
                </Link>
            :
                <Link href={`/map/${card._id}/play`}>
                    <a>{ <PlaySquareOutlined key="play" alt="Start map" />}</a>
                </Link>
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
    }

    
    </MainLayout>
  );
} 

export default Index;

