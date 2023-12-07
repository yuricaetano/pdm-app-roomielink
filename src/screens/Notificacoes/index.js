import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import NotificationCard from './Item'; // Importe o novo componente
import messaging from '@react-native-firebase/messaging';

const Notificacoes = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const onMessageReceived = async remoteMessage => {
      const newNotification = {
        id: remoteMessage.messageId,
        title: remoteMessage.notification.title || 'No Title',
        body: remoteMessage.notification.body || 'No Body',
      };

      setNotifications(prevNotifications => [
        ...prevNotifications,
        newNotification,
      ]);
    };

    const unsubscribeForeground = messaging().onMessage(onMessageReceived);

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <View>
      <Text>Lista de Notificações:</Text>
      {notifications.map(notification => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </View>
  );
};

export default Notificacoes;
