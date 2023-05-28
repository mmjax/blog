import { StyleSheet, Text, View } from 'react-native';


import MainStackNavigator from './components/MainStackNavigator'

export default function App() {
  return (
    <MainStackNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});