import React, {useContext, useEffect, useState} from 'react';
import {Alert, Text, ToastAndroid, View} from 'react-native';
import {Container, TextInput} from './styles';
import MeuButtom from '../../componentes/MeuButtom';
import firestore from '@react-native-firebase/firestore';
import {COLORS} from '../../assets/colors';
import Loading from '../../componentes/Loading';
import {ClienteContext} from '../../context/ClienteProvider';

const Cliente = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(ClienteContext);

  console.log('====================================');
  console.log(route);
  console.log('====================================');

  useEffect(() => {
    if (route.params.cliente) {
      setNome(route.params.cliente.nome);
      setTelefone(route.params.cliente.telefone);
      setUid(route.params.cliente.uid);
    }
  }, [route]);

  const salvar = async () => {
    setLoading(true);
    if (
      await save({
        uid,
        nome,
        telefone,
      })
    ) {
      ToastAndroid.show('Salvo', ToastAndroid.LONG);
      navigation.goBack();
    } else {
      ToastAndroid.show('Não salvou', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Tem certeza que deseja excluir?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          if (await del(uid)) {
            ToastAndroid.show('Excluido', ToastAndroid.LONG);
          } else {
            ToastAndroid.show('Não excluiu', ToastAndroid.SHORT);
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };
  return (
    <Container>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="telefone"
        keyboardType="default"
        onChangeText={t => setTelefone(t)}
        value={telefone}
      />
      <MeuButtom
        texto="Salvar"
        aoClicar={() => {
          salvar();
        }}
        cor={COLORS.accent}
      />
      {uid && (
        <MeuButtom cor={COLORS.accent} texto="Excluir" aoClicar={excluir} />
      )}
      {loading && <Loading />}
    </Container>
  );
};

export default Cliente;
