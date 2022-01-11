import React, { useLayoutEffect } from 'react'
// import {
//   ChargeScreen,
//   InvoiceScreen,
// } from '../../screens'
import UserRoleNavigation from '../UserRoleNavigation'

import { useTheme } from 'react-native-paper'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export default function ProductTransactionNavigation({ route, navigation }) {
  const theme = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerShadowVisible: false,
        headerTintColor: 'white'
      }}>
      <Stack.Screen name='UserRoleNavigation' component={UserRoleNavigation} options={{ title: 'User Management' }} />
      {/* <Stack.Screen name='ChargeScreen' component={ChargeScreen} />
      <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} /> */}
    </Stack.Navigator>
  )
}
