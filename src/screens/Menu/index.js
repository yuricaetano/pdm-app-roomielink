/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {FlatList, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useTheme, ListItem, Icon} from '@rneui/themed';
import {AuthenticationContext} from '../../context/Authentication';

export default ({navigation}) => {
  const {signOut} = useContext(AuthenticationContext);
  const {theme} = useTheme();

  function processar(opcao) {
    switch (opcao) {
      case 'Profile':
        navigation.navigate('Profile');
        break;
      case 'Clientes':
        navigation.navigate('Clientes');
        break;
      case 'Sair':
        sair();
        break;
    }
  }

  function sair() {
    if (signOut()) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AuthStack'}],
        }),
      );
    } else {
      Alert.alert(
        'Ops!',
        'Estamos com problemas para realizar essa operação.\nPor favor, contate o administrador.',
      );
    }
  }

  return (
    <FlatList
      data={[
        {key: 1, opcao: 'Profile', iconName: 'person'},
        {key: 2, opcao: 'Clientes', iconName: 'person'},
        {key: 3, opcao: 'Sair', iconName: 'log-in-sharp'},
      ]}
      renderItem={({item}) => (
        <ListItem bottomDivider onPress={() => processar(item.opcao)}>
          <Icon
            type="ionicon"
            name={item.iconName}
            color={theme.colors.primary}
            size={20}
          />
          <ListItem.Content>
            <ListItem.Title>{item.opcao}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}
      keyExtractor={item => item.key}
      style={{margin: 10, marginTop: 20}}
    />
  );
};
