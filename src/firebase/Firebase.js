import {Platform} from 'react-native';
import firebase from 'react-native-firebase';

const androidConfig = {
  clientId:
    '511109038344-r7skuvc6psim6jv35m7822bdpak1brdl.apps.googleusercontent.com',
  appId: '1:511109038344:android:52af7d290aa3d1eff2acbd',
  apiKey: 'AIzaSyAKOl6bB2G9OOkE9rhWsEmPlgYRkQWvJn4',
  storageBucket: 'calcium-doodad-244801.appspot.com',
  messagingSenderId: '<SENDER_ID>',
  projectId: 'calcium-doodad-244801',
  persistence: true,
};

const iosConfig = {
  clientId:
    '511109038344-e721uo4eh80ie6s6t48qlpnpoc7k2ser.apps.googleusercontent.com',
  appId: '1:511109038344:ios:6d78554f45622115f2acbd',
  apiKey: 'AIzaSyBVE66kTyBuKVd5bRSPzbZXVG9YfS3grtY',
  storageBucket: 'calcium-doodad-244801.appspot.com',
  messagingSenderId: '<SENDER_ID>',
  projectId: 'calcium-doodad-244801',
  persistence: true,
};

if (!firebase.apps.length) {
  firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig);
}

const auth = firebase.auth();
const notifications = firebase.notifications();
const messaging = firebase.messaging();
const storage = firebase.storage();

export {auth, notifications, messaging, storage};
