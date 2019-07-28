import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width}px;
  height: ${60}px;
  flex-direction: row;
  padding-left: 15px;
  align-items: center;
  border-color: #DDD;
  justify-content: space-between;
  padding-right: 15px;
`;
