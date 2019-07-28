import styled from 'styled-components/native';
import { Dimensions, StyleSheet, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width - 40}px;
  height: ${40}px;
  flex-direction: row;
  align-items: flex-end;
  padding-left: 20px;
  justify-content: space-evenly;
`;

export const Category = styled(Animated.Text)`
  font-size: 16;
`;