import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import {
  Container,
  Title,
  TitleContainer,
  SubTitle,
  Description,
  Price,
  PriceBy,
} from './styled';

import AddInCart from '../../../assets/addInCart.svg';

export default ({ currentDishe: { type, name, ingredients, price, priceBy }, addInCart }) => {
  return (
    <Container>
      <TitleContainer>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 200 }}>
            <Title>{type}</Title>
            <View style={{ alignItems: 'center', right: -20, top: 25, position: 'absolute' }}>
              <Price>R${price}</Price>
              <PriceBy>{priceBy}</PriceBy>
            </View>
          </View>
          <SubTitle>{name}</SubTitle>
        </View>
        <TouchableOpacity onPress={addInCart} style={{ backgroundColor: '#F00', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingRight: 2 }}>
          <AddInCart width={25} height={25} />
        </TouchableOpacity>
      </TitleContainer>
      <Description>{ingredients}</Description>
    </Container>
  );
};