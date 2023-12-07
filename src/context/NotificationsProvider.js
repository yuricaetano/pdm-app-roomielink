import React, {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {AuthenticationContext} from './Authentication';

export const NotificationsContext = createContext({});

export const NotificationsProvider = ({children}) => {
  const [notification, setNotification] = useState(null);
  const {user} = useContext(AuthenticationContext);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification recebida com o app fechado (activity onDestroy): ',
          remoteMessage,
        );
        if (remoteMessage) {
          setNotification(remoteMessage);
        }
      });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification recebida com o app parado (activity onStop): ',
        remoteMessage,
      );
      if (remoteMessage) {
        setNotification(remoteMessage);
      }
    });
    messaging().onMessage(async remoteMessage => {
      console.log(
        'Notification recebida com o app aberto (activity na tela): ',
        remoteMessage,
      );
      if (remoteMessage) {
        setNotification(remoteMessage);
        switch (remoteMessage.data.route) {
          case 'admin':
            Alert.alert('admin', 'Tópico: ' + remoteMessage.data.route, [
              {text: 'ir', onPress: () => {}},
              {text: 'não', onPress: () => {}},
            ]);
            break;
          case 'user':
            Alert.alert('user', 'Tópico: ' + remoteMessage.data.route, [
              {text: 'ir', onPress: () => {}},
              {text: 'não', onPress: () => {}},
            ]);
            break;
        }
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      switch (user.profile) {
        case 'admin':
          messaging().subscribeToTopic(user.profile);
          messaging().unsubscribeFromTopic('user');
          break;
        case 'user':
          messaging().subscribeToTopic(user.profile);
          messaging().unsubscribeFromTopic('admin');
          break;
      }
    }
  }, [user]);

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
};
