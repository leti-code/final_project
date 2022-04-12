const { notification } = require("antd");

const openNotification = ({msg, description}) => {
  const args = {
    message: msg,
    description,
    duration: 0,
  };
  notification.open(args);
};

export default openNotification;