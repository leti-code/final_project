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

  useEffect(async () => {
    async function getMaps() {
      try {
        const res = await fetch("/api/map/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const maps = await res.json();
        console.log(maps);
        return maps;
      }catch(er) {
        return({success: false, maps: null});
      }
    };
    const {success, maps} = await getMaps();
    console.log("Los mapas son:", maps);
    if(success === true)
      setCards(maps);
    else 
      openNotification({msg: "Error", description: "There aren't maps available."})
  }, []);

  return(
    <MainLayout>

      {/*TODO: little description of the app */}
      <h1>Welcome to ByB!</h1>

    <Divider orientation="left">See our maps and play</Divider>
    <Row gutter={[6,32]} >
    {
      cards.map(card => (
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

