import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width}px;
  height: ${220}px;
  /* background-color: #DDD; */
  flex-direction: row;
  align-items: center;
`;

export const Plates = styled(Animated.View).attrs(props => ({ ...props }))`
  width: ${width / 2};
  height: 200px;
  background-color: #F00;
  border-radius: 40px;
  margin-right: ${width / 6};
  align-items: center;
  justify-content: flex-end;
`;

export const ImageContainer = styled(Animated.View).attrs(props => ({ ...props }))`
  position: absolute;
  left: -120px;
  top: -40px;
`;
