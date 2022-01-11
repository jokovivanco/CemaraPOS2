import React from 'react'
import { ActiveScreen, InvoiceScreen, RefundScreen } from '../../screens'
import CashierNavigation from '../CashierNavigation'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useTheme } from 'react-native-paper'

const Stack = createNativeStackNavigator()

export default function ActiveNavigation() {
  const theme = useTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen name='ActiveScreen' component={ActiveScreen} />
      <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} options={{
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerTintColor: 'white'
      }} />
      <Stack.Screen name='RefundScreen' component={RefundScreen} options={{
        title: 'Refund',
        headerStyle: {
          backgroundColor: theme.colors.primary
        },
        headerTintColor: 'white'
      }} />
    </Stack.Navigator>
  )
}
