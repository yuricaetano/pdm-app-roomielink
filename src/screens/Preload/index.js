/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {Container, Image} from './styles';
import {CommonActions} from '@react-navigation/native';
import {AuthenticationContext} from '../../context/Authentication';

const Preload = ({navigation}) => {
  const {retrieveUserSession, logar} = useContext(AuthenticationContext);

  const entrar = async () => {
    const userSession = await retrieveUserSession();

    if (
      userSession &&
      (await logar(userSession.email, userSession.senha)) === 'ok'
    ) {
      console.log('LOGOU');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    } else {
      console.log('NAO LOGOU');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    entrar();
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo_white.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
