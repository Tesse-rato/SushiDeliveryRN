import React from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { updateOwnProps } from './utils';

const { width, height } = Dimensions.get('window');

export default class SingleScene extends React.Component {
  constructor(props) {
    super(props);

    this.updateOwnProps = updateOwnProps;

    this.scenes = {};

    this.ownProps = {};

    this.state = {
      currentPage: null,
      nextScene: null,
    };

    this.animatedValues = {
      container: new Animated.Value(0),
    }

  }

  componentWillMount() {
    const { scenes, initialScene } = this.props.stack;

    if (!initialScene) throw new Error('Missing initialScene in SingleScene');

    this.scenes = scenes;
    this.setState({ currentPage: this.scenes[initialScene] }, () => {
      Animated.timing(this.animatedValues.container, { toValue: 1, duration: 5000 }).start();
    });
  }

  async changeScene(arg1, arg2) {
    if (typeof arg1 == 'function') {
      const { props, pageName } = await arg1(this.ownProps);

      this.setState({
        nextScene: this.scenes[pageName]
      }, () => setTimeout(() => {
        Animated.timing(this.animatedValues.container, { toValue: 2, duration: 250, delay: 100 }).start(() => {
          this.ownProps = { ...props };
          this.setState({ currentPage: this.scenes[pageName], nextScene: null }, () => {
            this.animatedValues.container.setValue(0);
          });
        });
      }, 500));

      return;

    } else if (typeof arg1 == 'string') {
      this.setState({
        nextScene: this.scenes[arg1]
      }, () => setTimeout(() => {
        Animated.timing(this.animatedValues.container, { toValue: 2, duration: 250, delay: 100 }).start(() => {
          this.ownProps = { ...arg2 };
          this.setState({ currentPage: this.scenes[arg1] }, () => {
            this.animatedValues.container.setValue(0);
          });
        });
      }, 500));

      return;
    }
  }

  render() {
    if (this.state.currentPage) {
      return (
        <Animated.View
          style={{
            width: width * 2,
            height,
            flexDirection: 'row',
            transform: [
              {
                translateX: this.animatedValues.container.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, 0, -width]
                }, { useNativeDriver: true })
              }
            ]
          }}
        >
          <this.state.currentPage
            SceneState={this.ownProps}
            changeScene={this.changeScene.bind(this)}
            updateSceneState={this.updateOwnProps.bind(this)}
          />

          {this.state.nextScene ? (
            <View style={{ left: width }}>
              <this.state.nextScene
                SceneState={this.ownProps}
                changeScene={this.changeScene.bind(this)}
                updateSceneState={this.updateOwnProps.bind(this)}
              />
            </View>
          ) : null}
        </Animated.View>
      );
    }
  }
}
