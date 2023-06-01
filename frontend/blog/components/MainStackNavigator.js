import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, StyleSheet, Text, View, TextInput,Button,Pressable, Alert, } from 'react-native';

import Sign_up from './screens/Sign_up'
import Sign_in from './screens/Sign_in'
import Home from './screens/Home'
import Post from './screens/Post'

const Stack = createStackNavigator()

function MainStackNavigator() {

  const docsNavigate = () => {
    navigation.navigate('Авторизация');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='float'>
        <Stack.Screen
          name='Sign_up'
          component={Sign_up}
          options={{title: ' '}}
        />

        <Stack.Screen
          name='Sign_in'
          component={Sign_in}
          options={{title: ' '}}
        />

        <Stack.Screen
          name='Home'
          component={Home}
          options={{title: 'Главная',
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />

        <Stack.Screen
          name='Post'
          component={Post}
          options={{title: 'Пост',
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
          
          rightComponent={
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('Home')}>
                  
                </TouchableOpacity>
              </View>
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  headerRight:{
    backgroundColor: '#fff',
    width: 15,
    height: 15,

  }

})

export default MainStackNavigator