import React, {useEffect, useState, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import MyButton from '../../componentes/MyButtom';
import Loading from '../../componentes/Loading';
import DeleteButton from '../../componentes/OutlineButton';
import {ImovelContext} from '../../context/ImovelProvider';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useTheme, Image, ButtonGroup, Input, Icon} from '@rneui/themed';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
`;

const Scroll = styled.ScrollView``;

const Imovel = ({route, navigation}) => {
  const [tipo, setTipo] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uid, setUid] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [urlDevice, setUrlDevice] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(ImovelContext);
  const {theme} = useTheme();

  useEffect(() => {
    if (route.params.imovel) {
      setTipo(route.params.imovel.tipo);
      setRua(route.params.imovel.rua);
      setNumero(route.params.imovel.numero);
      setCidade(route.params.imovel.cidade);
      setCep(route.params.imovel.cep);
      setUid(route.params.imovel.uid);
      setUrlFoto(route.params.imovel.urlFoto);
    }
  }, [route]);

  useEffect(() => {}, [urlDevice]);

  const salvar = async () => {
    setLoading(true);
    if (
      await save(
        {
          uid,
          tipo,
          rua,
          numero,
          cidade,
          cep,
          urlFoto: urlFoto,
        },
        urlDevice,
      )
    ) {
      ToastAndroid.show('Show! Você salvou com sucesso.', ToastAndroid.LONG);
      setUrlDevice('');
      setTipo('');
      navigation.goBack();
    } else {
      ToastAndroid.show('Ops!Deu problema ao salvar.', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  const excluir = async () => {
    Alert.alert(
      'Opa! Fique esperto.',
      'Você tem certeza que deseja excluir o imóvel?',
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
            const pathStorageToDelete = `images/${tipo}/foto.png`;
            if (await del(uid, pathStorageToDelete)) {
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

  const buscaNaGaleria = () => {
    const options = {
      storageOptions: {
        title: 'Selecionar  uma imagem',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao buscar a imagem.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response.assets[0].uri;
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  };

  function tiraFoto() {
    const options = {
      storageOptions: {
        title: 'Tirar uma foto',
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
        width: 150,
        height: 200,
      },
    };
    launchCamera(options, response => {
      if (response.errorCode) {
        ToastAndroid.show('Ops! Erro ao tirar a foto.', ToastAndroid.LONG);
      } else if (response.didCancel) {
        ToastAndroid.show('Ok, você cancelou.', ToastAndroid.LONG);
      } else {
        const path = response?.assets[0]?.uri;
        //console.log(path);
        setUrlDevice(path); //armazena a uri para a imagem no device
      }
    });
  }

  function buscarImagemNoDevice(v) {
    switch (v) {
      case 0:
        buscaNaGaleria();
        break;
      case 1:
        tiraFoto();
        break;
    }
  }

  return (
    <Scroll>
      <Container>
        <Image
          source={
            urlDevice !== ''
              ? {uri: urlDevice}
              : urlFoto !== ''
              ? {uri: urlFoto}
              : {
                  uri: 'https://firebasestorage.googleapis.com/v0/b/pdm-aulas-797c8.appspot.com/o/images%2Fperson.png?alt=media&token=2be8523f-4c17-4a09-afbb-301a95a5ddfb&_gl=1*18jiiyk*_ga*MjA2NDY5NjU3NS4xNjg4MTI5NjYw*_ga_CW55HF8NVT*MTY5NjAyMzQxOS4zMS4xLjE2OTYwMjU4NzQuMzMuMC4w',
                }
          }
          PlaceholderContent={<Loading />}
        />
        <ButtonGroup
          buttons={['Buscar na Galeria', 'Tira Foto']}
          onPress={v => buscarImagemNoDevice(v)}
        />
        <Input
          placeholder="Tipo de Imovel"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="home-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setTipo(t)}
          value={tipo}
        />
        <Input
          placeholder="Rua"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="location-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setRua(t)}
          value={rua}
        />
        <Input
          placeholder="Numero"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="navigate-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setNumero(t)}
          value={numero}
        />
        <Input
          placeholder="Cidade"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="business-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setCidade(t)}
          value={cidade}
        />
        <Input
          placeholder="Cep"
          keyboardType="default"
          returnKeyType="go"
          leftIcon={
            <Icon
              type="ionicon"
              name="location-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setCep(t)}
          value={cep}
        />
        <MyButton
          texto="Salvar"
          aoClicar={() => {
            salvar();
          }}
        />
        {uid && (
          <DeleteButton
            texto="Excluir"
            aoClicar={() => {
              excluir();
            }}
          />
        )}
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};

export default Imovel;
