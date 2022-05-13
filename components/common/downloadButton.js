import { Button } from "antd";
import { saveAs } from 'file-saver';
import { CloudDownloadOutlined} from '@ant-design/icons';

const DownloadButton = ({name}) => {

    const baseUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
    const myPage = "https://localhost:3000/map/[id]/play/";
    const qrCode = baseUrl + myPage + name;

      const downloadImage = () => {
        saveAs(qrCode, name) // Put your image url here.
      };
  
  return(
    <>
            <Button shape="circle" onClick={downloadImage} icon={<CloudDownloadOutlined/>} />
    </>
  );
} 

export default DownloadButton;