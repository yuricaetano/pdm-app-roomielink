import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, Card, Text} from '@rneui/themed';
import OutlineButton from '../../componentes/OutlineButton';

export default ({item, onPress}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    card: {
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: theme.colors.primaryDark,
      backgroundColor: theme.colors.background,
    },
    title: {
      color: theme.colors.primaryDark,
      fontSize: 20,
      fontWeight: 'bold',
    },
    divider: {
      width: 260,
    },
    div_email: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    email: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 16,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.nome}</Card.Title>
      <Card.Divider color={theme.colors.primary} style={styles.divider} />
      <View style={styles.div_email}>
        <Text style={styles.email}>{item.email}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} aoClicar={onPress} />
    </Card>
  );
};
