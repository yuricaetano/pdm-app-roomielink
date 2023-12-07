import React from 'react';
import {Button} from '@rneui/themed';

export default ({texto, aoClicar}) => (
  <Button title={texto} onPress={aoClicar} />
);
