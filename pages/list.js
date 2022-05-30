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




const ListOfMaps = () => {
  const { Meta } = Card;
  const [cards, setCards] = useState([]);
  const {maps_owned, active_maps, actual_flag} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);


  /*This is the method that will be executed when the component is mounted*/
  useEffect(async () => {
    async function getMaps() {
      try {
        /*We make a request to get all the available maps */
        setIsLoading(true)
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

    //TODO:forEach instead of map
  const getIndexOfFlag = (maps, thisMap) => {
    let idx = -1;
    maps.map((singleMap, index) => {
      if (singleMap._id == thisMap._id) {
        idx = index;
      }
    });
    return idx;
  };

  return(
    <MainLayout>
    <Divider orientation="left">Our maps</Divider>
    <p>On this page you will find a list of all maps available for play.
On each of the cards you will see the description of the game and an icon that you can click on.
If the map has been created by you, the icon is a gear that will give you access to the configuration of your map so you can modify it, as well as get the QRs needed to find each flag or stop. Otherwise, the icon is a play and pressing it the game will start, being registered in your user profile.
</p>
    <Divider orientation="left">Choose a map and play!</Divider>
    {
      isLoading ?
      <div className={styles.loading}>
      <Spin className ={styles.spinner} indicator={<LoadingOutlined className={styles.spinIcon}/>}/> 
      </div> 
      :
    /*We use the Row and Col components from ant design to display the map cards in a grid*/
    <Row gutter={[12,32]} >
    {
      /*We make a mapping of the array of maps and design with each one a card that displays the main map information */
      cards.map((card, index) => (
        <Col className="gutter-row" span={24} key={index}>
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
              layout="responsive"
            />
          }
          actions={[
            active_maps && getIndexOfFlag(active_maps, card) !== -1 && actual_flag[getIndexOfFlag(active_maps, card)] !== null ?
              <Link href={`/map/${card._id}/play/${actual_flag[getIndexOfFlag(active_maps, card)]._id  }`}>
                <a>{<PlaySquareOutlined key="play" alt="Start map" />}</a>
              </Link>
            :
              <Link href={`/map/${card._id}/play`}>
                <a>{<PlaySquareOutlined key="play" alt="Start map" />}</a>
              </Link>,
            maps_owned && maps_owned.find( map => map._id === card._id ) &&
                <Link href={`/map/${card._id}/edit`}>
                    <a>{<SettingOutlined key="setting" alt="Edit map"/>}</a>
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

export default ListOfMaps;

