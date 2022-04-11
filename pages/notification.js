import {notification } from 'antd';

const openNotification = (mes,des) => {
    const args = {
      message: mes,
      description: des,
      duration: 0,
    };
    notification.open(args);

    return (
        <>
            {openNotification(mes,des)}
        </>
    )
};

export default notification;