import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const ClienteContext = createContext({});

export const ClienteProvider = ({children}) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('clientes')
      .orderBy('nome')
      .onSnapshot(snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          data.push({
            uid: doc.id,
            nome: doc.data().nome,
            telefone: doc.data().telefone,
          });
        });
        setClientes(data);
        console.log(data);
      });
    return () => {
      listener();
    };
  }, []);

  async function save(cliente) {
    try {
      await firestore().collection('clientes').doc(cliente.uid).set(
        {
          nome: cliente.nome,
          telefone: cliente.telefone,
        },
        {merge: true},
      );
      return true;
    } catch (error) {
      console.error('ClienteProvider, save: ' + error);
      return false;
    }
  }

  async function del(uid) {
    try {
      await firestore().collection('clientes').doc(uid).delete();
      return true;
    } catch (error) {
      console.error('ClienteProvider, del: ' + error);
      return false;
    }
  }

  return (
    <ClienteContext.Provider value={{clientes, save, del}}>
      {children}
    </ClienteContext.Provider>
  );
};