import React, {createContext, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export const AuthenticationContext = createContext({});

export const AuthenticationProvider = ({children}) => {
  const [user, setUser] = useState(null);

  async function storeUserSession(localEmail, senha) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email: localEmail,
          senha,
        }),
      );
      // Congrats! You've just stored your first value!
    } catch (error) {
      // There was an error on the native side
      console.error('SignIn, storeUserSession' + error);
    }
  }

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (e) {
      console.error('AuthUserProvider, retrieveUserSession: ' + e);
    }
  }

  async function logar(email, senha) {
    try {
      await auth().signInWithEmailAndPassword(email, senha);
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);
      if (!auth().currentUser.emailVerified) {
        return 'Você deve validar seu email para continuar';
      }
      await storeUserSession(email, senha);
      if (await getUser(senha)) {
        return 'ok';
      }
      return 'Não foi possível buscar seus dados no banco de dados. Por favor contate o administrador do app.';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function cadastrar(localUser, senha) {
    try {
      await auth().createUserWithEmailAndPassword(localUser.email, senha);
      await auth().currentUser.sendEmailVerification();
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .set(localUser);
      return 'ok';
    } catch (e) {
      console.error('signUp');
      return launchServerMessageErro(e);
    }
  }

  async function forgotPass(email, senha) {
    try {
      await auth().sendPasswordResetEmail(email);
      return 'ok';
    } catch (e) {
      return launchServerMessageErro(e);
    }
  }

  async function signOut() {
    try {
      await EncryptedStorage.removeItem('user_session');
      if (auth().currentUser) {
        await auth().signOut();
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  //função utilitária
  function launchServerMessageErro(e) {
    switch (e.code) {
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inválido.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  async function getUser(senha) {
    try {
      let doc = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .get();
      if (doc.exists) {
        doc.data().uid = auth().currentUser.uid;
        doc.data().senha = senha;
        setUser(doc.data());
        console.log(doc.data());
        return doc.data();
      }
      return null;
    } catch (e) {
      console.error('AuthenticationProvider, getUser');
      return null;
    }
  }

  return (
    <AuthenticationContext.Provider
      value={{
        storeUserSession,
        logar,
        user,
        retrieveUserSession,
        cadastrar,
        forgotPass,
        signOut,
        getUser,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
