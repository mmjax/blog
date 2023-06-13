import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, StyleSheet, Text, View, TextInput,Button,Pressable, Alert, } from 'react-native';

import Sign_up from './screens/Sign_up'
import Sign_in from './screens/Sign_in'
import Home from './screens/Home'
import Post from './screens/Post'
import Account from './screens/Account'
import CreatePost from './screens/CreatePost'
import ChangeAccount from './screens/ChangeAccount'
import OtherAccount from "./screens/OtherAccount";
import PersonsPosts from "./screens/PersonsPost";
import Follows from "./screens/Follows";
import LikedPosts from "./screens/LikedPosts";

const Stack = createStackNavigator()

function MainStackNavigator(props) {
  const {navigation} = props;
  const docsNavigate = () => {
    navigation.navigate('Авторизация');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ navigation }) => ({
          headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Home')}
        title="главная"
        color="#fff"
      />
    ),
      })}
        headerMode='float'>
        <Stack.Screen
          name='Sign_in'
          component={Sign_in}
          options={{title: ' ',
          headerLeft: () => null,}}
        />

        <Stack.Screen
          name='Sign_up'
          component={Sign_up}
          options={{title: ' ',
          headerLeft: () => null,}}
        />


        <Stack.Screen
          name='Home'
          component={Home}
          options={{title: 'Главная',
              headerLeft: () => null,
              headerRight: () => null,
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />
        <Stack.Screen
          name='LikedPosts'
          component={LikedPosts}
          options={{title: 'Понравившиеся',
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />
          <Stack.Screen
          name='ChangeAccount'
          component={ChangeAccount}
          options={{title: 'Изменить профиль',
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />
          <Stack.Screen
          name='Account'
          component={Account}
          options={{title: 'Профиль',
              headerLeft: () => null,
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />

        <Stack.Screen
          name='Follows'
          component={Follows}
          options={{title: 'Мои подписки',
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />

          <Stack.Screen
          name='PersonsPosts'
          component={PersonsPosts}
          options={{title: 'Посты пользователя',
              headerLeft: () => null,
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />

        <Stack.Screen
          name='OtherAccount'
          component={OtherAccount}
          options={{title: 'Профиль',
              headerLeft: () => null,
            headerStyle: {
            backgroundColor: '#4959E8'},
              headerTintColor: '#fff',
              headerTitleStyle: {
              fontWeight: 'bold',
                fontSize: 20,
          },}}
        />

        <Stack.Screen
          name='CreatePost'
          component={CreatePost}
          options={{title: 'Создание поста',
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
            headerLeft: ()=> null,
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