import { Button } from "antd";
import { saveAs } from 'file-saver';
import { CloudDownloadOutlined} from '@ant-design/icons';

const DownloadButton = ({src, name}) => {

      const downloadImage = () => {
        saveAs(src, name) // Put your image url here.
      };
  
  return(
    <>
            <Button shape="circle" onClick={downloadImage} icon={<CloudDownloadOutlined/>} />
    </>
  );
} 

export default DownloadButton;