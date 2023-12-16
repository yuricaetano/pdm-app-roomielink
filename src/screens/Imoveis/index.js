import React, {useContext, useState} from 'react';
import Item from './Item';
import {ImovelContext} from '../../context/ImovelProvider';
import styled from 'styled-components/native';
import SearchBar from '../../componentes/SearchBar';
import FloatButtonAdd from '../../componentes/FloatButtonAdd';

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 5px;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;
const Imoveis = ({navigation}) => {
  const {imoveis} = useContext(ImovelContext);
  const [imoveisTemp, setImoveisTemp] = useState([]);

  const filterByCidade = text => {
    if (text !== '') {
      let a = [];
      a.push(
        ...imoveis.filter(e =>
          e.cidade.toLowerCase().includes(text.toLowerCase()),
        ),
      );
      if (a.length > 0) {
        setImoveisTemp(a);
      } else {
        setImoveisTemp([]);
      }
    }
  };

  function routeImovel(imovel) {
    console.log(imovel);
    navigation.navigate('Imovel', {imovel});
  }
  return (
    <Container>
      <SearchBar
        text="Que local você deseja morar?"
        setSearch={filterByCidade}
      />
      <FlatList
        data={imoveisTemp.length > 0 ? imoveisTemp : imoveis}
        renderItem={({item}) => (
          <Item item={item} onPress={() => routeImovel(item)} key={item.uid} />
        )}
        keyExtractor={item => item.uid}
      />
      <FloatButtonAdd aoClicar={() => routeImovel(null)} />
    </Container>
  );
};

export default Imoveis;
