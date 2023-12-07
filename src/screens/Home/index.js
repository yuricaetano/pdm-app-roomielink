import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MeuButtom from '../../componentes/MeuButtom';
import {COLORS} from '../../assets/colors';

const Home = ({navigation}) => {
  const [cont, setCont] = useState(0);

  function incrementar() {
    setCont(cont + 1);
  }

  function decrementar() {
    setCont(cont - 1);
  }

  const reset = () => {
    setCont(0);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MeuButtom
          texto="Meu Perfil"
          cor={COLORS.accent}
          aoClicar={() => navigation.navigate('Profile')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <MeuButtom
        cor={COLORS.primary}
        aoClicar={() => navigation.navigate('Profile')}
        texto="Meu Perfil"
      /> */}
      <Text color="blue">Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.text}>{cont}</Text>
      <MeuButtom
        aoClicar={incrementar}
        texto="Incrementar"
        cor={COLORS.accent}
      />
      <MeuButtom
        aoClicar={decrementar}
        texto="decrementar"
        cor={COLORS.primary}
      />
      <MeuButtom texto="Resetar" aoClicar={reset} cor={COLORS.accent} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.accent,
    fontSize: 60,
  },
});
