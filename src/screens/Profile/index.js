import React, {useContext, useEffect, useState} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import styled from 'styled-components/native';
import MyButtom from '../../componentes/MyButtom';
import DeleteButton from '../../componentes/OutlineButton';
import Loading from '../../componentes/Loading';
import {AuthenticationContext} from '../../context/Authentication';
import {UserContext} from '../../context/UserProvider';
import {CommonActions} from '@react-navigation/native';
import {useTheme, Input, Icon} from '@rneui/themed';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 5px;
  padding-top: 20px;
`;

const Scroll = styled.ScrollView``;

export default ({navigation}) => {
  const {user} = useContext(AuthenticationContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNePassConfirm] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const {save, del, updatePassword} = useContext(UserContext);
  const {theme} = useTheme();

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user]);

  function salvar() {
    if (oldPass === '' && newPass === '' && newPassConfirm === '') {
      Alert.alert(
        'Fique Esperto!',
        'Você tem certeza que deseja alterar estes dados?',
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
              /*
                Para evitar que dados sensíveis sejam enviados para
                o Firestore, um novo objeto é criado.
              */
              let localUser = {};
              localUser.uid = user.uid;
              localUser.nome = nome;
              if (await save(localUser)) {
                ToastAndroid.show(
                  'Show! Você salvou os dados com sucesso.',
                  ToastAndroid.LONG,
                );
              } else {
                ToastAndroid.show('Ops! Erro ao salvar.', ToastAndroid.LONG);
              }
              setLoading(false);
              navigation.goBack();
            },
          },
        ],
      );
    }
  }

  function excluir() {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir permanentemente sua conta?\nSe você confirmar essa operação seus dados serão excluídos e você não terá mais acesso ao app.',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            Alert.alert(
              'Que pena :-(',
              `Você tem certeza que deseja excluir seu perfil de usuário ${user.email}?`,
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
                    if (await del(user.uid)) {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{name: 'AuthStack'}],
                        }),
                      );
                    } else {
                      ToastAndroid.show(
                        'Ops! Erro ao exlcluir sua conta. Contate o administrador.',
                        ToastAndroid.LONG,
                      );
                    }
                    setLoading(false);
                  },
                },
              ],
            );
          },
        },
      ],
    );
  }

  function alterarSenha() {
    if (oldPass !== '' && newPass !== '' && newPassConfirm !== '') {
      if (oldPass !== user.senha) {
        Alert.alert('Veja!', 'A senha antiga é diferente da senha digitada.');
      } else if (newPass === newPassConfirm) {
        //TODO: fazer validar senha forte (uma caixa alta, um número, um caractere especial, tam. mín. 6)
        Alert.alert('Ok!', 'Por favor, confirme a alteração de sua senha.', [
          {
            text: 'Não',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              if (await updatePassword(newPass)) {
                ToastAndroid.show(
                  'Show! Você alterou sua senha com sucesso.',
                  ToastAndroid.LONG,
                );
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'AuthStack'}],
                  }),
                );
              } else {
                ToastAndroid.show(
                  'Ops! Erro ao alterar sua senha. Contate o administrador.',
                  ToastAndroid.LONG,
                );
              }
            },
            style: 'cancel',
          },
        ]);
      } else {
        Alert.alert('Ops!', 'A nova senha é diferente da confirmação');
      }
    } else {
      Alert.alert('Veja!', 'Preencha os campos relativos a senha');
    }
  }

  return (
    <Scroll>
      <Container>
        <Input
          value={nome}
          placeholder="nome"
          keyboardType="default"
          returnKeyType="next"
          leftIcon={
            <Icon
              type="ionicon"
              name="person-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
          onChangeText={t => setNome(t)}
        />
        <Input
          value={email}
          editable={false}
          placeholder="email"
          keyboardType="default"
          returnKeyType="next"
          leftIcon={
            <Icon
              type="ionicon"
              name="mail-outline"
              size={22}
              color={theme.colors.grey2}
            />
          }
        />
        <Input
          value={oldPass}
          secureTextEntry={showPass}
          placeholder="Senha antiga"
          keyboardType="default"
          returnKeyType="next"
          leftIcon={
            showPass ? (
              <Icon
                type="ionicon"
                name="lock-closed-outline"
                size={22}
                color={theme.colors.grey2}
                onPress={() => setShowPass(false)}
              />
            ) : (
              <Icon
                type="ionicon"
                name="lock-closed-outline"
                size={22}
                color={theme.colors.error}
                onPress={() => setShowPass(true)}
              />
            )
          }
          onChangeText={t => setOldPass(t)}
        />
        <Input
          value={newPass}
          secureTextEntry={showPass}
          placeholder="Nova senha (mín. 6 caracteres)"
          keyboardType="default"
          returnKeyType="next"
          leftIcon={
            showPass ? (
              <Icon
                type="ionicon"
                name="lock-closed-outline"
                size={22}
                color={theme.colors.grey2}
                onPress={() => setShowPass(false)}
              />
            ) : (
              <Icon
                type="ionicon"
                name="lock-closed-outline"
                size={22}
                color={theme.colors.error}
                onPress={() => setShowPass(true)}
              />
            )
          }
          onChangeText={t => setNewPass(t)}
        />
        <Input
          value={newPassConfirm}
          secureTextEntry={showPass}
          placeholder="Confirme a nova senha"
          keyboardType="default"
          returnKeyType="next"
          leftIcon={
            showPass ? (
              <Icon
                type="ionicon"
                name="checkmark-circle-outline"
                size={22}
                color={theme.colors.grey2}
                onPress={() => setShowPass(false)}
              />
            ) : (
              <Icon
                type="ionicon"
                name="checkmark-circle-outline"
                size={22}
                color={theme.colors.error}
                onPress={() => setShowPass(true)}
              />
            )
          }
          onChangeText={t => setNePassConfirm(t)}
        />
        <MyButtom texto="Salvar" aoClicar={salvar} />
        <DeleteButton texto="Excluir Conta" aoClicar={excluir} />
        <DeleteButton texto="Alterar Senha" aoClicar={alterarSenha} />
        <Loading visivel={loading} />
      </Container>
    </Scroll>
  );
};
