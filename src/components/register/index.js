import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Container, Input, InputContainer, ContinueBtn } from './styles';

import LogoIco from '../../assets/logo.svg';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      nickname: '',
      street: '',
      number: '',
      district: '',
    }
  }
  async onPress() {

    await AsyncStorage.setItem('SushiFamily', JSON.stringify(this.state));

    const user = JSON.parse(await AsyncStorage.getItem('SushiFamily'));

    this.props.changeScene('Main', user);

  }
  async componentWillMount() {

    const user = JSON.parse(await AsyncStorage.getItem('SushiFamily'));

    if (user) return this.props.changeScene('Main');
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Container blurRadius={.5} source={require('../../assets/background.jpg')}>
        <LogoIco width={220} height={140} style={{ alignSelf: 'center', marginTop: 60, position: 'absolute' }} />
        <InputContainer>
          <View style={{ flexDirection: 'row' }}>
            <Input onChangeText={(e) => this.setState({ name: e })} placeholder='Nome' style={{ width: 150, left: 5, margin: 5 }} />
            <Input onChangeText={(e) => this.setState({ nickname: e })} placeholder='Apelido' style={{ width: 120, left: 10, margin: 5 }} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Input onChangeText={(e) => this.setState({ street: e })} placeholder='Rua' style={{ width: 200, marginRight: 4 }} />
            <Input onChangeText={(e) => this.setState({ number: e })} placeholder='Nº - Comp.' style={{ width: 100, marginLeft: 4 }} />
          </View>
          <Input onChangeText={(e) => this.setState({ district: e })} placeholder='Bairro' style={{ width: 220, left: -20 }} />
        </InputContainer>

        <ContinueBtn onPress={() => this.onPress()}>
          <Text style={{ color: '#FFF', fontSize: 18 }} >Continuar</Text>
        </ContinueBtn>

        <Text style={{
          position: 'absolute',
          alignSelf: 'center',
          fontSize: 10,
          color: '#FFF',
          bottom: 25,
        }}>
          Powered by Sirius Softwares
        </Text>

      </Container>
    );
  }
}

export default Register;