import openNotification from "@components/common/notification";
import {Form, Input, Button, Spin, Divider, Empty, Avatar, Table} from 'antd';
import { LoadingOutlined, EditTwoTone, EditFilled, CloudDownloadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { saveAs } from 'file-saver';

import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import MainLayout from "layouts/MainLayout";
import styles from '../../../styles/editMap.module.scss';
import Modal_flag_creation_window from "@components/common/modalFlagForm";
import Modal_flag_update_window from "@components/common/modalFlagUpdate";
import DownloadButton from "@components/common/downloadButton";
import Modal_update_image from "@components/common/modalUpdateImage";



export async function getServerSideProps(context) {
    const { id } = context.params;
    
    return {
      props: {id}, // will be passed to the page component as props
    }
  };

const Edit = ({id}) => {
    const [mapInfo, setMapInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasValuesChanged, setHasValuesChanged] = useState(false);
    const router = useRouter();
    const [form] = useForm();
    const [hasFlagChanged, setHasFlagChanged] = useState(false);

    const baseUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
    const mainUrl = process.env.NODE_ENV == "development" ? "localhost:3000" : "final-project-sandy.vercel.app";
    const myPage = `https://${mainUrl}/map/${id}/play/`;
   

    /*Stuff of ant design styles for form */
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    /*End*/

    const onFinish = async () => {
      const newToken = window.localStorage.getItem("byb_token");
      try {
        const res = await fetch(`/api/map/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${newToken}`
          },
          body: JSON.stringify(mapInfo)
        });
        openNotification({msg:"Success!", description: "Your map has been updated!"});
      } catch (er) {
        openNotification({msg: "Error", description: "Something went wrong! Make sure the map exists, that you are the owner and try it later"});
      }
    };

    const saveInDatabase = async (img) => {
      try {
          const res = await fetch(`/api/map/${id}`, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${window.localStorage.getItem("byb_token")}`
              },
              body: JSON.stringify({
                  img
              })
          });
          setHasFlagChanged(!hasFlagChanged);
      } catch (er) {
          openNotification({msg: "Error", description: "Couldn't set the info in the database. Please try again."});
      }
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
    }, [hasFlagChanged]);

    /*This variable has the structure of tha table of the flags (all the stops a map has) */
    const columns = [
      {
        title: 'Question',
        dataIndex: 'question',
      },
      {
        title: 'Correct answer',
        dataIndex: 'answer',
      },
      {
        title: 'Score',
        dataIndex: 'score',
      },
      {
        title: 'Next clue',
        dataIndex: 'clue',
      },
      {
        title: 'Edit flag',
        dataIndex: 'edit',
      },
      {
        title: 'Flag QR',
        dataIndex: 'download',
      }
    ];

    const tableData = [];
    if (isLoading === false && mapInfo) {
      for (let i = 0; i < mapInfo.flags.length; i++) {
        tableData.push({
          key: i,
          question: mapInfo.flags[i].question,
          answer: mapInfo.flags[i].answer[mapInfo.flags[i].correctAnswer],
          score: mapInfo.flags[i].score,
          clue: mapInfo.flags[i].clueToNextFlag,
          edit: 
           <Modal_flag_update_window flagToUpdate={mapInfo.flags[i]} 
                    butText={<EditFilled />}
                    title="Change information you want to update"
                    indexOfFlag={i}
                    qrSrc={baseUrl + myPage + mapInfo.flags[i]._id}
                    setHasFlagChanged={setHasFlagChanged}
                    hasFlagChanged={hasFlagChanged}
            />,
          download: 
            <DownloadButton src ={baseUrl + myPage + mapInfo.flags[i]._id} name={`Flag ${i+1}(${mapInfo.flags[i]._id})`}/>
        });

      }
    };
  return (
    <MainLayout>
      {isLoading ? 
      <div className={styles.loading}>
      <Spin className ={styles.spinner} indicator={<LoadingOutlined className={styles.spinIcon}/>}/> 
      </div> 
      : 
      <>
      <Divider orientation="left">Map page</Divider>
      <p className={styles.paragraph}>Here you can find the full information provided to your map. You can also edit it and add new flags.</p>
      {mapInfo ?
      <Form
        {...formItemLayout}
        form={form}
        className={styles.editMapComponent}
        onFinish={onFinish}
        method='POST'
        scrollToFirstError
      >
            <div className={styles.mapImage}>
              <Avatar size={250} shape="square" src={mapInfo.img ? mapInfo.img : "/defaultMap.jpg"}/>
              <Modal_update_image 
                butText={<EditTwoTone/>}
                title="Update your image. Choose a new one"
                preset="map_image"
                setNewImg={(img) => saveInDatabase(img)}
              />
            </div>
            <Form.Item
              label="Name"
              name="mapname"
              value={mapInfo.mapname}
              initialValue={mapInfo.mapname}
              tooltip="What name do you want for your map?"
                onChange={(e)=>{
                  setMapInfo({
                    ...mapInfo,
                    mapname: e.target.value
                  });
                  setHasValuesChanged(true);
                }}
                rules={[{ 
                    whitespace: true
                }]}
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                label="Description"
                name="description"
                initialValue={mapInfo.description}
                value={mapInfo.description}
                tooltip="A global description of your map"
                onChange={(e)=> {
                  if(e.target.value !== e.target.defaultValue) setHasValuesChanged(true);
                  setMapInfo({
                    ...mapInfo,
                    description: e.target.value
                  });
                }}
                rules={[{ 
                    whitespace: true,
                }]}
                >
                    <Input.TextArea 
                    allowClear="true"
                    />
                </Form.Item>

                <Form.Item
                label="Begin of the map "
                name="firstClue"
                initialValue={mapInfo.firstClue}
                value={mapInfo.firstClue}
                tooltip="Initial text to find the first flag"
                onChange={(e)=>{
                  if(e.target.value !== e.target.defaultValue) setHasValuesChanged(true);
                  setMapInfo({
                    ...mapInfo,
                    firstClue: e.target.value
                  });
                }}
                rules={[{ 
                    whitespace: true,
                }]}
                >
                    <Input.TextArea 
                    allowClear="true"
                    />
                </Form.Item>

                <Table columns={columns} width={400} scroll={{x: 400}} dataSource={tableData} pagination={{ pageSize: 5 }} />

                <Modal_flag_creation_window mapId={id}
                  butText="Add a new Flag"
                  title="Fill the information for the new flag"
                  setHasFlagChanged={setHasFlagChanged}
                  hasFlagChanged={hasFlagChanged}
                />
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className={styles.submitButton}
                     disabled={hasValuesChanged ? false : true}>
                        Update your map
                    </Button>
                </Form.Item>
            </Form> 
            : <Empty />
            }
            </>
    }
    </MainLayout>
  )
};

export default Edit;