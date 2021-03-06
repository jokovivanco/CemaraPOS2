import React from 'react'
import { LoginScreen, RegisterScreen } from '../../screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{
        headerShown: false
      }} />
    </Stack.Navigator>
  )
}
