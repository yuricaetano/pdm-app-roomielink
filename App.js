import React, {useEffect} from 'react';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import Providers from './src/navigation';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          // Solicite a permissão de notificação
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Permissão de Notificação',
              message:
                'Este aplicativo precisa de permissão para enviar notificações.',
              buttonNeutral: 'Pergunte-me depois',
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permissão de notificação concedida');
          } else {
            console.log('Permissão de notificação negada');
          }
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Mensagem em segundo plano recebida:', remoteMessage);

    Alert.alert('Nova Notificação', remoteMessage.data.title);
  });

  useEffect(() => {
    const onMessageReceived = async remoteMessage => {
      console.log(
        'Notification recebida com o app em primeiro plano:',
        remoteMessage,
      );
      // Alert.alert('Nova Notificação', remoteMessage.notification.title);
      const {notification, data} = remoteMessage;

      if (notification) {
        const {title, body} = notification;
        Alert.alert(
          'Nova Notificação',
          `Título: ${title}\nCorpo: ${body || 'N/A'}`,
        );
      }
      if (data) {
        console.log('Dados adicionais:', data);
      }
    };
    const unsubscribeForeground = messaging().onMessage(onMessageReceived);

    return () => {
      unsubscribeForeground();
    };
  }, []);
  return <Providers />;
};

export default App;
