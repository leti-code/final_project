const { notification } = require("antd");

const openNotification = ({msg, description}) => {
  const args = {
    message: msg,
    description,
    duration: 5.5,
  };
  notification.open(args);
};

export default openNotification;