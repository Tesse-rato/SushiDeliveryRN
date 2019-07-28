import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width - 40}px;
  height: ${120}px;
  align-self: center;
  padding-bottom: 10px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.Text`
  font-size: 26px;
  color: #333;
  font-family: Bandy;
`;
export const SubTitle = styled.Text`
  font-size: 14px;
  color: #777;
  left: 5px;
  font-family: Blacker-Sans-Extralight-italic-trial;
`;

export const Price = styled.Text`
  font-family: Comfortaa-Bold;
  font-size: 13px;
  color: #BBB;
`;
export const PriceBy = styled.Text`
  font-family: Comfortaa-Bold;
  font-size: 13px;
  color: #333;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #999;
  top: 10px;
  left: 5px;
  font-family: Comfortaa-Light;
`;