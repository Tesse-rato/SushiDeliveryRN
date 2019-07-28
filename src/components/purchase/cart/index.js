import React, { Component } from 'react';
import { Animated, Dimensions, View, Text, ScrollView, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window');

import { baseURL } from '../../../api';
import { orderWidth } from './order';
const orderMargin = 5;

import {
  Container,
  OrdererContainer,
  Line,
  OrdererListContainer,
  OrdererStyledText,
  OrderInListContainer,
  AdressContainer,
  AdressTitle,
  AdressText
} from './styled';
import Order from './order';

class Cart extends Component {
  constructor() {
    super();

    this.translateY = new Animated.Value(0);
    this.translateX = new Animated.Value(0);
    this.animatedEvent = Animated.event([{ nativeEvent: { translationY: this.translateY, translationX: this.translateX } }]);
    this.offsetX = 0;
    this.offsetY = 0;
    this.cartIsOpen = false;

    this.state = {
      oldCartLength: 0,
      cart: new Array(),
      resumeByType: [],
      total: 0,
      user: {
        name: '',
        street: '',
        number: '',
        district: '',
      }
    }
  }
  componentWillMount() {
    const { cart } = this.props;
    this.getUser().then(user => {
      this.setState({ cart, user });
    }).catch(err => {
      this.setState({ cart });
      console.log(err);
    });
  }
  getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem('SushiFamily'));
        resolve(user);
      } catch (err) {
        reject(err);
      };
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    let resumeByType = new Array();
    let total = 0;
    let { oldCartLength } = this.state;
    let cartLength = nextProps.cart.length;

    nextProps.cart.map(order => {
      order.price = parseFloat(order.price);
      let indexOfType = resumeByType.findIndex(value => order.type == value.type);

      if (indexOfType > -1) {
        resumeByType[indexOfType].length += order.amount;
        resumeByType[indexOfType].price += order.price * order.amount;
      }
      else {
        let price = order.price * order.amount;
        resumeByType.push({ length: order.amount, type: order.type, price });
      }

      total += order.price * order.amount;
    });

    if ((cartLength * (orderWidth + orderMargin) > width) && (cartLength != oldCartLength)) {
      const marginRight = 10;
      const value = ((nextProps.cart.length * (orderWidth + orderMargin) - (width - marginRight + -this.offsetX)) * -1);
      Animated.timing(this.translateX, { toValue: value, duration: 250, delay: 200 }).start(() => {
        this.offsetX += value;
        this.translateX.setOffset(this.offsetX);
        this.translateX.setValue(0);
      });
    };

    let { total: oldTotal } = this.state;
    this.state.oldCartLength = this.state.cart.length;
    this.state.total = total;
    this.state.resumeByType = resumeByType;
    this.state.cart = nextProps.cart;
    return oldTotal != total;
  }
  press() {

    console.log(this.state.resumeByType);

  }
  onHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.oldState == State.ACTIVE) {

      let value = (height - 215) - 10;
      let duration = 300;
      let limit = 50;

      let { translationY, translationX } = nativeEvent;

      if (translationY < 0) {
        translationY = translationY * -1;

        if (translationY > limit && !this.cartIsOpen) {
          Animated.timing(this.translateY, { toValue: -value, duration }).start(() => {
            this.offsetY += -value;
            this.translateY.setOffset(this.offsetY);
            this.translateY.setValue(0);
            this.cartIsOpen = true;
          });
        }
        else {
          this.doNotScroll('y');
        }
      }
      else if (translationY > 0) {
        if (translationY > limit && this.cartIsOpen) {
          Animated.timing(this.translateY, { toValue: value, duration }).start(() => {
            this.offsetY += value;
            this.translateY.setOffset(this.offsetY);
            this.translateY.setValue(0);
            this.cartIsOpen = false;
          });
        } else {
          this.doNotScroll('y');
        }
      }

      if (translationX > 0) { //Scroll pra direita 
        if (this.offsetX + translationX >= 0) {
          Animated.timing(this.translateX, { toValue: -this.offsetX, duration: 500 }).start(() => {
            this.offsetX += -this.offsetX;
            this.translateX.setOffset(this.offsetX);
            this.translateX.setValue(0);
          });
        }
        else {
          this.offsetX += translationX;
          this.translateX.setOffset(this.offsetX);
          this.translateX.setValue(0);
        }
      }
      else if (translationX < 0 && (this.props.cart.length * (orderWidth + orderMargin)) > width) { // Scroll pra esquerda

        const length = this.props.cart.length * (orderWidth + orderMargin);
        const difference = length - width;

        if (-this.offsetX > difference) {
          this.doNotScroll('x');
        }
        else if (-(translationX + this.offsetX) > difference) {
          let marginRight = 10;
          let toValue = (-this.offsetX - difference) - marginRight;
          Animated.timing(this.translateX, { toValue, duration: 500 }).start(() => {
            this.offsetX += toValue;
            this.translateX.setOffset(this.offsetX);
            this.translateX.setValue(0);
          });
        }
        else {
          this.offsetX += translationX;
          this.translateX.setOffset(this.offsetX);
          this.translateX.setValue(0);
        }
      }
      else {
        this.doNotScroll('x');
      }
    }
  }
  doNotScroll(trans) {
    Animated.timing(trans == 'x' ? this.translateX : this.translateY, { toValue: 0, duration: 200 }).start();
  }
  render() {
    let { cart, total, resumeByType, user: { name, street, number, district } } = this.state;
    total = total ? total : 0;
    console.log(resumeByType);
    return (
      <Container style={{ transform: [{ translateY: this.translateY }] }}>

        <PanGestureHandler // Parte de scroll de pedidos do card vermelho
          onGestureEvent={this.animatedEvent}
          onHandlerStateChange={this.onHandlerStateChange.bind(this)}
        >
          <View /* Container dos pedidos*/>
            <Line />
            <OrdererContainer style={{ transform: [{ translateX: this.translateX }], width: cart.length * 85 }}>
              {cart.length ? cart.map(({ image, _id, name, type, category, amount }, index) => (
                <Order
                  key={_id + index}
                  source={{ uri: baseURL + '/min' + image }}
                  deleteInCart={this.props.deleteInCart}
                  decreaseAmountFromOrder={this.props.decreaseAmountFromOrder}
                  _id={_id}
                  index={index}
                  name={name}
                  type={type}
                  category={category}
                  amount={amount}
                />
              )) : (
                  <Text
                    style={{
                      width: width - 20,
                      height: 150,
                      textAlign: 'center',
                      color: '#FFF',
                      fontSize: 12,
                      fontFamily: 'Blacker-Sans-Extralight-Italic-trial',
                      top: 5
                    }}
                  >
                    Sem pedidos
                </Text>
                )}
            </OrdererContainer>
          </View>
        </PanGestureHandler>

        {/* {resumeByType.length ? (
          <Text style={{ color: '#FFF', fontSize: 12, alignSelf: 'center', fontFamily: 'Comfortaa-Bold', marginBottom: 10, top: 10 }}>
            Olá {name}, confirme abaixo seu pedido!
          </Text>
        ) : null} */}

        <OrdererListContainer /**Container do Resumo dos pedidos */ >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ color: '#F00', fontSize: 12, alignSelf: 'center', fontFamily: 'Comfortaa-Bold', marginBottom: 2 }}>
              Olá {name}, confirme abaixo seu pedido!
            </Text>
            {resumeByType && resumeByType.map((order, index) => {
              if (order.type != undefined) return (
                <View key={'Orderer' + index}>
                  <OrderInListContainer>
                    <View style={{ width: '15%', alignItems: 'center' }}>
                      <OrdererStyledText>x{order.length}</OrdererStyledText>
                    </View>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                      <OrdererStyledText>{order.type}</OrdererStyledText>
                    </View>
                    <View style={{ width: '35%', alignItems: 'center' }}>
                      <OrdererStyledText>R${parseFloat(order.price).toFixed(2)}</OrdererStyledText>
                    </View>
                  </OrderInListContainer>
                </View>
              )
            })}
            {resumeByType.length ? (
              <View key={'Orderer'}>
                <OrderInListContainer>
                  <View style={{ width: '15%', alignItems: 'center' }}>
                    <OrdererStyledText>+</OrdererStyledText>
                  </View>
                  <View style={{ width: '50%', alignItems: 'center' }}>
                    <OrdererStyledText>{'Delivery'}</OrdererStyledText>
                  </View>
                  <View style={{ width: '35%', alignItems: 'center' }}>
                    <OrdererStyledText>R${'2.00'}</OrdererStyledText>
                  </View>
                </OrderInListContainer>
                <View style={{ width: 200, height: StyleSheet.hairlineWidth, backgroundColor: '#F00', alignSelf: 'center', marginTop: 10 }} />
                <OrderInListContainer>
                  <View style={{ width: '15%', alignItems: 'center' }}>
                    <OrdererStyledText></OrdererStyledText>
                  </View>
                  <View style={{ width: '50%', alignItems: 'center' }}>
                    <OrdererStyledText>{'Total'}</OrdererStyledText>
                  </View>
                  <View style={{ width: '35%', alignItems: 'center' }}>
                    <OrdererStyledText>R${parseFloat(total + 2).toFixed(2)}</OrdererStyledText>
                  </View>
                </OrderInListContainer>
              </View>
            ) : (
                <Text style={{ color: '#F00', paddingRight: 2, paddingLeft: 2, alignSelf: 'center', textAlign: 'center' }}>
                  {'O preço da entrega será revertido em sushi pra voçe, damos algumas opções pra atender melhor seu gosto, após confirmar o endereço fique avontade e escolha o que melhor te agrada.\nCom carinho Sushi Family.'}
                </Text>
              )}
          </ScrollView>
        </OrdererListContainer>

        {street ? (
          <AdressContainer>
            <AdressTitle> Endereço </AdressTitle>
            <AdressText> Rua: {street} {number} </AdressText>
            <AdressText> Bairro: {district} </AdressText>
          </AdressContainer>
        ) : null}

      </Container >
    );
  }
}

export default Cart;