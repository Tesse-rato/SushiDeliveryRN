import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled(Animated.View)`
  width: ${width}px;
  height: ${height - 100}px;
  background-color: #F00;
  border-radius: 20px;
  position: absolute;
  top: ${height - 115};
  padding-left: 5px;
  padding-right: 5px;
`;
export const Line = styled.View`
  width: 80px;
  height: 3px;
  border-radius: 3px;
  background-color: #FFF;
  margin-bottom: 3px;
  align-self: center;
  margin-top: 2px;
`;

//------------------------------------------------------------------------------------------------------------------
/** Pedidos */
export const OrderContainer = styled(Animated.View)`
  height: 150px;
  margin-left: 5px;
`;
export const ImageContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  /* background-color: #FFF; */
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;
export const BtnImage = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  align-items: center;
  justify-content: center;
`;
export const Image = styled.Image.attrs(props => ({ ...props }))`
  width: 60px;
  height: 60px;
`;
export const AnimTextDeleteOrder = styled(Animated.Text).attrs(props => ({ ...props }))`
  color: #FFF;
  font-size: 14px;
`;
export const BtnRemoveFromCart = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  height: 40px;
  width: 40px;
  left: 22px;
  position: absolute;
  align-items: center;
`;
export const ContentContainer = styled(Animated.View)`
  background-color: #FFF;
  border-radius: 15px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 5;
  padding: 2px;
  flex: 1;
`;
export const AmountContainer = styled.View`
  background-color: #F00;
  width: 30px;
  height: 30px; border-radius: 17.5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  top: 2px;
`;
export const Amount = styled.Text`
  color: #FFF;
  font-size: 18px;
`;
export const OrderTitle = styled.Text`
 text-align: center;
 color: #F00;
 font-family: Comfortaa-Light;
`;
export const BtnRemoveInCart = styled.TouchableOpacity.attrs(props => ({ ...props }))`
   position: absolute;
   width: 40px;
   height: 40px;
   align-items: center;
   justify-content: center;
   border-radius: 20px;
   border-radius: 20px;
   padding-right: 2px;
   bottom: -10px;
   background-color: #F00;
`;

//------------------------------------------------------------------------------------------------------------------
/** Resumo dos pedidos no cart */
export const OrdererContainer = styled(Animated.View)`
  flex-direction: row;
`;

export const OrdererListContainer = styled.View`
  width: 90%;
  height: 120px;
  background-color: ${'rgba(255, 255, 255, 1)'};
  border-radius: 20px;
  align-self: center;
  padding-right: 5px;
  padding-left: 5px;
  margin-top: 10px;
`;

export const OrdererStyledText = styled.Text`
  color: #F00;
  font-size: 18px;
  font-family: Comfortaa-Light;
`;

export const OrderInListContainer = styled.View`
flex-direction: row;
justify-content: center;
`

//------------------------------------------------------------------------------------------------------------------
/** Confirmacao do endereço */
export const AdressContainer = styled.View`
  flex: .7;
  margin-top: 10px;
`
export const AdressTitle = styled.Text`
  color: #FFF;
  font-size: 26px;
  left: 10px;
  font-family: Comfortaa-Bold;
`;
export const AdressText = styled.Text`
  color: #FFF;
  font-size: 12px;
  margin: 1px;
  font-family: Comfortaa-Light;
  left: 15px;
`;