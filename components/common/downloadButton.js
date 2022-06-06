import { Button } from "antd";
import { saveAs } from 'file-saver';
import { CloudDownloadOutlined} from '@ant-design/icons';

//This component is a button that allows to download a file, using file-saver, we can download the file send by props as src.
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