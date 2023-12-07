import React, {createContext, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthenticationContext} from './Authentication';

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const {getUser, signOut} = useContext(AuthenticationContext);

  const save = async user => {
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({nome: user.nome}, {merge: true});
      //renew user in session
      if (await getUser(user.senha)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const del = async uid => {
    try {
      await firestore().collection('users').doc(uid).delete();
      await auth().currentUser.delete();
      await signOut();
      return true;
    } catch (e) {
      return false;
    }
  };

  async function updatePassword(senha) {
    try {
      await auth().currentUser.updatePassword(senha);
      return true;
    } catch (e) {
      console.error('updatePassword' + e);
      return false;
    }
  }

  return (
    <UserContext.Provider value={{save, del, updatePassword}}>
      {children}
    </UserContext.Provider>
  );
};
