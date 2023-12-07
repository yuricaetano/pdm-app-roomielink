import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import {COLORS} from '../../assets/colors.js';
import MeuButtom from '../../componentes/MeuButtom.js';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  function recover() {
    if (email !== '') {
      console.log('achou ' + email);
      auth()
        .sendPasswordResetEmail(email)
        .then(res => {
          Alert.alert('Atenção', 'Email de rec enviado para: ' + email, [
            {text: 'OK', onPress: () => navigation.goBack()},
          ]);
        })
        .catch(err => {
          Alert.alert('Erro:' + err);
        });
    } else {
      Alert.alert('Atenção', 'Digite um email cadastrado');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
        autoFocus={true}
      />
      <MeuButtom cor={COLORS.accent} texto="Recuperar" aoClicar={recover} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textNormal: {
    fontSize: 18,
  },
});
