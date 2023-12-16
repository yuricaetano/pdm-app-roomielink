import React, {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';

export const ImovelContext = createContext({});

export const ImovelProvider = ({children}) => {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    const listener = firestore()
      .collection('imoveis')
      .orderBy('cidade')
      .onSnapshot(snapshot => {
        if (snapshot) {
          let data = [];
          snapshot.forEach(doc => {
            data.push({
              uid: doc.id,
              tipo: doc.data().tipo,
              rua: doc.data().rua,
              numero: doc.data().numero,
              cidade: doc.data().cidade,
              cep: doc.data().cep,
              urlFoto: doc.data().urlFoto,
            });
          });
          setImoveis(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  const save = async (imovel, urlDevice) => {
    try {
      if (urlDevice !== '') {
        imovel.urlFoto = await sendImageToStorage(urlDevice, imovel);
        if (!imovel.urlFoto) {
          return false; //não deixa salvar ou atualizar se não realizar todos os passpos para enviar a imagem para o storage
        }
      }
      await firestore().collection('imoveis').doc(imovel.uid).set(
        {
          tipo: imovel.tipo,
          rua: imovel.rua,
          numero: imovel.numero,
          cidade: imovel.cidade,
          cep: imovel.cep,
          urlFoto: imovel.urlFoto,
        },
        {merge: true},
      );
      return true;
    } catch (error) {
      console.error('ImovelProvider, save: ' + error);
      return false;
    }
  };

  //urlDevice: qual imagem deve ser enviada via upload
  async function sendImageToStorage(urlDevice, imovel) {
    //1. Redimensiona e compacta a imagem
    let imageRedimencionada = await ImageResizer.createResizedImage(
      urlDevice,
      150,
      200,
      'PNG',
      80,
    );
    //2. e prepara o path onde ela deve ser salva no storage
    console.log('UID do imóvel:', imovel.uid);
    const pathToStorage = `images/${imovel.tipo}/foto.png`;
    console.log('Caminho no Storage:', pathToStorage);

    //3. Envia para o storage
    let url = ''; //local onde a imagem será salva no Storage
    const task = storage().ref(pathToStorage).putFile(imageRedimencionada?.uri);
    task.on('state_changed', taskSnapshot => {
      //Para acompanhar o upload, se necessário
      // console.log(
      //   'Transf:\n' +
      //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      // );
    });

    //4. Busca a URL gerada pelo Storage
    await task.then(async () => {
      //se a task finalizar com sucesso, busca a url
      url = await storage().ref(pathToStorage).getDownloadURL();
    });
    //5. Pode dar zebra, então pega a exceção
    task.catch(e => {
      console.error('ImovelProvider, sendImageToStorage: ' + e);
      url = null;
    });
    return url;
  }

  async function del(uid, path) {
    try {
      console.log('Deletando do Firestore:', uid);

      // Log do UID e caminho do Storage
      console.log('UID:', uid);
      console.log('Caminho do Storage:', path);

      await firestore().collection('imoveis').doc(uid).delete();

      console.log('Excluindo do Storage:', path);
      await storage().ref(path).delete();

      console.log('Exclusão bem-sucedida.');
      return true;
    } catch (error) {
      console.error('ImovelProvider, del: ' + error);
      return false;
    }
  }

  return (
    <ImovelContext.Provider value={{imoveis, save, del}}>
      {children}
    </ImovelContext.Provider>
  );
};
