import React, {useContext, useState} from 'react';
import MeuButtom from '../../componentes/MeuButtom';
import {
  Alert,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
} from 'react-native';

import {COLORS} from '../../assets/colors';
import {AuthenticationContext} from '../../context/Authentication';
import Loading from '../../componentes/Loading';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {cadastrar} = useContext(AuthenticationContext);

  async function cadastrarUsuario() {
    let msgError = '';
    if (nome !== '' && email !== '' && senha !== '' && confPass !== '') {
      if (senha === confPass) {
        let user = {};
        user.nome = nome;
        user.email = email;
        setLoading(true);
        msgError = await cadastrar(user, senha);
        if (msgError === 'ok') {
          setLoading(false);
          Alert.alert(
            'Show!',
            'Foi enviado um email para:\n' +
              user.email +
              '\nFaça a verificação.',
          );
          navigation.goBack();
        } else {
          setLoading(false);
          Alert.alert('Ops!', msgError);
        }
      } else {
        Alert.alert('Ops!', 'As senhas digitadas são diferentes.');
      }
    } else {
      Alert.alert('Ops!', 'Por favor, digite todos os campos.');
    }
  }
  return (
    <ScrollView>
      <View style={styles.divSuperior}>
        <Text style={styles.textNormal}>Cadastrar!</Text>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
          accessibilityLabel="logo do app"
        />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setNome(t)}
          onEndEditing={() => this.emailTextInput.focus()}
        />
        <TextInput
          ref={ref => {
            this.emailTextInput = ref;
          }}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="next"
          onChangeText={t => setEmail(t)}
          onEndEditing={() => this.passTextInput.focus()}
        />
        <TextInput
          ref={ref => {
            this.passTextInput = ref;
          }}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Senha"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setPassword(t)}
          onEndEditing={() => this.confTextInput.focus()}
        />
        <TextInput
          ref={ref => {
            this.confTextInput = ref;
          }}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirmar senha"
          keyboardType="default"
          returnKeyType="send"
          onChangeText={t => setConfPass(t)}
          onEndEditing={() => cadastrarUsuario()}
        />
        <MeuButtom
          cor={COLORS.accent}
          texto="Cadastrar"
          aoClicar={cadastrarUsuario}
        />
      </View>
      {loading && <Loading />}
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    height: '100%',
    width: '100%',
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
  input: {
    width: '90%',
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 5,
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textNormal: {
    marginTop: 50,
    fontSize: 18,
  },
});
