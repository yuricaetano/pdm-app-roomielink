import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Image, useTheme} from '@rneui/themed';
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
      fontSize: 24,
    },
    divider: {
      width: 260,
    },
    div_imovel: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    div_rua: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    foto: {
      width: '60%',
      height: 100,
      // marginRight: 20,
      borderRadius: 50 / 2,
    },
    text: {
      textAlign: 'center',
      color: theme.colors.primaryDark,
      fontSize: 20,
      fontWeight: 'light',
      margin: 5,
    },
  });

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{item.tipo}</Card.Title>
      <Card.Divider color={theme.colors.primary} style={styles.divider} />
      <View style={styles.div_rua}>
        <Text style={styles.text}>{item.rua}</Text>
        <Text style={styles.text}>{item.numero}</Text>
      </View>
      <View style={styles.div_imovel}>
        <Image containerStyle={styles.foto} source={{uri: item.urlFoto}} />
        <Text style={styles.text}>{item.cep}</Text>
        <Text style={styles.text}>{item.cidade}</Text>
      </View>
      <OutlineButton texto={'Detalhar'} aoClicar={onPress} />
    </Card>
  );
};
