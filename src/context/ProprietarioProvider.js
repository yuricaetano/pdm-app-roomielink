/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ApiContext} from './ApiProvider';

export const ProprietarioContext = createContext({});

export const ProprietarioProvider = ({children}) => {
  const [proprietarios, setProprietarios] = useState([]);
  const {api} = useContext(ApiContext);

  useEffect(() => {
    if (api) {
      getProprietarios();
    }
  }, [api]);

  const getProprietarios = async () => {
    try {
      const response = await api.get('/proprietarios');
      // console.log('Dados buscados via API');
      // console.log(response.data);
      // console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm2023-cbc53/databases/(default)/documents/proprietarios/',
        );

        data.push({
          nome: d.fields.nome.stringValue,
          email: d.fields.email.stringValue,
          latitude: d.fields.latitude.stringValue,
          longitude: d.fields.longitude.stringValue,
          uid: k[1],
        });
      });
      console.log('Proprietários obtidos:', data);

      data.sort((a, b) => {
        if (a.nome.toUpperCase() < b.nome.toUpperCase()) {
          return -1;
        }
        if (a.nome.toUpperCase() > b.nome.toUpperCase()) {
          return 1;
        }
        // nomes iguais
        return 0;
      });

      setProprietarios(data);
    } catch (error) {
      console.error('Erro em getProprietarios via API:');
      console.error(error);
    }
  };

  const save = async val => {
    try {
      if (val.uid == '') {
        await api.post('/proprietarios/', {
          fields: {
            nome: {stringValue: val.nome},
            email: {stringValue: val.email},
            latitude: {stringValue: val.latitude},
            longitude: {stringValue: val.longitude},
          },
        });
      } else {
        update(val);
      }
      getProprietarios();
      return true;
    } catch (response) {
      console.error('Erro em saveProprietario via API: ' + response);
      return false;
    }
  };

  const update = async val => {
    try {
      await api.patch('/proprietarios/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
          email: {stringValue: val.email},
          latitude: {stringValue: val.latitude},
          longitude: {stringValue: val.longitude},
        },
      });
      getProprietarios();
      return true;
    } catch (response) {
      // console.error('Erro em updateCompany via API: ' + response);
      return false;
    }
  };

  const del = async val => {
    try {
      await api.delete('/proprietarios/' + val);
      getProprietarios();
      return true;
    } catch (response) {
      console.error('Erro em deleteProprietario via API: ' + response);
      return false;
    }
  };

  return (
    <ProprietarioContext.Provider
      value={{
        proprietarios,
        save,
        update,
        del,
      }}>
      {children}
    </ProprietarioContext.Provider>
  );
};
