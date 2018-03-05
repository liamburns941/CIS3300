import { AppRegistry } from 'react-native';
import App from './src/App';

// This is the first file read, it then calls App from './src/App'
AppRegistry.registerComponent('manager', () => App);

// This is to ignore a warning about setting timers in react native
console.ignoredYellowBox = [
'Setting a timer'
];
