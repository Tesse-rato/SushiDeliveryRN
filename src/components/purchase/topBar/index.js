import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

import { Container, Category } from './styles';

export default class TopBar extends Component {

  constructor() {
    super();

    this.animatedValue = new Animated.Value(0);
  }

  changeCategory(category) {
    switch (category.toLowerCase()) {
      case 'sushi': {
        this.animText(0).then(() => {
          this.props.setDisheStyle('sushi');
        })
        break;
      }
      case 'especialdishes': {
        this.animText(1).then(() => {
          this.props.setDisheStyle('special');
        });
        break;
      }
      case 'combined': {
        this.animText(2).then(() => {
          this.props.setDisheStyle('combined');
        });
        break;
      }
      case 'baverages': {
        this.animText(3).then(() => {
          this.props.setDisheStyle('baverages');
        });
        break;
      }
    }
  }

  animText(toValue) {
    return new Promise((resolve) => {
      Animated.timing(this.animatedValue, { toValue, duration: 250 }).start(resolve);
    });
  }

  shouldComponentUpdate() { return false }

  render() {
    return (
      <Container>
        <TouchableOpacity onPress={() => this.changeCategory('sushi')}>
          <Category
            style={{
              color: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 4],
                outputRange: ['#333', '#AAA', '#AAA', '#AAA'],
              }),
              fontSize: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 4],
                outputRange: [24, 16, 16, 16],
              }),
              fontFamily: 'Kitoko'
            }} >Sushi</Category>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeCategory('especialdishes')}>
          <Category
            style={{
              color: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ['#AAA', '#333', '#AAA', '#AAA'],
              }),
              fontSize: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: [16, 24, 16, 16],
              }),
              fontFamily: 'Kitoko'
            }} >Pratos esp.</Category>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeCategory('combined')}>
          <Category
            style={{
              color: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ['#AAA', '#AAA', '#333', '#AAA'],
              }),
              fontSize: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: [16, 16, 24, 16],
              }),
              fontFamily: 'Kitoko'
            }} >Combinados</Category>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.changeCategory('baverages')}>
          <Category
            style={{
              color: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: ['#AAA', '#AAA', '#AAA', '#333'],
              }),
              fontSize: this.animatedValue.interpolate({
                inputRange: [0, 1, 2, 3],
                outputRange: [16, 16, 16, 24],
              }),
              fontFamily: 'Kitoko'
            }} >Bebidas</Category>
        </TouchableOpacity>
      </Container>
    )
  }
};