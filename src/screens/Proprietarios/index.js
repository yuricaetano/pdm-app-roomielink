import React, {useContext, useEffect, useState} from 'react';
import Item from './Item';
import styled from 'styled-components/native';
import {CommonActions} from '@react-navigation/native';
import AddFloatButton from '../../componentes/AddFloatButton';
import {ProprietarioContext} from '../../context/ProprietarioProvider';
import SearchBar from '../../componentes/SearchBar';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;

export default ({navigation}) => {
  const {proprietarios} = useContext(ProprietarioContext);
  const [proprietariosTemp, setProprietariosTemp] = useState([]);

  const filterByName = text => {
    if (text !== '') {
      let a = [];
      // estudantes.forEach(e => {
      //   if (e.nome.toLowerCase().includes(text.toLowerCase())) {
      //     a.push(e);
      //   }
      // });

      a.push(
        ...proprietarios.filter(e =>
          e.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      if (a.length > 0) {
        setProprietariosTemp(a);
      }
    } else {
      setProprietariosTemp([]);
    }
  };

  const routeProprietario = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Proprietario',
        params: {proprietario: item},
      }),
    );
  };

  const routeAddProprietario = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Proprietario',
        params: {
          proprietario: {
            nome: '',
            email: '',
            latitude: '',
            longitude: '',
          },
        },
      }),
    );
  };

  return (
    <Container>
      <SearchBar text="Quem você procura?" setSearch={filterByName} />
      <FlatList
        data={proprietariosTemp.length > 0 ? proprietariosTemp : proprietarios}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeProprietario(item)} />
        )}
        keyExtractor={item => item.uid}
      />
      <AddFloatButton aoClicar={routeAddProprietario} />
    </Container>
  );
};
