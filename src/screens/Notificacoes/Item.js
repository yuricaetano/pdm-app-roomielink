import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, useTheme} from '@rneui/themed';

const NotificationCard = ({notification}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      borderColor: theme.colors.primaryDark,
      backgroundColor: theme.colors.background,
      marginVertical: 10,
      padding: 10,
    },
    title: {
      color: theme.colors.primaryDark,
      fontSize: 18,
      fontWeight: 'bold',
    },
    body: {
      color: theme.colors.primaryDark,
      fontSize: 16,
      marginTop: 5,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.body}>{notification.body}</Text>
    </Card>
  );
};

export default NotificationCard;
