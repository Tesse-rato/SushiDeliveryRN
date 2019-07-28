import React from 'react';
import { StatusBar } from 'react-native';

import Navigation from '../navigation';
import Scenes from './scenes';

export default props => (
  <>
    <StatusBar barStyle='light-content' backgroundColor='#F00' />
    <Navigation stack={Scenes} />
  </>
);
