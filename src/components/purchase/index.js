import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Header from './header';
import TopBar from './topBar';
import MainScroll from './main';
import BottomBar from './bottomBar';
import Cart from './cart';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      disheStyle: 'Sushi', // O estilo de prato no top bar da navegação
      currentDishe: { // O prato atual que esta no scrol da aplicação
        _id: '',
        name: '',
        price: '',
        type: '',
        category: '',
        description: '',
        ingredients: '',
        image: '',
      },
      cart: [],// os pratos que já estao selecionados
    }
  }

  addInCart() {
    this.setState(state => {
      let { cart, currentDishe } = state, { _id } = currentDishe;
      let indexOf = cart.findIndex(dishe => dishe._id == _id);
      indexOf > -1 ? state.cart[indexOf].amount++ : state.cart.push({ ...currentDishe, amount: 1 });
      return state;
    });
  }

  deleteInCart({ _id, index }) {
    this.setState(state => {
      state.cart.splice(index, 1);
      return state;
    });
  }
  decreaseAmountFromOrder({ _id, index }) {
    this.setState(state => {

      const { cart } = state;

      let index = cart.findIndex(order => order._id == _id);

      cart[index].amount--;

      if (cart[index].amount <= 0) {
        this.deleteInCart({ _id, index })
        return state;
      };

      state.cart = cart;

      return state;

    });
  }

  render() {
    const { cart, currentDishe, disheStyle } = this.state;
    return (
      <View>
        <Header />
        <TopBar
          setDisheStyle={disheStyle => this.setState({ disheStyle })}
        />
        <MainScroll
          disheStyle={disheStyle}
          setCurrentDishe={currentDishe => this.setState({ currentDishe })}
        />
        <BottomBar
          currentDishe={currentDishe}
          addInCart={this.addInCart.bind(this)}
        />
        <Cart
          cart={cart}
          deleteInCart={this.deleteInCart.bind(this)}
          decreaseAmountFromOrder={this.decreaseAmountFromOrder.bind(this)}
        />
      </View>
    );
  }
}