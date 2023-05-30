import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Sign_up from './screens/Sign_up'
import Sign_in from './screens/Sign_in'
import Home from './screens/Home'

const Stack = createStackNavigator()

function MainStackNavigator() {
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator