/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useTheme, FAB} from '@rneui/themed';

export default ({aoClicar}) => {
  const {theme} = useTheme();
  return (
    <FAB
      visible={true}
      icon={{type: 'ionicon', name: 'add', color: theme.colors.white}}
      color={theme.colors.secondary}
      onPress={() => aoClicar()}
      containerStyle={{position: 'absolute', bottom: 10, right: 10}}
    />
  );
};
