import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.ImageBackground.attrs(props => ({ ...props }))`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;

export const Input = styled.TextInput.attrs(props => ({
  placeholderTextColor: '#FFF',
  ...props,
})
)`
  width: ${width - 50}px;
  height: 50px;
  align-self: center;
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  color: #FFF;
  margin-bottom: 5px;
  padding-left: 20px;
  background-color: ${'rgba(255, 0, 0, .7)'};
`;

export const InputContainer = styled.View`
  position: absolute;
  width: ${width - 30}px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: ${height / 2 - 100};
  padding: 40px;
  border-radius: 10px;
`;

export const ContinueBtn = styled.TouchableOpacity.attrs(props => ({ ...props }))`
  width: ${width - 10}px;
  height: 50px;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #F00;
  position: absolute;
  bottom: 70px;
`;