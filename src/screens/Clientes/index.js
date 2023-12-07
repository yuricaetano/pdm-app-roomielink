import React, {useContext} from 'react';
import {ClienteContext} from '../../context/ClienteProvider';
import {View, StyleSheet, FlatList} from 'react-native';
import Item from './Item';
import AddFloatButton from '../../componentes/AddFloatButton';
const Clientes = ({navigation}) => {
  const {clientes} = useContext(ClienteContext);

  function routeCliente(cliente) {
    console.log(cliente);
    navigation.navigate('Cliente', {cliente});
  }

  return (
    <View style={styles.container}>
      {/* {
        <FlatList
          data={estudantes}
          renderItem={({item}) => (
            <Item item={item} onPress={() => alert('foi')} />
          )}
          keyExtractor={item => item.uid}
        />
      } */}
      {clientes.map((value, key) => (
        <Item item={value} onPress={() => routeCliente(value)} key={key} />
      ))}
      <AddFloatButton aoClicar={() => routeCliente(null)} />
    </View>
  );
};

export default Clientes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
