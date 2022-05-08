const { notification } = require("antd");

/*Graphic element that opens a small pop-up window in a corner to display information */
const openNotification = ({msg, description}) => {
  /*The arguments that it receives is message (a title) and description (main message) */
  const args = {
    message: msg,
    description,
    duration: 5.5, //duration of the message displayed in seconds
  };
  notification.open(args);
};

export default openNotification;