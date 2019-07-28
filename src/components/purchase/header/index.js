import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Container } from './styles';
import LogoIco from '../../../assets/logo.svg';
import MenuIco from '../../../assets/menu.svg';
import Card from '../../../assets/bascket.svg';

export default props => (
  <Container >

    <LogoIco width={60} style={{ top: 5 }} />

    <TouchableOpacity onPress={() => null}>
      <MenuIco width={30} />
    </TouchableOpacity>

  </Container>
);