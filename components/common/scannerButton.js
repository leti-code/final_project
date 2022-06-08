import { Button } from "antd";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

//This component is a button that allows to access the camera to scan the QR.
const ScannerButton = () => {

    const [isVisible, setIsVisible] = useState(false);
    // const [data, setData] = useState('No result');
    const router = useRouter();
    const madeItVisible = () => {
        setIsVisible(!isVisible);
    };
  return(
    <>
        <Button type="primary" onClick={madeItVisible}>
          {isVisible ? "Close the camera" : "Open the camera"
          } 
        </Button>
      {
        isVisible &&
        <>
        <p>Now search with your camera the QR code, be sure to have good light to be able of scanning it properly</p>
        <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          console.log({ result, error });
          if (!!result) {
            // setData(result?.text);
            router.push(result?.text);
          }
          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
        />
        </>
      }
    </>
  );
} 

export default ScannerButton;