import React, { Component } from 'react';
import { Animated, Dimensions, Image, Text, Easing } from 'react-native';
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window');

import { Container, Plates, ImageContainer } from './styles';

import { getDishes, baseURL } from '../../../api';

class MainScroll extends Component {
  constructor() {
    super()

    this.state = {
      disheStyle: '', // Estilo de pratos selecionado no topBar
      currentDishe: { // O prato atual no scroll
        _id: '',
        name: '',
        price: '',
        type: '',
        category: '',
        description: '',
        ingredients: '',
        image: '',
      },
      currentDishes: [],
      dishes: [], // Lista com todos os tipos de pratos
      sushi: [], // Pratos do tipo sushi
      special: [], // Pratos especiais
      baverages: [], // Bebidas,
      imageLoaded: false,
    }

    this.offset = width / 4;
    this.disheIndex = 0;
    this.translateX = new Animated.Value(0 /**width / 4*/);
    this.translateX.setOffset(width / 4);
    this.animatedEvent = Animated.event([{ nativeEvent: { translationX: this.translateX } }]);
    this.updateDisheTimeOut = null;
    this.delayToUpdateDishe = 0;
  }
  componentWillMount() {
    getDishes().then(dishes => {
      const disheStyle = this.props.disheStyle;
      const sushi = dishes.filter(dishe => dishe.category == 'Sushi');
      const baverages = dishes.filter(dishe => dishe.category == 'Baverages');
      const special = dishes.filter(dishe => dishe.category == 'Special');
      const combined = dishes.filter(dishe => dishe.category == 'Combined');
      const currentDishe = sushi[this.disheIndex];
      const currentDishes = sushi;
      const state = { dishes, sushi, baverages, special, combined, currentDishes, currentDishe, disheStyle };
      console.log({ pratos: dishes.length, sushi: sushi.length, special: special.length, combined: combined.length, baverages: baverages.length });

      this.setState(state, () => this.props.setCurrentDishe(currentDishe));

    }).catch(console.log);
  }
  shouldComponentUpdate(nextProps, nextState) {

    if (this.state[nextProps.disheStyle]) {
      let currentDishes = this.state[nextProps.disheStyle];
      this.state.currentDishes = currentDishes;

      if (this.state.disheStyle != nextProps.disheStyle) {
        let [currentDishe] = currentDishes;
        this.state.currentDishe = currentDishe;
        this.props.setCurrentDishe(currentDishe);

        this.state.disheStyle = nextProps.disheStyle;
        this.disheIndex = 0;
        this.rollToBeginning();
      }
    }

    return true;
  }
  handleGestureHandler({ nativeEvent }) {
    const { oldState, translationX } = nativeEvent;
    if (oldState != State.ACTIVE) return;

    if (translationX < 0) { //Scroll pra esquerda
      if (translationX > -(width / 4)) {
        this.doNotRoll(); // Scroll Insuficiente, cancela o Scroll
      }
      else if ((this.state.currentDishes.length - 2) * (((width / 2) * -1) - (width / 6)) < this.offset) {
        this.rollToForward(); // Aceitou o escroll pra esquerda - pra frente
      }
      else {
        this.doNotRoll(); // Cancela o scroll quando já é o ultimo elemento do Scroll
      }
    }
    else if (this.offset < width / 4) { //Scroll pra direita
      if (translationX < (width / 4)) {
        this.doNotRoll(); // Scroll Insuficiente, cancela o Scroll
      }
      else if (-this.offset > width / 4) {
        this.rollToBackward(); // Scroll direita Aceito e nao é o primeiro component
      }
    }
    else {
      this.doNotRoll(); // Cancela o scroll quando é o primeiro intem e rola pra esquerda
    }
  }
  doNotRoll(cb) {
    Animated.timing(
      this.translateX,
      {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start(cb ? cb : null);
  }
  rollToForward(cb) {
    Animated.timing(
      this.translateX,
      {
        toValue: ((width / 2) * -1) - (width / 6),
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start(() => {
      this.offset += ((width / 2) * -1) - (width / 6);
      this.translateX.setOffset(this.offset);
      this.translateX.setValue(0);
      this.disheIndex++;

      let currentDishe = this.state.currentDishes[this.disheIndex];
      this.state.currentDishe = currentDishe;
      if (this.updateDisheTimeOut) clearTimeout(this.updateDisheTimeOut);
      this.updateDisheTimeOut = setTimeout(() => {
        this.props.setCurrentDishe(currentDishe);
        clearTimeout(this.updateDisheTimeOut)
      }, this.delayToUpdateDishe);
      if (cb) cb();
      // Chamar Funcao que atualiza o pratos atual no scroll       -----------------------------------------
    });
  }
  rollToBackward(cb) {
    Animated.timing(
      this.translateX,
      {
        toValue: (width / 2) + (width / 6),
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start(() => {
      this.offset += (width / 2) + (width / 6);
      this.translateX.setOffset(this.offset);
      this.translateX.setValue(0);
      this.disheIndex--;

      let currentDishe = this.state.currentDishes[this.disheIndex];
      this.state.currentDishe = currentDishe;
      if (this.updateDisheTimeOut) clearTimeout(this.updateDisheTimeOut);
      this.updateDisheTimeOut = setTimeout(() => {
        this.props.setCurrentDishe(currentDishe);
        clearTimeout(this.updateDisheTimeOut)
      }, this.delayToUpdateDishe);
      if (cb) cb();
      // Chama funcao atualizanco o component atual no scroll -----------------------------------------
    });
  }
  rollToBeginning(cb) {
    Animated.timing(this.translateX, { toValue: -(this.offset - width / 4) + 45, duration: 500, useNativeDriver: true }).start(() => {
      Animated.timing(this.translateX, { toValue: -(this.offset - width / 4), duration: 250, useNativeDriver: true }).start(() => {
        this.offset = width / 4;
        this.translateX.setOffset(this.offset);
        this.translateX.setValue(0);
        if (cb) cb();
      });
    });
  }
  render() {
    console.disableYellowBox = true;
    let interval = (width / 2) + (width / 6), constant = width / 4;
    const { currentDishes, imageLoaded } = this.state;
    const { translateX } = this;

    return (
      <PanGestureHandler
        onGestureEvent={this.animatedEvent}
        onHandlerStateChange={this.handleGestureHandler.bind(this)}
      >
        <Container>
          {currentDishes && currentDishes.map((dishe, index) => (
            <Animated.View
              key={dishe._id + 'Container'}
              style={{
                transform: [{ translateX },
                {
                  scaleY: translateX.interpolate({
                    inputRange: [
                      -(constant + (interval * index + 1)), -(constant + (interval * index + 1)) + 90,
                      constant - (interval * (index)),
                      (constant - (interval * (index))) + interval - 90, (constant - (interval * (index))) + interval
                    ],
                    outputRange: [.6, .6, 1, .6, .6],
                    extrapolate: 'clamp'
                  }, { useNativeDriver: true })
                }
                ],
                opacity: translateX.interpolate({
                  inputRange: [
                    -(constant + (interval * index + 1)), -(constant + (interval * index + 1)) + 120,
                    constant - (interval * (index)),
                    (constant - (interval * (index))) + interval - 120, (constant - (interval * (index))) + interval
                  ],
                  outputRange: [.4, 1, 1, 1, .4],
                  extrapolate: 'clamp'
                }, { useNativeDriver: false })
              }}>
              <Plates>
                <Text style={{ color: '#FFF', opacity: .7 }}>
                  Imagem Ilustrativa.
                </Text>
              </Plates>
              {index - 1 == this.disheIndex || index == this.disheIndex || index + 1 == this.disheIndex ? (
                <ImageContainer
                  style={{
                    transform: [{ translateX: Animated.add(translateX, new Animated.Value(interval * index)) },
                    {
                      scaleY: translateX.interpolate({
                        inputRange: [
                          -(constant + (interval * index + 1)),
                          constant - (interval * (index)),
                          (constant - (interval * (index))) + interval
                        ],
                        outputRange: [1.8, 1, 1.8],
                        extrapolate: 'clamp'
                      }, { useNativeDriver: true })
                    }]
                  }}
                >
                  {!imageLoaded && (
                    <Image
                      style={{ width: 360, height: 360, left: -60, top: -15, position: 'absolute' }}
                      source={{ uri: baseURL + '/thumb' + dishe.image }}
                      resizeMode='contain'
                    />
                  )}
                  <Image
                    style={{ width: 240, height: 240, top: 40 }}
                    source={{ uri: baseURL + dishe.image }}
                    resizeMode='contain'
                    onLoadEnd={() => this.setState({ imageLoaded: true })}
                  />
                </ImageContainer>
              ) : null}
            </Animated.View>
          ))}
        </Container>
      </PanGestureHandler>
    );
  }
}

export default MainScroll;