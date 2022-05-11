import { Card} from 'antd';
import { Row, Col, Divider } from 'antd';

import { PlaySquareOutlined} from '@ant-design/icons';
import Image from 'next/image';
import { Button } from "antd";
import MainLayout from "layouts/MainLayout";
import {useRouter} from 'next/router';
import openNotification from '@components/common/notification';
import { useState, useEffect } from 'react';

const Index = () => {
  const { Meta } = Card;
  const router = useRouter();
  const [cards, setCards] = useState([]);

  /*This is the method that will be executed when the component is mounted*/
  useEffect(async () => {
    async function getMaps() {
      try {
        /*We make a request to get all the available maps */
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

    <Divider orientation="left">See our maps and play</Divider>

    {/*We use the Row and Col components from ant design to display the map cards in a grid*/}
    <Row gutter={[6,32]} >
    {
      /*We make a mapping of the array of maps and design with each one a card that displays the main map information */
      cards.map((card, index) => (
        <Col className="gutter-row" span={8} key={index}>
        <Card
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
            <PlaySquareOutlined key="play" alt="Start map" />,
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

    
    </MainLayout>
  );
} 

export default Index;

