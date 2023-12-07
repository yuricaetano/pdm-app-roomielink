import React, {useEffect, useState, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import MyButtom from '../../componentes/MyButtom';
import OutlineButton from '../../componentes/OutlineButton';
import Loading from '../../componentes/Loading';
import {ProprietarioContext} from '../../context/ProprietarioProvider';
import {useTheme, Input, Icon} from '@rneui/themed';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
`;

const Scroll = styled.ScrollView``;

export default ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del, update} = useContext(ProprietarioContext);
  const {theme} = useTheme();

  useEffect(() => {
    if (route.params.proprietario) {
      setNome(route.params.proprietario.nome);
      setEmail(route.params.proprietario.email);
      setLatitude(route.params.proprietario.latitude);
      setLongitude(route.params.proprietario.longitude);
      setUid(route.params.proprietario.uid);
    }
  }, [route]);

  // useEffect(() => {}, [urlDevice]);

  const salvar = async () => {
    if (nome && email && latitude && longitude) {
      let proprietario = {};
      proprietario.uid = uid;
      proprietario.nome = nome;
      proprietario.email = email;
      proprietario.latitude = latitude;
      proprietario.longitude = longitude;
      setLoading(true);
      if (uid) {
        if (await update(proprietario)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await save(proprietario)) {
          ToastAndroid.show(
            'Show! Você inluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Opa! Fique esperto.',
      'Você tem certeza que deseja excluir o descricao?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            // const pathStorageToDelete = `images/${email}/${nome}/foto.png`;
            if (await del(uid)) {
              ToastAndroid.show(
                'Ordem dada é ordem cumprida',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Deu problema ao excluir.', ToastAndroid.SHORT);
            }
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <Scroll>
      <Container>
        <Input
          placeholder="Nome"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="person-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setNome(t)}
          value={nome}
        />
        <Input
          placeholder="Email"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="person-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setEmail(t)}
          value={email}
        />
        <Input
          placeholder="Latitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="compass"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setEmail(t)}
          value={latitude}
        />
        <Input
          placeholder="Longitude"
          editable={false}
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="compass"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setEmail(t)}
          value={longitude}
        />
        <MyButtom texto="Salvar" aoClicar={salvar} />
        {uid ? <OutlineButton texto="Excluir" aoClicar={excluir} /> : null}
        <OutlineButton
          texto="Obter Coordenadas no Mapa"
          aoClicar={() =>
            navigation.navigate('ProprietariosMap', {
              proprietario: {
                uid,
                nome,
                email,
                latitude,
                longitude,
              },
            })
          }
        />
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
