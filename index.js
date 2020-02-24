import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store/configureStore';
import AppNavigator from './src/navigator/AppNavigator';
import bgMessaging from './src/firebase/bgMessaging';

const store = configureStore();
console.disableYellowBox = true;
const KenkoApp = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

AppRegistry.registerComponent(appName, () => KenkoApp);
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging
);
