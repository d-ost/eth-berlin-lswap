/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Root } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import UserProfileScreen from './UserProfileScreen';


const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      UserProfileScreen, 


    },
    {
      initialRouteName: 'UserProfileScreen'
    }
  )
);

const RootNavigationContainer = () => (
  <Root>
    <AppContainer />  
  </Root>
);

export default RootNavigationContainer;