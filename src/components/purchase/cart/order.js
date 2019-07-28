import React, { Component } from 'react';
import { Text, Animated, TouchableOpacity, View } from 'react-native';

import RemoveInCart from '../../../assets/removeInCart.svg';
import RemoveFromCart from '../../../assets/removeFromCart.svg';

import {
  ImageContainer,
  Image,
  OrderContainer,
  AnimTextDeleteOrder,
  ContentContainer,
  AmountContainer,
  OrderTitle,
  Amount,
  BtnImage,
  BtnRemoveInCart,
  BtnRemoveFromCart,
} from './styled';
export const orderWidth = 85;

class Order extends Component {
  constructor() {
    super();

    this.state = {
      isDelete: false,
      source: '',
      _id: '',
      index: '',
      name: '',
      type: '',
      category: '',
      amount: '',
    }

    this.animatedValues = {
      container: new Animated.Value(.98),
      btnDelete: new Animated.Value(1),
    }
  }
  componentWillMount() {
    const {
      source,
      _id,
      index,
      name,
      type,
      category,
      amount,
    } = this.props;

    this.setState({ source, _id, index, name, type, category, amount });
    this.animContainer(1);
  }
  shouldComponentUpdate(nextProps, nextState) {
    let { amount, isDelete } = this.state;
    let { amount: nextamount } = nextProps;
    let { isDelete: nextIsDelete } = nextState;
    this.state.amount = nextamount;
    return nextamount != amount || nextIsDelete != isDelete;
  }
  animContainer(toValue, cb) {
    Animated.timing(
      this.animatedValues.container,
      {
        toValue,
        duration: 250
      }
    ).start(cb ? cb : null)
  }
  animBtnDelete(toValue, cb) {
    Animated.timing(
      this.animatedValues.btnDelete,
      {
        toValue,
        duration: 250
      }
    ).start(cb ? cb : null);
  }
  onPress() {
    const { isDelete } = this.state;
    // this.animContainer(isDelete ? 1 : .8, () => {
    //   this.setState({ isDelete: !isDelete }, () => {
    //     const { isDelete } = this.state;
    //     this.animBtnDelete(isDelete ? 1 : .7);
    //   });
    // });
    this.animBtnDelete(isDelete ? 1 : .7, () => {
      this.setState({ isDelete: !isDelete });
    });
  }
  _deleteInCart() {
    const { _id, index, isDelete } = this.state;
    this.setState({ isDelete: !isDelete }, () => {
      this.animBtnDelete(0, () => {
        this.animContainer(0, () => {
          this.props.deleteInCart({ _id, index });
        });
      });
    });
  }
  _decreaseAmountFromOrder() {
    let { amount, _id, index } = this.state;

    if (amount <= 1) {
      this.animBtnDelete(0, () => {
        this.animContainer(0, () => {
          this.props.decreaseAmountFromOrder({ _id, index });
        });
      });
    } else {
      this.props.decreaseAmountFromOrder({ _id, index });
    }
  }
  render() {
    const { source, _id, index, name, type, category, amount, isDelete } = this.state;
    const { container, btnDelete } = this.animatedValues;
    return (
      <OrderContainer
        style={{
          width: container.interpolate({
            inputRange: [0, .8, 1],
            outputRange: [0, orderWidth, orderWidth],
            extrapolate: 'clamp'
          })
        }}
      >
        {isDelete && (
          <BtnRemoveFromCart onPress={() => this._deleteInCart()}>
            <RemoveFromCart width={35} height={35} />
          </BtnRemoveFromCart>
        )}
        <ContentContainer
          style={{
            opacity: btnDelete.interpolate({
              inputRange: [.3, .7, 1],
              outputRange: [0, 1, 1],
              extrapolate: 'clamp'
            }),
            transform: [
              { scale: btnDelete },
              {
                translateY: btnDelete.interpolate({
                  inputRange: [.7, 1],
                  outputRange: [20, 0],
                  extrapolate: 'clamp'
                })
              }
            ]
          }}
        >
          <BtnImage onPress={() => this.onPress()}>
            <ImageContainer>
              <Image source={source} resizeMode='contain' />
            </ImageContainer>
          </BtnImage>

          <OrderTitle>{category != 'Special' ? name : type}</OrderTitle>

          <AmountContainer>
            <Amount>x{amount}</Amount>
          </AmountContainer>

          <BtnRemoveInCart onPress={() => this._decreaseAmountFromOrder({ _id, index })} >
            <RemoveInCart width={20} height={20} />
          </BtnRemoveInCart>
        </ContentContainer>


      </OrderContainer >
    );
  }
}


export default Order;